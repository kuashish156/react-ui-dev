import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

const categories = ["All", "Electronics", "Accessories", "Fashion", "Home"];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function ProductList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sortBy]);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product.id]);
  };

  return (
    <div className="products-page">
      {/* Page heading */}
      <section className="products-hero">
        <div className="products-hero-content">
          <span className="products-eyebrow">THE ROUTEMATE COLLECTION</span>

          <h1>
            Find your next
            <span> favourite.</span>
          </h1>

          <p>
            Discover thoughtfully selected products for your everyday life,
            work, and adventures.
          </p>

          <div className="products-hero-stats">
            <div>
              <strong>{products.length}+</strong>
              <span>Products</span>
            </div>
            <div>
              <strong>{categories.length - 1}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>4.4 ★</strong>
              <span>Average rating</span>
            </div>
          </div>
        </div>

        <div className="products-hero-art" aria-hidden="true">
          <div className="art-circle"></div>
          <div className="art-card art-card-back"></div>
          <div className="art-card art-card-front">
            <span>✦</span>
            <strong>Discover more.</strong>
            <small>Find something you love.</small>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="product-catalog">
        <div className="catalog-heading">
          <div>
            <span className="products-eyebrow">OUR COLLECTION</span>
            <h2>Explore products</h2>
            <p>Find the right product for you.</p>
          </div>

          <div className="cart-summary">
            <span className="cart-summary-icon">🛍</span>
            <span>
              <strong>{cart.length}</strong>
              <small>Items added</small>
            </span>
          </div>
        </div>

        <div className="product-toolbar">
          <label className="product-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
            />
            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          <label className="product-sort">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </label>
        </div>

        <div className="category-filters" aria-label="Product categories">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={`category-chip ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-results-info">
          <p>
            Showing <strong>{filteredProducts.length}</strong>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {(search || category !== "All") && (
            <button
              type="button"
              className="reset-filters"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Product cards */}
        {filteredProducts.length > 0 ?
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <Link
                  to={`/Products/${product.id}`}
                  className="product-image-link"
                  aria-label={`View ${product.name} details`}
                >
                  <div className="product-image-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}

                    {!product.stock && (
                      <span className="stock-overlay">Out of stock</span>
                    )}
                  </div>
                </Link>

                <div className="product-card-content">
                  <span className="product-category">{product.category}</span>

                  <Link
                    to={`/Products/${product.id}`}
                    className="product-name-link"
                  >
                    <h3>{product.name}</h3>
                  </Link>

                  <p className="product-description">{product.description}</p>

                  <div className="product-rating">
                    <span>★</span>
                    <strong>{product.rating}</strong>
                    <span className="review-count">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="product-price-row">
                    <div className="product-prices">
                      <strong>{formatPrice(product.price)}</strong>
                      <del>{formatPrice(product.oldPrice)}</del>
                    </div>

                    <span className="discount-label">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  </div>

                  <div className="product-card-actions">
                    <Link
                      to={`/Products/${product.id}`}
                      className="view-product-btn"
                    >
                      View Details <span>→</span>
                    </Link>

                    <button
                      type="button"
                      className="add-cart-btn"
                      disabled={!product.stock}
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                      title="Add to cart"
                    >
                      {product.stock ? "+" : "−"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        : <div className="empty-products">
            <span>⌕</span>
            <h3>No products found</h3>
            <p>Try another search or select a different category.</p>
            <button
              type="button"
              className="view-product-btn"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Show all products
            </button>
          </div>
        }
      </section>

      {/* Bottom call to action */}
      <section className="products-cta">
        <div>
          <span>NEED A HAND?</span>
          <h2>Not sure what you're looking for?</h2>
          <p>Get in touch and we'll help you find the right fit.</p>
        </div>

        <Link to="/Contact" className="products-cta-button">
          Contact Us <span>→</span>
        </Link>
      </section>
    </div>
  );
}

export default ProductList;
