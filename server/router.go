package server

import (
	"github.com/dskoda1/sample-app/server/db"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"

	"github.com/labstack/echo"
)

// GetRouter instantiates an echo router
func GetRouter(ur db.UserRepository, ph PasswordHasher, store SessionStore) *echo.Echo {
	e := echo.New()

	// Set up some out of the box middlewares Echo provides
	e.Use(middleware.Logger())
	e.Use(middleware.RequestID())
	e.Use(middleware.Recover())
	e.Use(middleware.Gzip())
	e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))

	e.Logger.SetLevel(log.INFO)
	api := e.Group("/api")

	api.POST("/register", Register(ur, ph))
	api.POST("/login", Login(ur, ph, store))
	return e
}
