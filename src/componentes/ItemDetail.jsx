import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ producto }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem } = useCart();

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
        addItem(producto, quantity);
    };

    return (
        <div className="item-detail-container">
        <div className="item-detail-card">
            <div className="item-detail-image">
            <div className="placeholder-image">
                💡
            </div>
            </div>
            
            <div className="item-detail-info">
            <h2 className="item-detail-title">{producto.nombre}</h2>
            <p className="item-detail-description">{producto.descripcion}</p>
            <p className="item-detail-category">
                <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p className="item-detail-price">
                ${producto.precio.toLocaleString('es-AR')}
            </p>

            <div className="item-detail-actions">
                {quantityAdded === 0 ? (
                <ItemCount 
                    stock={producto.stock} 
                    initial={1} 
                    onAdd={handleOnAdd} 
                />
                ) : (
                <div className="item-added-actions">
                    <p className="success-message">
                    ✓ {quantityAdded} producto(s) agregado(s) al carrito
                    </p>
                    <div className="btn-group">
                    <Link to="/cart" className="btn-go-cart">
                        Ir al carrito
                    </Link>
                    <Link to="/" className="btn-continue">
                        Seguir comprando
                    </Link>
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
};

export default ItemDetail;