import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);

  const fetchProducts = useCallback(async () => {
    let url ="https://code-vectortask.onrender.com/api/products?limit=20";

    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProducts(data.data);
    setCursor(data.nextCursor);
  }, [cursor]);

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

      <button onClick={fetchProducts} style={styles.btn}>
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