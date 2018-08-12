package db

import "github.com/jinzhu/gorm"

// User model is used for logging in and out
type User struct {
	gorm.Model
	Username string `gorm:"type:varchar(25);unique_index"`
	Password string `gorm:"type:varchar(255)"`
	Role     string `gorm:"size:255"`
}
