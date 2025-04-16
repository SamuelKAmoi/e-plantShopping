import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };
  const amount = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity * item.cost;
    }, 0);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        dispatch(
          updateQuantity({
            name: item.name,
            quantity: existingItem.quantity - 1,
          })
        );
      }
    }
  };

  const calculateTotalCost = (item) => {
    const foundItem = cart.find((x) => x.name === item.name);

    if (
      foundItem &&
      typeof foundItem.quantity === "number" &&
      typeof foundItem.cost === "number"
    ) {
      return foundItem.cost * foundItem.quantity;
    }

    return 0;
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
