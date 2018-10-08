package server

import (
	"net/http"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func Test_logout_success(t *testing.T) {
	// GIVEN
	c, rec := getTestSetup(``)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	storeMock := NewMockSessionStore(ctrl)
	storeMock.EXPECT().LogoutUser(c.Request(), c.Response().Writer)

	// WHEN
	handler := Logout(storeMock)
	handler(c)

	// THEN
	assert.Equal(t, http.StatusNoContent, rec.Code)
}
