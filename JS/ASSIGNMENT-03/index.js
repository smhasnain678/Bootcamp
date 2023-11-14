const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve static files

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: '', // your MySQL password
    database: 'world'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO student (name,email) VALUES (?,?)';
    db.query(query, [name, email], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});


app.get('/demo', (req, res) => {
    const query = 'SELECT * FROM student';
    const values = [req.body.name,req.body.email];
    db.query(query,values,(err,result) =>{
        if (err) {
            console.error(err)
            return res.status(500).send('Error retrieving data from the database');
        }
        res.json(result);
    })
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});


// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();

// // Configure MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'world'
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL');
// });

// // Use body-parser for parsing request bodies
// app.use(bodyParser.urlencoded({ extended: false }));

// // Serve static files
// app.use(express.static('public'));

// // Handle POST request to add user
// app.post('/submit', (req, res) => {
//   const { name, email } = req.body;

//   const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
//   db.query(sql, [name, email], (err, result) => {
//     if (err) throw err;
//     res.send({ id: result.insertId, name, email });
//   });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
