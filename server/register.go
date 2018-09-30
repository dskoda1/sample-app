package server

import (
	"net/http"

	"github.com/dskoda1/sample-app/server/db"
	"github.com/labstack/echo"
)

// Register is an echo handler which registers a user
func Register(ur db.UserRepository, ph PasswordHasher) func(echo.Context) error {
	return func(c echo.Context) error {
		user := &db.User{}

		if err := c.Bind(user); err != nil {
			c.JSON(http.StatusBadRequest, echo.Map{})
			return err
		}

		password, err := ph.Hash(user.Password)
		if err != nil {
			c.JSON(http.StatusBadRequest, echo.Map{})
			return err
		}
		user.Password = password

		if err := ur.Insert(user); err != nil {
			c.JSON(http.StatusConflict, echo.Map{})
			return err
		}

		c.JSON(http.StatusCreated, echo.Map{"username": user.Username})
		return nil
	}
}
