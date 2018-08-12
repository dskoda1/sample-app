package db

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

// UserRepository is used for CRUD operations on the user table
type UserRepository interface {
	Fetch(username string) *User
	Insert(user *User) error
}

var _ UserRepository = &userDAO{}

type userDAO struct {
	*gorm.DB
}

// CreateUserRepo constructs an instance of a UserAccessor
func CreateUserRepo(db *gorm.DB) UserRepository {
	return &userDAO{db}
}

// Fetch attempts to read a user from the database
func (ud *userDAO) Fetch(username string) *User {
	u := &User{}
	ud.Where("username = ?", username).First(u)
	return u
}

// Insert creates a user to the database
func (ud *userDAO) Insert(user *User) error {
	if !ud.NewRecord(user) {
		return fmt.Errorf("Username already exists: %s", user.Username)
	}

	ud.Create(user)

	if ud.NewRecord(user) {
		return fmt.Errorf("Failed to create user: %s", ud.Error)
	}

	return nil
}
