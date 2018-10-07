package server

import (
	"github.com/labstack/echo"
)

func Logout(store SessionStore) func(echo.Context) error {
	return func(c echo.Context) error {
		return nil
		// user, err := store.GetUser(c.Request())

		// if err != nil {
		// 	return c.JSON(http.StatusUnauthorized, echo.Map{"error": err.Error()})
		// }

		// return c.JSON(http.StatusOK, echo.Map{"username": user.Username})
	}
}
