const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kkpk@1981',
    database: 'EmployeeDB'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Add Employee Endpoint
app.post('/api/employees', (req, res) => {
    const { employee_id, name, email, phone, department, date_of_joining, role } = req.body;

    // Validation
    const sqlCheck = 'SELECT * FROM employees WHERE employee_id = ? OR email = ?';
    db.query(sqlCheck, [employee_id, email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).json({ message: 'Employee ID or Email already exists' });
        }

        const sqlInsert = `INSERT INTO employees (employee_id, name, email, phone, department, date_of_joining, role)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(sqlInsert, [employee_id, name, email, phone, department, date_of_joining, role], (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: 'Employee added successfully' });
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Fixed the template literal issue here
