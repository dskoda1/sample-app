package server

import (
	"net/http"

	"github.com/dskoda1/sample-app/server/db"
	"github.com/labstack/echo"
)

// Login is an echo handler which logs in a user
func Login(ur db.UserRepository, ph PasswordHasher) func(echo.Context) error {
	return func(c echo.Context) error {
		user := &db.User{}

		// session, _ := store.Get(c.Request(), "cookie-name")
		if err := c.Bind(user); err != nil {
			c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
			return err
		}

		dbUser := ur.Fetch(user.Username)

		if ph.CompareHashAndPassword(user.Password, dbUser.Password) != true {
			return c.JSON(http.StatusUnauthorized, nil)
		}

		c.JSON(http.StatusAccepted, nil)

		// TODO: Handle error getting session
		// sess, err := session.Get("session", c)
		// if err != nil {
		// 	return c.JSON(http.StatusInternalServerError, nil)
		// }

		// sess.Options = &sessions.Options{
		// 	Path:     "/",
		// 	MaxAge:   86400 * 7,
		// 	HttpOnly: true,
		// }
		// sess.Values["foo"] = "bar"
		// sess.Save(c.Request(), c.Response())

		return nil
	}
}
