package main

import (
	"log"
	"os"

	"github.com/dskoda1/sample-app/server/db"

	"github.com/dskoda1/sample-app/server"
)

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("$DATABASE_URL must be set")
	}

	sslMode := os.Getenv("SSL_MODE")
	if sslMode == "" {
		sslMode = "enable"
	}

	database, err := db.GetDb(&db.Connection{
		URLString: databaseURL,
		SslMode:   sslMode,
	})
	if err != nil {
		log.Fatalf("Unable to connect to database: %s", err)
	}

	userRepo := db.CreateUserRepo(database)
	router := server.GetRouter(userRepo)

	router.File("/", "client/build/index.html")
	router.Static("/static", "client/build/static")
	router.Logger.Fatal(router.Start(":" + port))
}
