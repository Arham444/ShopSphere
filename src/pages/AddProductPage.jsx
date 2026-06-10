import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addProduct } from "../features/products/productSlice";
import { selectIsAdmin } from "../features/auth/authSelectors";
import AccessDenied from "../components/AccessDenied";
import { CiLock } from "react-icons/ci";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

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
      <AccessDenied
        message="Only Admin can create products."
        icon={<CiLock className="h-10 w-10 text-muted-foreground" />}
      />
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
    <div className="w-full mx-auto px-4 md:px-8 py-8 max-w-3xl min-h-[calc(100vh-140px)]">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-6 border-b">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Add New Product
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          {error && (
            <div className="p-3 mb-6 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Mechanical Keyboard"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  required
                >
                  {Categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 89.99"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0–5) *</Label>
                <Input
                  id="rating"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  placeholder="e.g. 4.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter product details..."
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Product Image *</Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-md p-4 bg-muted/20">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleImageUpload}
                  >
                    {imageUrl ? "Change Image" : "Upload Image"}
                  </Button>

                  {imageUrl && (
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden border">
                        <img
                          src={imageUrl}
                          alt="Uploaded preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium text-success">
                        Image uploaded successfully
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Add Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddProductPage;
