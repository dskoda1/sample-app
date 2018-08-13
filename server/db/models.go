package db

import (
	"errors"

	"github.com/jinzhu/gorm"
)

// User model is used for logging in and out
type User struct {
	gorm.Model
	Username string `gorm:"type:varchar(25);unique_index"`
	Password string `gorm:"type:varchar(255)"`
	Role     string `gorm:"size:255"`
}

// ErrPasswordTooShort is enforced when a password is not 6 characters or more
var ErrPasswordTooShort = errors.New("password too short, must be at least 6 characters")

// ValidatePassword ensures a users password is valid
func (u *User) ValidatePassword() error {
	if len(u.Password) < 6 {
		return ErrPasswordTooShort
	}

	return nil
}
