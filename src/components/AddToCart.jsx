import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, removeFromCart } from "../redux/cartSlice";
import "./AddToCart.css";
import { NavLink } from "react-router-dom";

const AddToCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const dispatch = useDispatch();
  const tax = totalAmount * 0.1;
  const grandTotal = totalAmount + tax;
  return (
    <>
      <div className="cart-container">
        <h2 className="cart-title">Cart Page</h2>
        {cartItems.length === 0 ? (
          <div>
            <h2>No item in cart</h2>
            <NavLink to="/products">
              <button>Go back to Shooping</button>
            </NavLink>
          </div>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                className="avatar"
                src={item.image}
                alt="Maria Skłodowska-Curie"
                width={70}
                height={70}
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>

                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="cart-buttons">
                  <button onClick={() => dispatch(increment(item.id))}>
                    +
                  </button>
                  <button onClick={() => dispatch(decrement(item.id))}>
                    -
                  </button>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <h3 className="total-amount">
          Total Amount: ${totalAmount.toFixed(2)}
        </h3>
        <div>
          <NavLink to={"/checkout"}>
            <button>Check Out </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
