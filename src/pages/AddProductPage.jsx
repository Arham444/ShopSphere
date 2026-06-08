import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../features/products/productSlice";
import { selectIsAdmin } from "../features/auth/authSelectors";
import styles from "./AddProductPage.module.css";

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
  const isAdmin = useSelector(selectIsAdmin);
  const [form, setForm] = useState(initialFormState);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  if (!isAdmin) {
    return (
      <div className={styles.deniedContainer}>
        <div className={styles.deniedCard}>
          <span className={styles.deniedIcon}>🔒</span>
          <p className={styles.deniedMessage}>Only Admin can create products.</p>
          <button onClick={() => navigate("/login")} className={styles.deniedBtn}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

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
    <div className={styles.page}>
      <h1 className={styles.title}>Add New Product</h1>
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label}>Product Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Mechanical Keyboard"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={styles.input}
            required
          >
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Price ($) *</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 89.99"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Rating (0–5) *</label>
          <input
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="e.g. 4.5"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Stock *</label>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="e.g. 15"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product details..."
            className={styles.input}
            style={{ resize: "vertical" }}
            rows={4}
            required
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Product Image *</label>
          <button
            type="button"
            onClick={handleImageUpload}
            className={styles.uploadBtn}
          >
            {imageUrl ? "Change Image" : "Upload Image"}
          </button>
          {imageUrl && (
            <div className={styles.previewWrapper}>
              <img
                src={imageUrl}
                alt="Uploaded preview"
                className={styles.preview}
              />
              <p className={styles.previewNote}>Image uploaded successfully</p>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
