package server

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_HashPassword(t *testing.T) {
	bh := BcryptHasher{}

	hash, err := bh.Hash("abc123")

	assert.Nil(t, err)
	assert.Equal(t, bh.CompareHashAndPassword("abc123", hash), true)
}
