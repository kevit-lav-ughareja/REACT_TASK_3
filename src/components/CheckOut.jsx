import React from "react";
import "./CheckOut.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import CreditCard from "./CreditCard";
/* import { useForm } from "../UseContext"; */

const CheckOut = () => {
  /* const { isActive, user } = useForm(); */
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleFinish = () => {
    dispatch(clearCart());
    navigate("/products");
  };
  return (
    <div className="checkout-container">
      <h2>🧾 Order Summary</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          {isActive ? (
            <div>
              <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
              <h2>Thank you for shopping with us!</h2>

              <button className="finish-btn" onClick={handleFinish}>
                Finish
              </button>
            </div>
          ) : (
            <CreditCard isActive={isActive} setIsActive={setIsActive} />
          )}
        </>
      )}
    </div>
  );
};

export default CheckOut;
