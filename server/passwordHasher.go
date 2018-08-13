package server

import (
	"golang.org/x/crypto/bcrypt"
)

// PasswordHasher performs the duty of hashing a password
type PasswordHasher interface {
	Hash(password string) (string, error)
	CompareHashAndPassword(password, hash string) bool
}

var _ PasswordHasher = &BcryptHasher{}

// BcryptHasher implements the PasswordHasher interface by using Bcrypt as a strategy
type BcryptHasher struct{}

// Hash uses bcrypt hash function to hash a password
func (bh *BcryptHasher) Hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

// CompareHashAndPassword uses bcrypt to compare a provided password with
// a previously hashed password
func (bh *BcryptHasher) CompareHashAndPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
