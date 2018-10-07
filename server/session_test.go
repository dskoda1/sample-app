package server

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/sessions"
	"github.com/stretchr/testify/assert"
)

func newRecorder() *httptest.ResponseRecorder {
	return &httptest.ResponseRecorder{
		HeaderMap: make(http.Header),
		Body:      new(bytes.Buffer),
	}
}
func newRequest() *http.Request {
	req, _ := http.NewRequest("GET", "http://localhost:8080/", nil)
	return req
}

func Test_get_new_session(t *testing.T) {
	store := Store{tracker: sessions.NewCookieStore([]byte("super-secret-key"))}

	req := newRequest()
	session, err := store.getSession(req)

	assert.True(t, session.IsNew)
	assert.Nil(t, err)
}

func Test_set_and_get_user(t *testing.T) {
	store := Store{tracker: sessions.NewCookieStore([]byte("super-secret-key"))}

	// Round 1
	req := newRequest()
	res := newRecorder()

	err := store.SetUser(req, res, SessionUser{Username: "bill"})
	assert.Nil(t, err)

	hdr := res.Header()
	cookies, _ := hdr["Set-Cookie"]

	// Round 2
	req = newRequest()
	req.Header.Add("Cookie", cookies[0])
	res = newRecorder()

	user, err := store.GetUser(req)

	assert.Nil(t, err)
	assert.Equal(t, "bill", user.Username)
}

func Test_clear_user_no_existing_session(t *testing.T) {
	store := Store{tracker: sessions.NewCookieStore([]byte("super-secret-key"))}

	req := newRequest()
	res := newRecorder()

	err := store.LogoutUser(req, res)

	assert.Nil(t, err)

}

func Test_clear_user(t *testing.T) {
	store := Store{tracker: sessions.NewCookieStore([]byte("super-secret-key"))}

	// Round 1: Log the user in
	req := newRequest()
	res := newRecorder()

	err := store.SetUser(req, res, SessionUser{Username: "bob"})
	assert.Nil(t, err)
	hdr := res.Header()
	cookies, _ := hdr["Set-Cookie"]

	// Confirm user is logged in
	user, err := store.GetUser(req)
	assert.NotNil(t, user)
	assert.Nil(t, err)

	// Round 2: Log the user out
	req = newRequest()
	req.Header.Add("Cookie", cookies[0])
	res = newRecorder()

	err = store.LogoutUser(req, res)
	assert.Nil(t, err)
	hdr = res.Header()
	cookies, _ = hdr["Set-Cookie"]

	// THEN: user should be logged out
	user, err = store.GetUser(req)
	assert.Nil(t, user)
	assert.NotNil(t, err)
}
