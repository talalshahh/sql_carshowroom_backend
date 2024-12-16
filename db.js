const mysql = require("mysql2");

// Create a MySQL connection pool
const db = mysql.createPool({
	host: "localhost", // Replace with your database host (e.g., "127.0.0.1" or "localhost")
	user: "root", // Replace with your MySQL username
	password: "asad123", // Replace with your MySQL password
	database: "car_showroom", // Replace with the name of your database
	connectionLimit: 10, // Optional: Set the maximum number of connections
});

// Test the database connection
db.getConnection((err, connection) => {
	if (err) {
		console.error("Error connecting to the database:", err.message);
	} else {
		console.log("Connected to the MySQL database!");
		connection.release(); // Release the connection back to the pool
	}
});

module.exports = db;
