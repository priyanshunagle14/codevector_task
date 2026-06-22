const Product = require("../models/product");

const getProducts = async ({ category, cursor, limit }) => {
  const query = {};

  if (category) {
    query.category = category;
  }

  //  Cursor pagination (NO duplicates, NO missing items)
  if (cursor) {
    query.createdAt = { $lt: new Date(cursor) };
  }

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .limit(limit);

  const nextCursor =
    products.length > 0
      ? products[products.length - 1].createdAt
      : null;

  return {
    products,
    nextCursor,
  };
};

module.exports = { getProducts };
