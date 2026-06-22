const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "CodeVector API is running 🚀",
    status: "ok",
    endpoints: {
      products: "/api/products"
    }
  });
});
app.use("/api/products", productRoutes);

module.exports = app;