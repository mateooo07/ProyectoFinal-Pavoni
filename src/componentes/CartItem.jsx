import React from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { removeItem } = useCart();

    return (
        <div className="cart-item">
        <div className="cart-item-image">
            💡
        </div>
        
        <div className="cart-item-info">
            <h3 className="cart-item-name">{item.nombre}</h3>
            <p className="cart-item-category">{item.categoria}</p>
        </div>

        <div className="cart-item-quantity">
            <span>Cantidad:</span>
            <strong>{item.quantity}</strong>
        </div>

        <div className="cart-item-price">
            <p className="unit-price">
            ${item.precio.toLocaleString('es-AR')} c/u
            </p>
            <p className="subtotal">
            <strong>
                ${(item.precio * item.quantity).toLocaleString('es-AR')}
            </strong>
            </p>
        </div>

        <button 
            className="cart-item-remove"
            onClick={() => removeItem(item.id)}
            title="Eliminar producto"
        >
            🗑️
        </button>
        </div>
    );
};

export default CartItem;