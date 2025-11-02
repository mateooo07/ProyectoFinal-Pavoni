import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import BarraNavegacion from './componentes/BarraNavegacion';
import ItemListContainer from './contenedores/ItemListContainer';
import ItemDetailContainer from './contenedores/ItemDetailContainer';
import Cart from './componentes/Cart';
import Checkout from './componentes/Checkout';
import { uploadProducts } from './utils/uploadProducts';
import { cleanAllProducts } from './utils/cleanFirestore';
import './App.css';

const App = () => {
    // useEffect(() => {
    //     window.uploadProducts = uploadProducts;
    //     window.cleanAllProducts = cleanAllProducts;
        
    //     console.log('Funciones disponibles en consola:');
    //     console.log('window.uploadProducts()');
    //     console.log('window.cleanAllProducts()');
    // }, []);

    return (
        <CartProvider>
        <BrowserRouter>
            <div className="app">
            <BarraNavegacion />
            <main className="main-content">
                <Routes>
                <Route 
                    path="/" 
                    element={<ItemListContainer saludo="¡Bienvenido a LuminaLámparas!" />} 
                />
                <Route 
                    path="/categoria/:categoriaId" 
                    element={<ItemListContainer />} 
                />
                <Route 
                    path="/item/:id" 
                    element={<ItemDetailContainer />} 
                />
                <Route 
                    path="/cart" 
                    element={<Cart />} 
                />
                <Route 
                    path="/checkout" 
                    element={<Checkout />} 
                />
                <Route 
                    path="*" 
                    element={
                    <div className="not-found">
                        <h2>404 - Página no encontrada</h2>
                        <p>La página que buscas no existe.</p>
                        <a href="/">Volver al inicio</a>
                    </div>
                    } 
                />
                </Routes>
            </main>
            <footer className="app-footer">
                <p>© 2025 LuminaLámparas - Todos los derechos reservados</p>
            </footer>
            </div>
        </BrowserRouter>
        </CartProvider>
    );
};

export default App;