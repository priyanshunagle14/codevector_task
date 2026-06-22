const { getProducts } = require("../services/productService");

const fetchProducts = async (req, res) => {
  try {
    const { category, cursor, limit = 20 } = req.query;

    const data = await getProducts({
      category,
      cursor,
      limit: Number(limit),
    });

    res.json({
      success: true,
      data: data.products,
      nextCursor: data.nextCursor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchProducts };