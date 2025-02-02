import db from "../config/db.js";

const createUser = (username, email, hashedPassword, callback) => {
  const query = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, hashedPassword], callback);
};

const findByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};
export default { createUser, findByEmail };