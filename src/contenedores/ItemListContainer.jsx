import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import ItemList from '../componentes/ItemList';
import Loader from '../componentes/Loader';
import './ItemListContainer.css';

const ItemListContainer = ({ saludo }) => {
    const { categoriaId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const getProductos = async () => {
        try {
            const productosRef = collection(db, 'productos');
            let q;

            if (categoriaId) {
            q = query(productosRef, where('categoria', '==', categoriaId));
            } else {
            q = productosRef;
            }

            const querySnapshot = await getDocs(q);
            const productosData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));

            setItems(productosData);
        } catch (err) {
            console.error('Error al obtener productos:', err);
            setError('No se pudieron cargar los productos. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
        };

        getProductos();
    }, [categoriaId]);

    if (loading) {
        return <Loader message="Cargando productos..." />;
    }

    if (error) {
        return (
        <div className="error-container">
            <p className="error-message">❌ {error}</p>
        </div>
        );
    }

    return (
        <div className="item-list-container">
        {saludo && <h2 className="greeting">{saludo}</h2>}
        {categoriaId && (
            <h3 className="category-title">
            Categoría: <span>{categoriaId}</span>
            </h3>
        )}
        {items.length === 0 ? (
            <div className="no-products">
            <p>No hay productos disponibles en esta categoría.</p>
            </div>
        ) : (
            <ItemList productos={items} />
        )}
        </div>
    );
};

export default ItemListContainer;