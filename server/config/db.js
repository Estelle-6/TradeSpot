const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1FortheMoney*',
    database: 'tradespot',
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
});

db.connect((err)=>{
    if(err){
        console.log("Database Connection failed:", err);
        process.exit(1);
    }
    console.log("connected to tradespot database successfully");
})

module.exports = db;