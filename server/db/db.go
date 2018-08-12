package db

import (
	"fmt"

	"github.com/jinzhu/gorm"
	// Import the dialect specific for postgres
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DbConnection wraps variables necessary for connecting to the database
type DbConnection struct {
	Host     string
	Port     string
	Username string
	Db       string
	Password string
}

func (dbc *DbConnection) String() string {
	// host=myhost port=myport user=gorm dbname=gorm passw
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable", dbc.Host, dbc.Port, dbc.Username, dbc.Db, dbc.Password)
}

func GetDb(dbc *DbConnection) (*gorm.DB, error) {
	db, err := gorm.Open("postgres", dbc.String())
	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&User{})
	return db, nil
}
