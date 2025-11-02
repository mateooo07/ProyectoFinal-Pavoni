// ============================================
// ARCHIVO: src/componentes/Checkout.jsx (CON ACTUALIZACIÓN DE STOCK)
// ============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../services/firebase';
import './Checkout.css';

const Checkout = () => {
    const { cart, getTotalPrice, getTotalQuantity, clear } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        emailConfirm: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
        newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.apellido.trim()) {
        newErrors.apellido = 'El apellido es requerido';
        }

        if (!formData.telefono.trim()) {
        newErrors.telefono = 'El teléfono es requerido';
        } else if (!/^\d{10}$/.test(formData.telefono)) {
        newErrors.telefono = 'El teléfono debe tener 10 dígitos';
        }

        if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'El email no es válido';
        }

        if (formData.email !== formData.emailConfirm) {
        newErrors.emailConfirm = 'Los emails no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkStock = async () => {
        try {
        for (const item of cart) {
            const docRef = doc(db, 'productos', item.id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
            const currentStock = docSnap.data().stock;
            
            if (currentStock < item.quantity) {
                alert(`Lo sentimos, solo hay ${currentStock} unidades disponibles de "${item.nombre}"`);
                return false;
            }
            } else {
            alert(`El producto "${item.nombre}" ya no está disponible`);
            return false;
            }
        }
        return true;
        } catch (error) {
        console.error('Error al verificar stock:', error);
        return false;
        }
    };

    const updateStock = async () => {
        try {
        const batch = writeBatch(db);

        cart.forEach((item) => {
            const productRef = doc(db, 'productos', item.id);
            batch.update(productRef, {
            stock: item.stock - item.quantity
            });
        });

        await batch.commit();
        console.log('Stock actualizado correctamente');
        } catch (error) {
        console.error('Error al actualizar stock:', error);
        throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        setLoading(true);

        try {
        const stockAvailable = await checkStock();
        if (!stockAvailable) {
            setLoading(false);
            return;
        }

        const order = {
            buyer: {
            nombre: formData.nombre,
            apellido: formData.apellido,
            telefono: formData.telefono,
            email: formData.email
            },
            items: cart.map(item => ({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            quantity: item.quantity
            })),
            total: getTotalPrice(),
            totalQuantity: getTotalQuantity(),
            date: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, 'orders'), order);
        
        await updateStock();
        
        setOrderId(docRef.id);
        clear();
        
        console.log('Orden creada exitosamente:', docRef.id);
        } catch (error) {
        console.error('Error al crear la orden:', error);
        alert('Hubo un error al procesar tu compra. Por favor, intenta nuevamente.');
        } finally {
        setLoading(false);
        }
    };

    if (cart.length === 0 && !orderId) {
        navigate('/');
        return null;
    }

    if (orderId) {
        return (
        <div className="order-success">
            <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>¡Compra realizada con éxito!</h2>
            <p>Tu número de orden es:</p>
            <div className="order-id">{orderId}</div>
            <p className="success-message">
                Recibirás un email con los detalles de tu compra.
            </p>
            <button 
                className="btn-back-home"
                onClick={() => navigate('/')}
            >
                Volver al inicio
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="checkout-container">
        <h1>Finalizar Compra</h1>
        
        <div className="checkout-content">
            <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Datos del comprador</h2>
            
            <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="apellido">Apellido *</label>
                <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={errors.apellido ? 'error' : ''}
                />
                {errors.apellido && <span className="error-message">{errors.apellido}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 1234567890"
                className={errors.telefono ? 'error' : ''}
                />
                {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@email.com"
                className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="emailConfirm">Confirmar Email *</label>
                <input
                type="email"
                id="emailConfirm"
                name="emailConfirm"
                value={formData.emailConfirm}
                onChange={handleChange}
                placeholder="ejemplo@email.com"
                className={errors.emailConfirm ? 'error' : ''}
                />
                {errors.emailConfirm && <span className="error-message">{errors.emailConfirm}</span>}
            </div>

            <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
            >
                {loading ? 'Procesando...' : 'Confirmar compra'}
            </button>
            </form>

            <div className="order-summary">
            <h2>Resumen del pedido</h2>
            <div className="summary-items">
                {cart.map(item => (
                <div key={item.id} className="summary-item">
                    <span>{item.nombre} x{item.quantity}</span>
                    <span>${(item.precio * item.quantity).toLocaleString('es-AR')}</span>
                </div>
                ))}
            </div>
            <div className="summary-total">
                <span>Total:</span>
                <strong>${getTotalPrice().toLocaleString('es-AR')}</strong>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Checkout;