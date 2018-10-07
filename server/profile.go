package server

import (
	"net/http"

	"github.com/labstack/echo"
)

func Profile(store SessionStore) func(echo.Context) error {
	return func(c echo.Context) error {
		user, err := store.GetUser(c.Request())

		if err != nil {
			return c.JSON(http.StatusUnauthorized, echo.Map{"error": err.Error()})
		}

		return c.JSON(http.StatusOK, echo.Map{"username": user.Username})
	}
}
