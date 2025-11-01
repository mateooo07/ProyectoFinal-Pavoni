import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
    const { cart, getTotalPrice, getTotalQuantity, clear } = useCart();

    if (cart.length === 0) {
        return (
        <div className="cart-empty">
            <div className="cart-empty-content">
            <div className="cart-empty-icon">🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p>¡Descubre nuestras increíbles lámparas!</p>
            <Link to="/" className="btn-back-home">
                Ir al catálogo
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="cart-container">
        <div className="cart-header">
            <h1>Mi Carrito</h1>
            <button className="btn-clear-cart" onClick={clear}>
            Vaciar carrito
            </button>
        </div>

        <div className="cart-content">
            <div className="cart-items-list">
            {cart.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
            </div>

            <div className="cart-summary">
            <h2>Resumen del pedido</h2>
            <div className="summary-detail">
                <div className="summary-row">
                <span>Productos:</span>
                <strong>{getTotalQuantity()} unidades</strong>
                </div>
                <div className="summary-row total">
                <span>Total:</span>
                <strong className="total-price">
                    ${getTotalPrice().toLocaleString('es-AR')}
                </strong>
                </div>
            </div>
            <Link to="/checkout" className="btn-checkout">
                Finalizar compra
            </Link>
            <Link to="/" className="btn-continue-shopping">
                Seguir comprando
            </Link>
            </div>
        </div>
        </div>
    );
};

export default Cart;