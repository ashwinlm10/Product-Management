
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductManagement.css";

const ProductManagement = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  // Fetch products
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Search and category filtering
  const filteredProduct = product.filter(
    (prod) =>
      prod.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || prod.category === category)
  );

  // Price sorting
  const sortedProduct = [...filteredProduct].sort((a, b) => {
    if (sort === "low") {
      return a.price - b.price;
    } else if (sort === "high") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="product-container">
      <h1 className="product-heading">Product Management</h1>

      {/* Search and filters */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Product display */}
      {sortedProduct.length === 0 ? (
        <h2 className="no-products">No products found!</h2>
      ) : (
        <div className="product-grid">
          {sortedProduct.map((prod) => (
            <div className="product-card" key={prod.id}>
              <img
                className="product-image"
                src={prod.image}
                alt={prod.title}
              />

              <h3 className="product-title">{prod.title}</h3>

              <h3 className="product-price">
                ${prod.price}
              </h3>

              <h5 className="product-category">
                {prod.category}
              </h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
