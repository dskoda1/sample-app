package server

import (
	"net/http"

	"github.com/labstack/echo"
)

// Logout returns an echo handler which logs the user out
func Logout(store SessionStore) func(echo.Context) error {
	return func(c echo.Context) error {
		store.LogoutUser(c.Request(), c.Response().Writer)
		return c.JSON(http.StatusNoContent, nil)
	}
}
