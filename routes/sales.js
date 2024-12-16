const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all sales (with optional filter by car_id)
router.get("/", (req, res) => {
	const { car_id } = req.query; // Get the `car_id` query parameter

	// Base query to fetch all sales
	let query = `
        SELECT s.id, c.model, c.brand, cu.name AS customer_name, s.sale_date, s.total_price
        FROM Sales s
        JOIN Cars c ON s.car_id = c.id
        JOIN Customers cu ON s.customer_id = cu.id
    `;

	const queryParams = [];

	// If `car_id` is provided, add filtering condition
	if (car_id) {
		query += " WHERE c.id = ?";
		queryParams.push(car_id);
	}

	db.query(query, queryParams, (err, results) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(results);
		}
	});
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	const { car_id, customer_id, sale_date, total_price } = req.body;

	const query = `
        UPDATE Sales 
        SET car_id = ?, customer_id = ?, sale_date = ?, total_price = ? 
        WHERE id = ?
    `;
	db.query(
		query,
		[car_id, customer_id, sale_date, total_price, id],
		(err, result) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json({ message: "Sale updated successfully" });
			}
		}
	);
});

// Record a new sale
router.post("/", (req, res) => {
	const { car_id, customer_id, sale_date, total_price } = req.body;

	// Insert the new sale into the Sales table
	const query =
		"INSERT INTO Sales (car_id, customer_id, sale_date, total_price) VALUES (?, ?, ?, ?)";
	db.query(
		query,
		[car_id, customer_id, sale_date, total_price],
		(err, result) => {
			if (err) {
				console.error("Error inserting sale:", err); // Log error details
				res.status(500).send(err);
			} else {
				res.json({
					message: "Sale recorded successfully",
					id: result.insertId,
				});
			}
		}
	);
});

// Delete a sale
router.delete("/:id", (req, res) => {
	const { id } = req.params;

	const query = "DELETE FROM Sales WHERE id = ?";
	db.query(query, [id], (err, result) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json({ message: "Sale deleted successfully" });
		}
	});
});

module.exports = router;
