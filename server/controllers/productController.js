import productModel from "../models/productModel.js";

export const createProduct = (req, res) => {
  const userId = req.user.id; // Assuming user info is in request
  productModel.createProduct(req.body, userId, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to create product" });
    res.status(201).json({ message: "Product created", productId: result.insertId });
  });
};

export const getProducts = (req, res) => {
  productModel.getProducts((err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch products" });
    res.json(results);
  });
};

export const getProduct = (req, res) => {
  productModel.getProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to fetch product" });
    if (!result[0]) return res.status(404).json({ error: "Product not found" });
    res.json(result[0]);
  });
};

export const updateProduct = (req, res) => {
  productModel.updateProduct(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: "Failed to update product" });
    res.json({ message: "Product updated" });
  });
};

export const deleteProduct = (req, res) => {
  productModel.deleteProduct(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete product" });
    res.json({ message: "Product deleted" });
  });
};