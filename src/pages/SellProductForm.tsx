import React, { useState, FormEvent, ChangeEvent, useRef } from "react";
import { productAPI } from "../services/api"; // Adjust the path as needed
interface ProductData {
  title: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  location: string;
  images: File[];
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  quantity?: string;
  category?: string;
  location?: string;
  images?: string;
}

const SellProductForm: React.FC = () => {
  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Toys",
    "Other",
  ];

  const [productData, setProductData] = useState<ProductData>({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    location: "",
    images: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const formErrors: FormErrors = {};

    if (!productData.title.trim()) formErrors.title = "Title is required";
    if (!productData.description.trim())
      formErrors.description = "Description is required";
    if (!productData.price) formErrors.price = "Price is required";
    if (!productData.quantity) formErrors.quantity = "Quantity is required";
    if (!productData.category) formErrors.category = "Category is required";
    if (!productData.location.trim())
      formErrors.location = "Location is required";
    if (productData.images.length === 0)
      formErrors.images = "At least one image is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file: File) => formData.append("images", file));
      } else {
        formData.append(key, value);
      }
    });

    console.log("FormData contents:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      console.log("Starting product creation...");
      const response = await productAPI.create(formData);
      alert("product created successfully: ");
      console.log("Product created successfully:", response.data);
      window.location.href = "/home";
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      // You might want to show this error to the user
      alert(
        "Failed to create product: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Product Title
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter product name"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </label>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Description
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              rows={4}
              placeholder="Describe your product"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Price
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Quantity
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                placeholder="How many items?"
                min="1"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Category
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Location
              <input
                type="text"
                name="location"
                value={productData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                placeholder="City, State"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Product Images
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-left"
            >
              Select Images
            </button>
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          List Product
        </button>
      </form>
    </div>
  );
};

export default SellProductForm;
