const express = require('express');
const db = require('../db');

const router = express.Router();

// Mark Attendance
router.post('/', (req, res) => {
  const { name, date } = req.body;
  const sql = 'INSERT INTO attendance (name, date) VALUES (?, ?)';
  db.query(sql, [name, date], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Attendance Marked', id: result.insertId });
  });
});

// Get Attendance List
router.get('/', (req, res) => {
  db.query('SELECT * FROM attendance', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
