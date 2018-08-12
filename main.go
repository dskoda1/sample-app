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

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("$DATABASE_URL must be set")
	}
	router.Logger.Infof("Database url is: %s", databaseURL)

	router.File("/", "client/build/index.html")
	router.Static("/static", "client/build/static")
	router.Logger.Fatal(router.Start(":" + port))
}
