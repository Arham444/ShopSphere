const products = [
  // ── Electronics ──────────────────────────────────────────
  {
    id: "e1",
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 129.99,
    rating: 4.5,
    stock: 12,
    createdAt: "2024-01-10",
    image:
      "https://res.cloudinary.com/dnwohqbqt/image/upload/v1780331667/1MORE-SonoFlow-SE-Noise-Cancelling-Headphones-HQ30-Product-vendor-100433474_smxugy.jpg",
    description:
      "Over-ear headphones with active noise cancellation, 30-hour battery life, and foldable design.",
  },
  {
    id: "e2",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    rating: 4.7,
    stock: 8,
    createdAt: "2024-02-14",
    image:
      "https://res.cloudinary.com/dnwohqbqt/image/upload/v1780331847/BEST-MECHANICAL-KEYBOARDS-2048px-EVOWORKS-80-926_mnzmrg.jpg",
    description:
      "Compact TKL mechanical keyboard with RGB backlighting and tactile switches.",
  },
  {
    id: "e3",
    name: "USB-C Hub 7-in-1",
    category: "Electronics",
    price: 45.99,
    rating: 4.3,
    stock: 20,
    createdAt: "2024-03-01",
    image:
      "https://res.cloudinary.com/dnwohqbqt/image/upload/v1780331879/61KYtBCqyfL._AC_UF894_1000_QL80__gekm15.jpg",
    description:
      "Expand your laptop with HDMI, USB-A, SD card, and PD charging ports.",
  },
  {
    id: "e4",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    rating: 4.2,
    stock: 15,
    createdAt: "2024-03-15",
    image:
      "https://res.cloudinary.com/dnwohqbqt/image/upload/v1780331969/portablebluetoothspeakers-2048px-9130_duqyul.jpg",
    description: "Waterproof speaker with 360° sound and 12-hour playtime.",
  },

  // ── Books ─────────────────────────────────────────────────
  {
    id: "b1",
    name: "Clean Code",
    category: "Books",
    price: 34.99,
    rating: 4.8,
    stock: 30,
    createdAt: "2024-01-05",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description:
      "A handbook of agile software craftsmanship by Robert C. Martin.",
  },
  {
    id: "b2",
    name: "The Pragmatic Programmer",
    category: "Books",
    price: 39.99,
    rating: 4.7,
    stock: 25,
    createdAt: "2024-01-20",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description:
      "Your journey to mastery — from journeyman to master programmer.",
  },
  {
    id: "b3",
    name: "You Don't Know JS",
    category: "Books",
    price: 29.99,
    rating: 4.6,
    stock: 18,
    createdAt: "2024-02-10",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description:
      "Deep dive into the core mechanisms of the JavaScript language.",
  },
  {
    id: "b4",
    name: "Designing Data-Intensive Applications",
    category: "Books",
    price: 49.99,
    rating: 4.9,
    stock: 10,
    createdAt: "2024-02-28",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description:
      "The big ideas behind reliable, scalable, and maintainable systems.",
  },

  // ── Clothing ──────────────────────────────────────────────
  {
    id: "c1",
    name: "Classic White T-Shirt",
    category: "Clothing",
    price: 19.99,
    rating: 4.1,
    stock: 50,
    createdAt: "2024-03-05",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description:
      "100% cotton everyday tee, pre-shrunk and available in all sizes.",
  },
  {
    id: "c2",
    name: "Slim Fit Chinos",
    category: "Clothing",
    price: 49.99,
    rating: 4.3,
    stock: 35,
    createdAt: "2024-03-10",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description:
      "Stretch chinos with a modern slim fit, perfect for casual or smart-casual wear.",
  },
  {
    id: "c3",
    name: "Hooded Zip Sweatshirt",
    category: "Clothing",
    price: 64.99,
    rating: 4.4,
    stock: 22,
    createdAt: "2024-03-20",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description: "Heavyweight fleece hoodie with kangaroo pocket and YKK zip.",
  },
  {
    id: "c4",
    name: "Running Sneakers",
    category: "Clothing",
    price: 89.99,
    rating: 4.6,
    stock: 14,
    createdAt: "2024-04-01",
    image:
      "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.png",
    description:
      "Lightweight mesh sneakers with responsive foam sole for daily runs.",
  },
];

export default products;
