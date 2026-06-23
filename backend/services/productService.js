const Product = require("../models/product");

const getProducts = async ({ category, cursor, limit }) => {
  const query = {};

  if (category) {
    query.category = category;
  }

  if (cursor) {
    const [cursorDate, cursorId] = cursor.split("_");
    query.$or = [
      { createdAt: { $lt: new Date(cursorDate) } },
      { createdAt: new Date(cursorDate), _id: { $lt: cursorId } },
    ];
  }

  const products = await Product.find(query)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit);

  const nextCursor =
    products.length > 0
      ? `${products[products.length - 1].createdAt.toISOString()}_${products[products.length - 1]._id}`
      : null;

  return {
    products,
    nextCursor,
  };
};

module.exports = { getProducts };