package server

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockPasswordHasher is a mock of PasswordHasher interface
type MockPasswordHasher struct {
	ctrl     *gomock.Controller
	recorder *MockPasswordHasherMockRecorder
}

// MockPasswordHasherMockRecorder is the mock recorder for MockPasswordHasher
type MockPasswordHasherMockRecorder struct {
	mock *MockPasswordHasher
}

// NewMockPasswordHasher creates a new mock instance
func NewMockPasswordHasher(ctrl *gomock.Controller) *MockPasswordHasher {
	mock := &MockPasswordHasher{ctrl: ctrl}
	mock.recorder = &MockPasswordHasherMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockPasswordHasher) EXPECT() *MockPasswordHasherMockRecorder {
	return m.recorder
}

// Hash mocks base method
func (m *MockPasswordHasher) Hash(password string) (string, error) {
	ret := m.ctrl.Call(m, "Hash", password)
	ret0, _ := ret[0].(string)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Hash indicates an expected call of Hash
func (mr *MockPasswordHasherMockRecorder) Hash(password interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Hash", reflect.TypeOf((*MockPasswordHasher)(nil).Hash), password)
}

// CompareHashAndPassword mocks base method
func (m *MockPasswordHasher) CompareHashAndPassword(password, hash string) bool {
	ret := m.ctrl.Call(m, "CompareHashAndPassword", password, hash)
	ret0, _ := ret[0].(bool)
	return ret0
}

// CompareHashAndPassword indicates an expected call of CompareHashAndPassword
func (mr *MockPasswordHasherMockRecorder) CompareHashAndPassword(password, hash interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CompareHashAndPassword", reflect.TypeOf((*MockPasswordHasher)(nil).CompareHashAndPassword), password, hash)
}
