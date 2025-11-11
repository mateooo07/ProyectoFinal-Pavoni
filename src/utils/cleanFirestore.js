import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

export const cleanAllProducts = async () => {
    try {
        console.log('Limpiando productos duplicados...');
        
        const productosRef = collection(db, 'productos');
        const snapshot = await getDocs(productosRef);
        
        console.log(`Productos encontrados: ${snapshot.size}`);
        
        const deletePromises = snapshot.docs.map(docSnapshot => 
        deleteDoc(doc(db, 'productos', docSnapshot.id))
        );
        
        await Promise.all(deletePromises);
        
        console.log('Todos los productos fueron eliminados');
        console.log('Ahora ejecuta uploadProducts() para subirlos de nuevo');
        
        return { success: true, message: 'Productos eliminados correctamente' };
    } catch (error) {
        console.error('Error al limpiar productos:', error);
        return { success: false, message: error.message };
    }
};