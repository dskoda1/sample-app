// go:generate mockgen -source=./server/session.go -destination=./server/session_mock.go -package=server
package server

import (
	"encoding/gob"
	"errors"
	"net/http"

	"github.com/gorilla/sessions"
)

var (
	sessionKey = "app-session"
	userKey    = "user"
)

// SessionStore interfaces methods for session management
type SessionStore interface {
	SetUser(*http.Request, http.ResponseWriter, SessionUser) error
	GetUser(*http.Request) (*SessionUser, error)
	LogoutUser(*http.Request, http.ResponseWriter) error
}

var _ SessionStore = &Store{}

// Store implements SessionStore using gorilla cookie based storage
type Store struct {
	tracker sessions.Store
}

// NewAuthStore creates and initializes a Store and returns it as its interface type
func NewAuthStore() SessionStore {
	return &Store{tracker: sessions.NewCookieStore([]byte("super-secret-key"))}
}

// SetUser saves a session user into an instance of a session
func (s *Store) SetUser(r *http.Request, rw http.ResponseWriter, u SessionUser) error {
	session, err := s.getSession(r)
	if err != nil {
		return err
	}

	session.Values[userKey] = u
	return session.Save(r, rw)
}

// GetUser attempts to return the user for a specific request
func (s *Store) GetUser(r *http.Request) (*SessionUser, error) {
	session, err := s.getSession(r)
	if err != nil {
		return nil, err
	}

	user, ok := session.Values[userKey].(SessionUser)
	if !ok {
		return nil, errors.New("error")
	}
	return &user, nil
}

func (s *Store) getSession(r *http.Request) (*sessions.Session, error) {
	return s.tracker.Get(r, sessionKey)
}

// LogoutUser clears a users session to log them out
func (s *Store) LogoutUser(r *http.Request, rw http.ResponseWriter) error {
	session, err := s.getSession(r)
	if err != nil {
		return nil
	}

	delete(session.Values, userKey)
	return session.Save(r, rw)
}

// SessionUser is a slimmed down db.User to be persisted in sessions
type SessionUser struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
}

func init() {
	gob.Register(SessionUser{})
}
