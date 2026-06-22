const categories = ["Electronics", "Fashion", "Books", "Home", "Sports"];

const randomProduct = () => {
  return {
    name: `Product-${Math.random().toString(36).substring(7)}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 10000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

module.exports = { randomProduct };