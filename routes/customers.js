const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
	const query = "SELECT * FROM Customers";
	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching customers:", err);
			res.status(500).send(err);
		} else {
			res.json(results);
		}
	});
});

// Add a New Customer
router.post("/", (req, res) => {
	const { name, phone, email, address } = req.body;
	const query =
		"INSERT INTO Customers (name, phone, email, address) VALUES (?, ?, ?, ?)";
	db.query(query, [name, phone, email, address], (err, result) => {
		if (err) {
			console.error("Error adding customer:", err);
			res.status(500).send(err);
		} else {
			res.json({ message: "Customer added successfully", id: result.insertId });
		}
	});
});

// Delete a Customer
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const query = "DELETE FROM Customers WHERE id = ?";
	db.query(query, [id], (err, result) => {
		if (err) {
			console.error("Error deleting customer:", err);
			res.status(500).send(err);
		} else {
			if (result.affectedRows === 0) {
				res.status(404).json({ message: "Customer not found" });
			} else {
				res.json({ message: "Customer deleted successfully" });
			}
		}
	});
});

module.exports = router;
