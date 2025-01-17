const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require("path");

// Create Express app 
const app = express();

// Middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Enable parsing of URL-encoded bodies
app.use(express.static(path.join(__dirname, "public")));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Connect to MySQL Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', //
    password: '1FortheMoney*', // 
    database: 'tradespot2' // 
});

// Test Database Connection
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

// Handle Signup Form Submission
app.post('/signup', (req, res) => {
    const { USERNAME, EMAIL, PASSWORDHASH, IS_SELLER } = req.body;
    console.log();

    // Validate required fields
    if (!USERNAME || !EMAIL || !PASSWORDHASH) {
        return res.status(400).send('All fields are required');
    }

    const isSeller = IS_SELLER === 'yes' ? 1 : 0; // Convert "yes"/"no" to 1/0

    // Insert user data into the database
    const sql = 'INSERT INTO users (USERNAME, EMAIL, IS_SELLER, PASSWORDHASH) VALUES (?, ?, ?, ?)';
    db.query(sql, [USERNAME, EMAIL, isSeller, PASSWORDHASH], (err, result) => {
        if (err) {
            console.log(res.status(500))
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving data');
            return;
        }
        console.log('User added:', result);
        res.send('Signup successful!');
    });
});
 //user authentification
 /*app.post('/signIn', (req, res) => {
    const { USERNAME, PASSWORDHASH } = req.body;
    
    const sql = 'SELECT * FROM users WHERE USERNAME = ? AND PASSWORDHASH = ?';
    db.query(sql, [USERNAME,PASSWORDHASH], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send('sign in successful!');
        } else {
            res.send('Invalid username or password');
        }
    });
});*/
app.post('/signIn', (req, res) => {
    const { USERNAME, PASSWORDHASH } = req.body;

    if (!USERNAME || !PASSWORDHASH) {
        return res.status(400).send('Username or password is missing!');
    }

    const sql = 'SELECT * FROM users WHERE USERNAME = ? AND PASSWORDHASH = ?';
    db.query(sql, [USERNAME, PASSWORDHASH], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal server error');
        }

        if (result.length > 0) {
            res.send('Sign in successful!');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});


// Start the Servercle
const PORT = 5000;
/*app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/
// Export the app for testing
module.exports = app;

// Start the server only when not testing
if (require.main === module) {
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
