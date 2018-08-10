package main

import "github.com/dskoda1/sample_app/server"

func main() {

	router := server.GetRouter()
	router.Logger.Fatal(router.Start(":8080"))
}
