import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>₹ {product.price}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    width: "200px",
    background: "#fff",
  },
};

export default ProductCard;