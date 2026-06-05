import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../features/products/productSlice";
import { theme } from "../theme";

const Categories = [
  "Electronics",
  "Clothing",
  "Shoes",
  "Accessories",
  "Books",
  "Toys",
  "Sports",
  "Outdoors",
  "Groceries",
  "Beauty",
  "Home&Kitchen",
  "Pets",
  "Jewelry",
  "Watches",
  "Bags",
  "Luggage",
  "Travel",
];

const initialFormState = {
  name: "",
  category: Categories[0],
  price: "",
  rating: "",
  stock: "",
  description: "",
};

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialFormState);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ["local", "camera", "url"],
        multiple: false,
        cropping: false,
      },
      (error, result) => {
        if (!error && result.event === "success") setImageUrl(result.info.url);
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Product name is required.");
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      return setError("Please enter a valid price.");
    if (
      !form.rating ||
      isNaN(form.rating) ||
      Number(form.rating) < 0 ||
      Number(form.rating) > 5
    )
      return setError("Rating must be between 0 and 5.");
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0)
      return setError("Please enter a valid stock amount.");
    if (!imageUrl) return setError("Please upload a product image.");

    const newProductData = {
      id: `custom-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      price: parseFloat(Number(form.price).toFixed(2)),
      rating: parseFloat(Number(form.rating).toFixed(1)),
      stock: parseInt(form.stock, 10),
      description: form.description.trim(),
      image: imageUrl,
      createdAt: new Date().toISOString().split("T")[0],
    };

    dispatch(addProduct(newProductData));
    setForm(initialFormState);
    setImageUrl("");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Add New Product</h1>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.group}>
          <label style={styles.label}>Product Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Mechanical Keyboard"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
            required
          >
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Price ($) *</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 89.99"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Rating (0–5) *</label>
          <input
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="e.g. 4.5"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Stock *</label>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="e.g. 15"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product details..."
            style={{ ...styles.input, resize: "vertical" }}
            rows={4}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Product Image *</label>
          <button
            type="button"
            onClick={handleImageUpload}
            style={styles.uploadBtn}
          >
            {imageUrl ? "Change Image" : "Upload Image"}
          </button>
          {imageUrl && (
            <div style={styles.previewWrapper}>
              <img
                src={imageUrl}
                alt="Uploaded preview"
                style={styles.preview}
              />
              <p style={styles.previewNote}>Image uploaded successfully</p>
            </div>
          )}
        </div>

        <button type="submit" style={styles.submitBtn}>
          Add Product
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    padding: "2.5rem 3rem",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: theme.colors.primary,
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    maxWidth: "600px",
    margin: "0 auto",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "12px",
    padding: "2.5rem",
    boxShadow: theme.shadows.card,
    background: "#ffffff",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    ...theme.inputs.text,
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    width: "100%",
  },
  error: {
    background: "#fef2f2",
    border: `1px solid ${theme.colors.error}`,
    color: "#dc2626",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  uploadBtn: {
    ...theme.buttons.secondary,
    padding: "0.75rem 1.5rem",
    fontSize: "0.95rem",
    alignSelf: "flex-start",
  },
  previewWrapper: {
    marginTop: "0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  preview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: `1px solid ${theme.colors.border}`,
  },
  previewNote: {
    fontSize: "0.85rem",
    color: "green",
    fontWeight: "500",
    margin: 0,
  },
  submitBtn: {
    ...theme.buttons.primary,
    padding: "0.85rem",
    fontSize: "1rem",
    marginTop: "0.5rem",
  },
};

export default AddProductPage;
