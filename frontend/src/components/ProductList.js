import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (currentCursor = null) => {
    setLoading(true);
    let url = "https://code-vectortask.onrender.com/api/products?limit=20";

    if (currentCursor) {
      url += `&cursor=${currentCursor}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProducts(data.data);
    setCursor(data.nextCursor);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h2>Products</h2>

      {loading && <p>Loading products, please wait...</p>}

      <div style={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <button onClick={() => fetchProducts(cursor)} style={styles.btn} disabled={loading}>
        {loading ? "Loading..." : "Next Page →"}
      </button>
    </div>
  );
};

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
  },
  btn: {
    marginTop: "20px",
    padding: "10px",
    cursor: "pointer",
  },
};

export default ProductList;