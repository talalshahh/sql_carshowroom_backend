const express = require("express");
const router = express.Router();
const db = require("../db"); // Assuming you have a database connection in `db.js`

// Get all cars
router.get("/", (req, res) => {
	const query = "SELECT * FROM Cars";
	db.query(query, (err, results) => {
		if (err) res.status(500).send(err);
		else res.json(results);
	});
});

// Add a new car
router.post("/", (req, res) => {
	const { model, brand, price } = req.body;
	const query = "INSERT INTO Cars (model, brand, price) VALUES (?, ?, ?)";
	db.query(query, [model, brand, price], (err, result) => {
		if (err) res.status(500).send(err);
		else res.json({ message: "Car added successfully", id: result.insertId });
	});
});

// Delete a car
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const query = "DELETE FROM Cars WHERE id = ?";
	db.query(query, [id], (err, result) => {
		if (err) res.status(500).send(err);
		else res.json({ message: "Car deleted successfully" });
	});
});

module.exports = router;
