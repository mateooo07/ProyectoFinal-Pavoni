import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import ItemDetail from '../componentes/ItemDetail';
import Loader from '../componentes/Loader';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const getProducto = async () => {
        try {
            const docRef = doc(db, 'productos', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            setProducto({ id: docSnap.id, ...docSnap.data() });
            } else {
            setError('Producto no encontrado');
            }
        } catch (err) {
            console.error('Error al obtener el producto:', err);
            setError('No se pudo cargar el producto. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
        };

        getProducto();
    }, [id]);

    if (loading) {
        return <Loader message="Cargando producto..." />;
    }

    if (error) {
        return (
        <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            minHeight: '50vh'
        }}>
            <h2 style={{ color: '#f44336' }}>❌ {error}</h2>
            <a href="/" style={{ 
            color: '#ff9f1a', 
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold'
            }}>
            Volver al catálogo
            </a>
        </div>
        );
    }

    return producto ? <ItemDetail producto={producto} /> : null;
};

export default ItemDetailContainer;