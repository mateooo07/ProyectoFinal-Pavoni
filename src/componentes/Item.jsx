import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ producto }) => {
    return (
        <div className="item-card">
        <div className="item-image">
            <div className="placeholder-img">💡</div>
            {producto.stock <= 5 && producto.stock > 0 && (
            <span className="stock-badge low">Últimas unidades</span>
            )}
            {producto.stock === 0 && (
            <span className="stock-badge out">Sin stock</span>
            )}
        </div>
        
        <div className="item-content">
            <h3 className="item-title">{producto.nombre}</h3>
            <p className="item-category">{producto.categoria}</p>
            <p className="item-price">${producto.precio.toLocaleString('es-AR')}</p>
            
            <Link to={`/item/${producto.id}`} className="btn-detail">
            Ver detalle
            </Link>
        </div>
        </div>
    );
};

export default Item;
