import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3299,
    rating: 4.7,
    reviews: 128,
    stock: true,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    description: "Comfortable wireless headphones with rich sound.",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 3999,
    oldPrice: 4999,
    rating: 4.5,
    reviews: 96,
    stock: true,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    description: "A stylish watch for your everyday activities.",
  },
  {
    id: 3,
    name: "Everyday Backpack",
    category: "Accessories",
    price: 1499,
    oldPrice: 1999,
    rating: 4.4,
    reviews: 74,
    stock: true,
    badge: "",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    description: "A practical backpack for work, travel, and study.",
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Fashion",
    price: 2799,
    oldPrice: 3499,
    rating: 4.6,
    reviews: 112,
    stock: true,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    description: "Lightweight shoes designed for everyday comfort.",
  },
  {
    id: 5,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 999,
    oldPrice: 1299,
    rating: 4.2,
    reviews: 51,
    stock: true,
    badge: "",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    description: "Classic sunglasses with a modern design.",
  },
  {
    id: 6,
    name: "Minimal Desk Lamp",
    category: "Home",
    price: 1799,
    oldPrice: 2299,
    rating: 4.3,
    reviews: 43,
    stock: false,
    badge: "",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    description: "A clean, modern lamp for your workspace.",
  },
  {
    id: 7,
    name: "Travel Coffee Mug",
    category: "Home",
    price: 699,
    oldPrice: 899,
    rating: 4.1,
    reviews: 37,
    stock: true,
    badge: "Value Pick",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    description: "A reusable mug for coffee on the go.",
  },
  {
    id: 8,
    name: "Casual Sneakers",
    category: "Fashion",
    price: 2199,
    oldPrice: 2799,
    rating: 4.5,
    reviews: 89,
    stock: true,
    badge: "",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
    description: "Versatile sneakers for everyday outfits.",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const ProductDetails = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // Find the product matching the ID in the URL
  const product = products.find((item) => item.id === Number(id));

  // Handle invalid product IDs
  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link to="/Products">Back to Products</Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );

  const handleAddToCart = () => {
    setCartCount((count) => count + quantity);
  };

  return (
    <main className="product-details-page">
      {/* Breadcrumb */}
      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/Product">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product details */}
      <section className="product-details-container">
        {/* Product image */}
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />

          {product.badge && (
            <span className="details-badge">{product.badge}</span>
          )}
        </div>

        {/* Product information */}
        <div className="product-details-info">
          <span className="details-category">{product.category}</span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            <span>★</span>
            <strong>{product.rating}</strong>
            <span>({product.reviews} reviews)</span>
          </div>

          <p className="details-description">{product.description}</p>

          <div className="details-price">
            <strong>{formatPrice(product.price)}</strong>
            <del>{formatPrice(product.oldPrice)}</del>
            <span>{discount}% OFF</span>
          </div>

          <p className="details-stock">
            <span className={product.stock ? "in-stock" : "out-stock"}>
              {product.stock ? "● In Stock" : "● Out of Stock"}
            </span>
          </p>

          {product.stock && (
            <>
              <div className="quantity-control">
                <span>Quantity</span>

                <div className="quantity-buttons">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="details-add-cart"
                onClick={handleAddToCart}
              >
                Add to Cart · {formatPrice(product.price * quantity)}
              </button>

              {cartCount > 0 && (
                <p className="details-cart-message" role="status">
                  {cartCount} item(s) added to cart in this page.
                </p>
              )}
            </>
          )}

          <div className="details-features">
            <p>✓ Carefully selected product</p>
            <p>✓ Simple and secure shopping experience</p>
            <p>✓ Product information and pricing at a glance</p>
          </div>

          <Link to="/Products" className="back-to-products">
            ← Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
