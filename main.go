package main

import (
	"log"
	"os"

	"github.com/dskoda1/sample-app/server"
)

func main() {

	router := server.GetRouter()
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}
	router.File("/", "client/build/index.html")
	router.Static("/static", "client/build/static")
	router.Logger.Fatal(router.Start(":" + port))
}
