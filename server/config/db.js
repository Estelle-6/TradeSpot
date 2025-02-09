// db.js
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1FortheMoney*',
    database: 'tradespot',
});

db.connect((err) => {
    if(err){
        console.log("Database Connection failed:", err);
        process.exit(1);
    }
    console.log("connected to tradespot database successfully");
});

export default db;