import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalItems = getTotalQuantity();

  return (
    <Link to="/cart" className="cart-widget">
      <span className="cart-icon" role="img" aria-label="carrito">🛒</span>
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </Link>
  );
};

export default CartWidget;