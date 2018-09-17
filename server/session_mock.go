package server

import (
	http "net/http"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockSessionStore is a mock of SessionStore interface
type MockSessionStore struct {
	ctrl     *gomock.Controller
	recorder *MockSessionStoreMockRecorder
}

// MockSessionStoreMockRecorder is the mock recorder for MockSessionStore
type MockSessionStoreMockRecorder struct {
	mock *MockSessionStore
}

// NewMockSessionStore creates a new mock instance
func NewMockSessionStore(ctrl *gomock.Controller) *MockSessionStore {
	mock := &MockSessionStore{ctrl: ctrl}
	mock.recorder = &MockSessionStoreMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockSessionStore) EXPECT() *MockSessionStoreMockRecorder {
	return m.recorder
}

// SetUser mocks base method
func (m *MockSessionStore) SetUser(arg0 *http.Request, arg1 http.ResponseWriter, arg2 SessionUser) error {
	ret := m.ctrl.Call(m, "SetUser", arg0, arg1, arg2)
	ret0, _ := ret[0].(error)
	return ret0
}

// SetUser indicates an expected call of SetUser
func (mr *MockSessionStoreMockRecorder) SetUser(arg0, arg1, arg2 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetUser", reflect.TypeOf((*MockSessionStore)(nil).SetUser), arg0, arg1, arg2)
}

// GetUser mocks base method
func (m *MockSessionStore) GetUser(arg0 *http.Request) (*SessionUser, error) {
	ret := m.ctrl.Call(m, "GetUser", arg0)
	ret0, _ := ret[0].(*SessionUser)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetUser indicates an expected call of GetUser
func (mr *MockSessionStoreMockRecorder) GetUser(arg0 interface{}) *gomock.Call {
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetUser", reflect.TypeOf((*MockSessionStore)(nil).GetUser), arg0)
}
