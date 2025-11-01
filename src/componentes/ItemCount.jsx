import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
    const [count, setCount] = useState(initial);

    const handleIncrement = () => {
        if (count < stock) {
        setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
        setCount(count - 1);
        }
    };

    const handleAdd = () => {
        if (stock > 0 && count <= stock) {
        onAdd(count);
        }
    };

    return (
        <div className="item-count">
        <div className="item-count-controls">
            <button 
            className="btn-count" 
            onClick={handleDecrement}
            disabled={count <= 1}
            >
            -
            </button>
            <span className="count-display">{count}</span>
            <button 
            className="btn-count" 
            onClick={handleIncrement}
            disabled={count >= stock}
            >
            +
            </button>
        </div>
        <button 
            className="btn-add-cart" 
            onClick={handleAdd}
            disabled={stock === 0}
        >
            {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
        <p className="stock-info">Stock disponible: {stock}</p>
        </div>
    );
};

export default ItemCount;