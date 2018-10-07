package server

import (
	"errors"
	"net/http"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func Test_no_valid_session(t *testing.T) {
	// GIVEN
	c, rec := getTestSetup(``)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	storeMock := NewMockSessionStore(ctrl)
	storeMock.EXPECT().GetUser(c.Request()).Return(nil, errors.New("error"))

	// WHEN
	handler := Profile(storeMock)
	handler(c)

	// THEN
	assert.Equal(t, http.StatusUnauthorized, rec.Code)
}

func Test_valid_session(t *testing.T) {
	// GIVEN
	c, rec := getTestSetup(``)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	storeMock := NewMockSessionStore(ctrl)
	storeMock.EXPECT().GetUser(c.Request()).Return(
		&SessionUser{
			Username: "carson",
		},
		nil,
	)

	// WHEN
	handler := Profile(storeMock)
	handler(c)

	// THEN
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, `{"username":"carson"}`, rec.Body.String())
}
