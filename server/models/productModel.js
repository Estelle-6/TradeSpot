import db from "../config/db.js";

// const createProduct = (productData, userId, callback) => {
//   const { title, description, price, quantity, category, location, images } =
//     productData;
//   const query =
//     "INSERT INTO products (title, description, price, quantity, category, location, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
//   db.query(
//     query,
//     [title, description, price, quantity, category, location, userId],
//     callback
//   );
// };

const createProduct = (productData, userId, callback) => {
  const { title, description, price, quantity, category, location, images } =
    productData;

  // First insert the product
  const productQuery =
    "INSERT INTO products (title, description, price, quantity, category, location, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    productQuery,
    [title, description, price, quantity, category, location, userId],
    (err, result) => {
      if (err) return callback(err);

      // If there are images, insert them
      if (images && images.length > 0) {
        const productId = result.insertId;
        const imageValues = images.map((url) => [productId, url]);
        const imageQuery =
          "INSERT INTO product_images (product_id, image_url) VALUES ?";

        db.query(imageQuery, [imageValues], (imageErr) => {
          if (imageErr) return callback(imageErr);
          callback(null, result);
        });
      } else {
        callback(null, result);
      }
    }
  );
};

const getProducts = (callback) => {
  // const query = "SELECT * FROM products";
  //   const query = `
  //   SELECT
  //     p.id,
  //     p.user_id,
  //     p.title,
  //     p.description,
  //     p.price,
  //     p.quantity,
  //     p.category,
  //     p.location,
  //     p.created_at,
  //     IFNULL(GROUP_CONCAT(pi.image_url SEPARATOR ','), '') AS images
  //   FROM products p
  //   LEFT JOIN product_images pi ON p.id = pi.product_id
  //   GROUP BY p.id
  //   LIMIT 25;
  // `;

  const query = `
    SELECT p.*, GROUP_CONCAT(pi.image_url) as image_urls
    FROM products p
    LEFT JOIN product_images pi ON p.id = pi.product_id
    GROUP BY p.id
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
//===============buy product==========================
// models/productModel.js

export const decrementQuantity = (productId, callback) => {
  console.log("at the model: ", productId);
  const query =
    "UPDATE products SET quantity = quantity - 1 WHERE id = ? AND quantity > 0";
  db.query(query, [productId], callback);
};

export const createPurchase = (productId, userId, callback) => {
  const query = `
    INSERT INTO purchases (product_id, user_id, purchase_date, status)
    VALUES (?, ?, NOW(), 'pending')
  `;
  db.query(query, [productId, userId], callback);
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  decrementQuantity,
  createPurchase,
};
