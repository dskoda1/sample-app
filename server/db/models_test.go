package db

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_ValidateUserPassword(t *testing.T) {

	var pwTests = []struct {
		name          string
		password      string
		expectedError error
	}{
		{
			name:          "length not 6 chars",
			password:      "12345",
			expectedError: ErrPasswordTooShort,
		},
	}
	for _, tc := range pwTests {
		t.Run(tc.name, func(t *testing.T) {
			u := &User{Password: tc.password}
			assert.Equal(t, u.ValidatePassword(), tc.expectedError)
		})
	}
}
