package server

// func Register(user *User, userRepo ) error {
// 	// Parse and decode the request body into a new `Credentials` instance
// 	user := &User{}
// 	err := c.Bind(user)
// 	if err != nil {
// 		// If there is something wrong with the request body, return a 400 status
// 		c.JSON(http.StatusBadRequest, echo.Map{"err": err})
// 		return err
// 	}
// 	// Salt and hash the? password using the bcrypt algorithm
// 	// The second argument is the cost of hashing, which we arbitrarily set as 8 (this value can be more or less, depending on the computing power you wish to utilize)
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 8)

// 	// Next, insert the username, along with the hashed password into the database

// 	if _, err = db.Query("insert into users values ($1, $2)", creds.Username, string(hashedPassword)); err != nil {
// 	// 	// If there is any issue with inserting into the database, return a 500 error
// 	// 	w.WriteHeader(http.StatusInternalServerError)
// 	// 	return
// 	// }
// }
