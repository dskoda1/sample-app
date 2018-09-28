package server

import (
	"errors"
	"net/http"
	"testing"

	"github.com/dskoda1/sample-app/server/db"
	"github.com/golang/mock/gomock"
	"github.com/jinzhu/gorm"
	"github.com/stretchr/testify/assert"
)

func Test_login_fails_to_bind_body(t *testing.T) {
	// GIVEN
	c, rec := getTestSetup(``)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	userRepoMock := db.NewMockUserRepository(ctrl)
	passwordHasherMock := NewMockPasswordHasher(ctrl)
	storeMock := NewMockSessionStore(ctrl)

	// WHEN
	handler := Login(userRepoMock, passwordHasherMock, storeMock)
	handler(c)

	// THEN
	assert.Equal(t, http.StatusBadRequest, rec.Code)
}

func Test_login_password_does_not_match_hash(t *testing.T) {
	// GIVEN
	c, rec := getTestSetup(`{"username": "mike", "password": "password"}`)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	userRepoMock := db.NewMockUserRepository(ctrl)
	userRepoMock.EXPECT().Fetch("mike").Return(&db.User{
		Username: "mike",
		Password: "hash",
	})
	passwordHasherMock := NewMockPasswordHasher(ctrl)
	passwordHasherMock.EXPECT().CompareHashAndPassword("password", "hash").Return(false)
	storeMock := NewMockSessionStore(ctrl)

	// WHEN
	handler := Login(userRepoMock, passwordHasherMock, storeMock)
	handler(c)

	// THEN
	assert.Equal(t, http.StatusUnauthorized, rec.Code)
	assert.Equal(t, `{"error":"Invalid username or password"}`, rec.Body.String())
}

func Test_login_matching_password(t *testing.T) {
	// GIVEN
	c, rec := getTestSetup(`{"username": "mike", "password": "password"}`)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	userRepoMock := db.NewMockUserRepository(ctrl)
	userRepoMock.EXPECT().Fetch("mike").Return(&db.User{
		Username: "mike",
		Password: "hash",
		Model: gorm.Model{
			ID: 5,
		},
	})
	passwordHasherMock := NewMockPasswordHasher(ctrl)
	passwordHasherMock.EXPECT().CompareHashAndPassword("password", "hash").Return(true)
	storeMock := NewMockSessionStore(ctrl)
	storeMock.EXPECT().SetUser(c.Request(), rec, SessionUser{
		ID:       5,
		Username: "mike",
	})

	// WHEN
	handler := Login(userRepoMock, passwordHasherMock, storeMock)
	handler(c)

	// THEN
	assert.Equal(t, http.StatusAccepted, rec.Code)
	assert.Equal(t, `{"username":"mike"}`, rec.Body.String())
}

func Test_login_fails_to_set_user_session(t *testing.T) {
	// GIVEN
	c, rec := getTestSetup(`{"username": "mike", "password": "password"}`)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	userRepoMock := db.NewMockUserRepository(ctrl)
	userRepoMock.EXPECT().Fetch("mike").Return(&db.User{
		Username: "mike",
		Password: "hash",
		Model: gorm.Model{
			ID: 5,
		},
	})
	passwordHasherMock := NewMockPasswordHasher(ctrl)
	passwordHasherMock.EXPECT().CompareHashAndPassword("password", "hash").Return(true)
	storeMock := NewMockSessionStore(ctrl)
	storeMock.EXPECT().SetUser(c.Request(), rec, SessionUser{
		ID:       5,
		Username: "mike",
	}).Return(errors.New("ERROR SETTING SESSION!"))

	// WHEN
	handler := Login(userRepoMock, passwordHasherMock, storeMock)
	handler(c)

	// THEN
	assert.Equal(t, http.StatusAccepted, rec.Code)
}
