const express = require('express');
const db = require('../db');

const router = express.Router();

// Add Event
router.post('/', (req, res) => {
  const { title, date } = req.body;
  const sql = 'INSERT INTO events (title, date) VALUES (?, ?)';
  db.query(sql, [title, date], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Event Added', id: result.insertId });
  });
});

// Get Events List
router.get('/', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
