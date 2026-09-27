import { useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";
import { json } from "./../../node_modules/zod/src/v4/classic/schemas";

const ProductListCustomHook = () => {
  const [url, setUrl] = useState("http://localhost:3000/products");
  const { data: products, loading } = useFetch(url);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "green" }}>
        Product List data with custum hooks{" "}
      </h2>
      <button
        className="filterBtn"
        onClick={() => setUrl("http://localhost:3000/products?in_stock=true")}
      >
        in_Stock
      </button>

      <button
        className="filterBtn"
        onClick={() => setUrl("http://localhost:3000/products")}
      >
        All
      </button>

      {loading && <p>page loading......</p>}
      {products &&
        products.map((product) => (
          <div className="productCard" key={product.id}>
            <span className="productId">{product.id}</span>

            <h2>{product.name}</h2>

            <div className="productBottom">
              <span className="productPrice"> ₹ {product.price}</span>

              <button
                className={
                  product.in_stock ? "stockBtn inStock" : "stockBtn unavailable"
                }
              >
                {product.in_stock ? "In Stock" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductListCustomHook;
