import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import './BarraNavegacion.css';

const BarraNavegacion = () => {
    return (
        <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo">
            <span className="logo-text">LuminaLámparas</span>
            </Link>
            
            <div className="navbar-menu">
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                end
            >
                Inicio
            </NavLink>
            <NavLink 
                to="/categoria/modernas" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
                Modernas
            </NavLink>
            <NavLink 
                to="/categoria/vintage" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
                Vintage
            </NavLink>
            <NavLink 
                to="/categoria/oficina" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
                Oficina
            </NavLink>
            <NavLink 
                to="/categoria/rusticas" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
                Rústicas
            </NavLink>
            <CartWidget />
            </div>
        </div>
        </nav>
    );
};

export default BarraNavegacion;