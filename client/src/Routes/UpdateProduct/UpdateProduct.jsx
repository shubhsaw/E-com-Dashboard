import React, { useState } from "react";
import styles from "./UpdateProduct.module.css";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    company: "",
    description: "",
    rating: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", product);
    alert("Product Updated (UI only)");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.field}>
          <label className={styles.label}>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Company Name:</label>
          <input
            type="text"
            name="company"
            value={product.company}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.btn}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
