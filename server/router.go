package server

import (
	"github.com/dskoda1/sample-app/server/db"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"

	"github.com/labstack/echo"
)

// GetRouter instantiates an echo router
func GetRouter(ur db.UserRepository, ph PasswordHasher) *echo.Echo {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Logger.SetLevel(log.INFO)
	e.Use(middleware.RequestID())
	api := e.Group("/api")

	api.POST("/register", Register(ur, ph))
	return e
}
