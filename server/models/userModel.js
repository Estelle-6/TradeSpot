import db from "../config/db.js";

const createUser = (username, email, hashedPassword, callback) => {
  const query = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, hashedPassword], callback);
};

export default { createUser };