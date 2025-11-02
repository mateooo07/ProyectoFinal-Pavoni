import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import productos from '../data/productos';

export const uploadProducts = async () => {
    try {
        const productosRef = collection(db, 'productos');
        const snapshot = await getDocs(productosRef);
        
        if (snapshot.size > 0) {
        console.log(`Ya hay ${snapshot.size} productos en Firestore`);
        console.log('Si quieres volver a subirlos, primero ejecuta cleanAllProducts()');
        return { 
            success: false, 
            message: `Ya hay ${snapshot.size} productos. Usa cleanAllProducts() primero.` 
        };
        }
        
        console.log('Subiendo productos a Firestore...');
        
        for (const producto of productos) {
        const { id, ...productoData } = producto;
        
        await addDoc(productosRef, productoData);
        console.log(`Producto "${producto.nombre}" subido correctamente`);
        }
        
        console.log('Todos los productos fueron subidos exitosamente');
        console.log(`Total de productos: ${productos.length}`);
        
        return { success: true, message: 'Productos subidos correctamente' };
    } catch (error) {
        console.error('Error al subir productos:', error);
        return { success: false, message: error.message };
    }
};