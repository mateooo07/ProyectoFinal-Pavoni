import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import productos from '../data/productos';

export const uploadProducts = async () => {
    try {
        const productosRef = collection(db, 'productos');
        
        for (const producto of productos) {
        await addDoc(productosRef, producto);
        console.log(`Producto "${producto.nombre}" subido correctamente`);
        }
        
        console.log('Todos los productos fueron subidos exitosamente');
        return { success: true, message: 'Productos subidos correctamente' };
    } catch (error) {
        console.error('Error al subir productos:', error);
        return { success: false, message: error.message };
    }
};