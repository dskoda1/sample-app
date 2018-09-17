package main

import (
	"flag"
	"log"

	"github.com/dskoda1/sample-app/server/db"

	"github.com/dskoda1/sample-app/server"
)

var (
	port        string
	databaseURL string
	sslMode     string
)

func init() {
	flag.StringVar(&port, "port", "8080", "Port to run backend server on")
	flag.StringVar(&databaseURL, "database_url", "postgres://dskoda:toolzroolz@0.0.0.0:5432/dskoda", "Connection string for access to DB")
	flag.StringVar(&sslMode, "db_ssl_mode", "disable", "Whether to enable or disable ssl for DB connection")
}

func main() {
	flag.Parse()
	database, err := db.GetDb(&db.Connection{
		URLString: databaseURL,
		SslMode:   sslMode,
	})
	if err != nil {
		log.Fatalf("Unable to connect to database: %s", err)
	}

	// Create dependencies
	userRepo := db.CreateUserRepo(database)
	hasher := &server.BcryptHasher{}
	store := server.NewAuthStore()

	// Pass them into the router for routes to utilize
	router := server.GetRouter(userRepo, hasher, store)

	router.File("/", "client/build/index.html")
	router.Static("/static", "client/build/static")
	router.Logger.Fatal(router.Start(":" + port))
}
