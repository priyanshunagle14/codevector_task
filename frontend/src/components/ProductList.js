import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);

  const fetchProducts = useCallback(async (currentCursor = null) => {
    let url = "https://code-vectortask.onrender.com/api/products?limit=20";

    if (currentCursor) {
      url += `&cursor=${currentCursor}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProducts(data.data);
    setCursor(data.nextCursor);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h2>Products</h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <button onClick={() => fetchProducts(cursor)} style={styles.btn}>
        Next Page →
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