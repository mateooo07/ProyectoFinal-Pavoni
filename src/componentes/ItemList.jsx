import React from 'react';
import Item from './Item';

const ItemList = ({ productos }) => {
    return (
        <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
        }}
        >
        {productos.map((producto) => (
            <Item key={producto.id} producto={producto} />
        ))}
        </div>
    );
};

export default ItemList;