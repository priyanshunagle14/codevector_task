const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const categories = ["Electronics", "Fashion", "Books", "Home", "Sports"];

const randomProduct = () => ({
  name: `Product-${Math.random().toString(36).substring(2, 10)}`,
  category: categories[Math.floor(Math.random() * categories.length)],
  price: Math.floor(Math.random() * 10000),
  createdAt: new Date(),
  updatedAt: new Date(),
});

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing old data...");
    await Product.deleteMany();

    const BATCH_SIZE = 5000;
    const TOTAL = 200000;

    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      const batch = [];

      for (let j = 0; j < BATCH_SIZE; j++) {
        batch.push(randomProduct());
      }

      await Product.insertMany(batch);
      console.log(`Inserted: ${i + BATCH_SIZE}`);
    }

    console.log("Seeding completed ✅");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();