import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import cartImage from "../assets/image_cart.png";
import WebsiteImage from "../assets/icon.png";
import { useSelector } from "react-redux";

function Header() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <header className="header">
      <div className="logo">
        <img src={WebsiteImage} alt="Cart" width={80} height={80} />
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/user">User</Link>

        <Link to="/login">Login</Link>
        <Link to="/signup">signup</Link>
        <Link to="/cart">
          <div className="cart-icon">
            <img src={cartImage} alt="Cart" width={30} height={30} />

            {totalQuantity > 0 && (
              <span className="count-item">{totalQuantity}</span>
            )}
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
