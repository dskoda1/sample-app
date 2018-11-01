package server

import (
	"net/http"
	"strings"

	"github.com/dskoda1/sample-app/server/db"
	"github.com/labstack/echo"
)

// Login is an echo handler which logs in a user
func Login(ur db.UserRepository, ph PasswordHasher, store SessionStore) func(echo.Context) error {
	return func(c echo.Context) error {
		user := &db.User{}

		if err := c.Bind(user); err != nil {
			c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
			return err
		}

		dbUser := ur.Fetch(strings.ToLower(user.Username))

		if ph.CompareHashAndPassword(user.Password, dbUser.Password) != true {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"error": "Invalid username or password",
			})
		}

		sessionUser := SessionUser{
			ID:       int(dbUser.ID),
			Username: dbUser.Username,
		}
		store.SetUser(c.Request(), c.Response().Writer, sessionUser)

		c.JSON(http.StatusAccepted, echo.Map{
			"username": dbUser.Username,
		})

		return nil
	}
}
