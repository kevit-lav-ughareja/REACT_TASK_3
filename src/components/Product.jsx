import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Product.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

/* import Pagination from "./Pagination"; */
function Product() {
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerLoad = 5;
  /*  const [page, setPage] = useState(1); */
  /*   const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5); */

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredPosts(data);
        setVisibleProducts(data.slice(0, itemsPerLoad));
        setHasMore(data.length > itemsPerLoad);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setCategory(category);

    const filtered =
      category === "all"
        ? allProducts
        : allProducts.filter((item) => item.category === category);

    setFilteredPosts(filtered);
    setVisibleProducts(filtered.slice(0, itemsPerLoad));
    setHasMore(filtered.length > itemsPerLoad);
  };
  const fetchMoreData = () => {
    const moreItems = filteredPosts.slice(
      visibleProducts.length,
      visibleProducts.length + itemsPerLoad
    );

    setVisibleProducts([...visibleProducts, ...moreItems]);

    // Stop loading more if we've reached the end
    if (visibleProducts.length + moreItems.length >= filteredPosts.length) {
      setHasMore(false);
    }
  };

  if (!filteredPosts) return <p>Loading....</p>;

  /* fetchMoreData = () => {}; */
  /*  const lastPostInde = currentPage * postPerPage;
  const firstPostIndex = lastPostInde - postPerPage;
  const currentPost = filteredPosts.slice(firstPostIndex, lastPostInde); */
  return (
    <>
      <div className="filter-container">
        <select
          onChange={handleFilterChange}
          value={category}
          className="category-select"
        >
          <option value="all">All</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={visibleProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="loader">Loading ...</h4>}
        endMessage={
          <p className="end-message">
            <b>You've seen all products!</b>
          </p>
        }
      >
        <div className="product-container">
          {visibleProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <NavLink to={`/products/${item.id}`} className="product-link">
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-img"
                />
                <h3 className="product-title">
                  {item.title.length > 20
                    ? `${item.title.slice(0, 20)}...`
                    : item.title}
                </h3>
              </NavLink>
              <p className="product-price">${item.price}</p>
              <NavLink to="/cart">
                <button
                  className="add-to-cart-btn"
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add to Cart
                </button>
              </NavLink>
            </div>
          ))}
        </div>
        {/*   <Pagination
        totalPosts={filteredPosts.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      /> */}
      </InfiniteScroll>
    </>
  );
}

export default Product;
