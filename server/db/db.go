package db

import (
	"fmt"

	"github.com/jinzhu/gorm"
	// Import the dialect specific for postgres
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Connection wraps variables necessary for connecting to the database
type Connection struct {
	Host      string
	Port      string
	Username  string
	Db        string
	Password  string
	SslMode   string
	URLString string
}

func (dbc *Connection) String() string {
	// host=myhost port=myport user=gorm dbname=gorm passw
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s", dbc.Host, dbc.Port, dbc.Username, dbc.Db, dbc.Password, dbc.SslMode)
}

// URL is
func (dbc *Connection) URL() string {
	return fmt.Sprintf("%s?sslmode=%s", dbc.URLString, dbc.SslMode)
}

func GetDb(dbc *Connection) (*gorm.DB, error) {
	db, err := gorm.Open("postgres", dbc.URL())
	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&User{})
	return db, nil
}
