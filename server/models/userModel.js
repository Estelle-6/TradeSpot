const db = require("../config/db");

const createUser = (username, email, hashedpassword, callback)=>{
    const query = "INSER INTO users(username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedpassword], callback);
}

module.exports = {createUser};