import productModel from "../models/productModel.js";
import { upload } from "../config/cloudinary.js";

export const createProduct = (req, res) => {
  try {
    console.log("Full request details:");
    console.log("Headers:", req.headers);
    console.log("User:", req.user);
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Get Cloudinary URLs from uploaded files
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    // Check if images were uploaded
    if (imageUrls.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Prepare product data
    const productData = {
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      quantity: parseInt(req.body.quantity),
      category: req.body.category,
      location: req.body.location,
      userId: userId,
      images: imageUrls, // Add this field
    };

    // Validate product data
    const missingFields = Object.entries(productData)
      .filter(([key, value]) => value === undefined || value === null)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields: missingFields,
      });
    }

    productModel.createProduct(productData, userId, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          error: "Failed to create product",
          details: err.message,
        });
      }
      res.status(201).json({
        message: "Product created",
        productId: result.insertId,
        product: productData, // Return saved product with Cloudinary URLs
      });
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

// Middleware to handle file uploads
export const uploadMiddleware = upload.array("images", 5);
// =================================get products============================
export const getProducts = (req, res) => {
  productModel.getProducts((err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch products" });
    // Convert images from comma-separated string to an array
    const formattedResults = results.map((product) => ({
      ...product,
      image_urls: product.image_urls ? product.image_urls.split(",") : [], // Convert to array
    }));
    res.json(formattedResults);
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
