package db

const (
	host     = "0.0.0.0"
	port     = "5432"
	user     = "dskoda"
	db       = "dskoda"
	password = "toolzroolz"
)

// func Test_getDb(t *testing.T) {
// 	_, err := getDb(&DbConnection{
// 		Host:     host,
// 		Port:     port,
// 		Username: user,
// 		Db:       db,
// 		Password: password,
// 	})

// 	if err != nil {
// 		t.Errorf("Expected to get database connection fine")
// 	}
// }

// func Test_createUser(t *testing.T) {
// 	userModel := &User{
// 		Username: "heisenberg",
// 		Password: "hello",
// 	}
// 	db, err := getDb(&DbConnection{
// 		Host:     host,
// 		Port:     port,
// 		Username: user,
// 		Db:       db,
// 		Password: password,
// 	})

// 	db.Create(userModel)
// 	if err != nil {
// 		t.Errorf("Failed to create new user %s", err)
// 	}

// 	users := []User{}
// 	db.Find(&users)

// 	if len(users) != 1 {
// 		t.Errorf("Should only have 1 user in database")
// 	}

// }
