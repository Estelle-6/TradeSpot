import db from "../config/db.js";

const createProduct = (productData, userId, callback) => {
  const { title, description, price, quantity, category, location } =
    productData;
  const query =
    "INSERT INTO products (title, description, price, quantity, category, location, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [title, description, price, quantity, category, location, userId],
    callback
  );
};

const getProducts = (callback) => {
  // const query = "SELECT * FROM products";
  const query = `
  SELECT 
    p.id, 
    p.user_id, 
    p.title, 
    p.description, 
    p.price, 
    p.quantity, 
    p.category, 
    p.location, 
    p.created_at,
    IFNULL(GROUP_CONCAT(pi.image_url SEPARATOR ','), '') AS images
  FROM products p
  LEFT JOIN product_images pi ON p.id = pi.product_id
  GROUP BY p.id
  LIMIT 25;
`;
  db.query(query, callback);
};

const getProductById = (productId, callback) => {
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [productId], callback);
};

const updateProduct = (productId, productData, callback) => {
  const { title, description, price, quantity, category, location } =
    productData;
  const query =
    "UPDATE products SET title=?, description=?, price=?, quantity=?, category=?, location=? WHERE id=?";
  db.query(
    query,
    [title, description, price, quantity, category, location, productId],
    callback
  );
};

const deleteProduct = (productId, callback) => {
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [productId], callback);
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
