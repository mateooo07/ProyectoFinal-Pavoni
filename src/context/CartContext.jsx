import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
        setCart(cart.map(prod => 
            prod.id === item.id 
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        ));
        } else {
        setCart([...cart, { ...item, quantity }]);
        }
    };

    const removeItem = (itemId) => {
        setCart(cart.filter(prod => prod.id !== itemId));
    };

    const clear = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    const getTotalQuantity = () => {
        return cart.reduce((total, prod) => total + prod.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, prod) => total + (prod.precio * prod.quantity), 0);
    };

    const getProductQuantity = (itemId) => {
        const product = cart.find(prod => prod.id === itemId);
        return product ? product.quantity : 0;
    };

    return (
        <CartContext.Provider value={{
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        getTotalQuantity,
        getTotalPrice,
        getProductQuantity
        }}>
        {children}
        </CartContext.Provider>
    );
};
