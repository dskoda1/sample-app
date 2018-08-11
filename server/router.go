package server

import (
	"net/http"

	"github.com/labstack/echo/middleware"

	"github.com/labstack/echo"
)

// GetRouter instantiates an echo router
func GetRouter() *echo.Echo {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.RequestID())
	api := e.Group("/api")
	api.GET("/hello", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	return e
}
