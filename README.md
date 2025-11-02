# Lumina Lámparas

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.20.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**Estudiante:** Mateo Pavoni   
**Curso / Comisión:** ReactJS / 88070

E-commerce moderno de lámparas desarrollado con React y Firebase, ofreciendo una experiencia de compra fluida y elegante.

## Descripción

**Lumina Lámparas** es una aplicación e-commerce completa para la venta de lámparas, construida con React y Firebase. Ofrece un catálogo de productos organizado por categorías, carrito de compras persistente, sistema de checkout con validación de formularios, y gestión de stock en tiempo real.

## Características

- **Catálogo de Productos**: 50 lámparas organizadas en múltiples categorías
- **Filtrado por Categorías**: Modernas, Vintage, Oficina, Rústicas
- **Carrito de Compras**: Gestión completa con actualización en tiempo real
- **Control de Stock**: Validación y actualización automática
- **Sistema de Checkout**: Formulario validado con confirmación de pedido
- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Performance**: Carga rápida y navegación fluida
- **Firebase Integration**: Base de datos Firestore en tiempo real
- **Feedback Visual**: Loaders, badges de stock, animaciones

## Tecnologías

### Frontend
- **React** 18.2.0 - Biblioteca de JavaScript para interfaces de usuario
- **React Router DOM** 6.20.0 - Enrutamiento declarativo
- **Bootstrap** 5.3.2 - Framework CSS para diseño responsivo
- **CSS3** - Estilos personalizados y animaciones

### Backend & Database
- **Firebase** 10.7.1
  - Firestore - Base de datos NoSQL en tiempo real
  - Firebase Hosting (opcional)

### Herramientas de Desarrollo
- **React Scripts** 5.0.1 - Scripts y configuración de Create React App
- **Testing Library** - Suite de testing para React

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**
- Cuenta de **Firebase** (gratuita)
- Editor de código (recomendado: VS Code)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/lumina-lamparas.git
cd lumina-lamparas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
```

> **Importante**: Nunca subas el archivo `.env` a repositorios públicos

## Configuración

### Configurar Firebase

1. **Crear proyecto en Firebase Console**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Registra una aplicación web

2. **Habilitar Firestore Database**
   - En el menú lateral, ve a "Firestore Database"
   - Crea una base de datos en modo producción
   - Selecciona la ubicación más cercana

3. **Configurar reglas de seguridad**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /productos/{producto} {
      allow read: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['stock'])
                    && request.resource.data.stock >= 0;
      allow create, delete: if false;
    }
    
    match /orders/{order} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

4. **Poblar la base de datos**

Abre la consola del navegador en tu aplicación y ejecuta:

```javascript
// Esta función está disponible en el código (comentada por seguridad)
// Para usarla, descomenta las líneas en App.js y ejecuta:
window.uploadProducts()
```

> **Nota**: Los productos se suben una sola vez. Si necesitas limpiar la base de datos, usa `window.cleanAllProducts()`

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Crear build de producción
npm run build

# Ejecutar tests
npm test

# Eyectar configuración de Create React App (irreversible)
npm run eject
```

### Desarrollo

```bash
npm start
```
- Abre [http://localhost:3000](http://localhost:3000)
- Recarga automática al guardar cambios
- Muestra errores de linting en consola

### Producción

```bash
npm run build
```
- Crea carpeta `build/` optimizada
- Minifica código y optimiza assets
- Lista para deployment

## Estructura del Proyecto

```
lumina-lamparas/
│
├── public/
│   └── index.html
│
├── src/
│   ├── componentes/
│   │   ├── BarraNavegacion.jsx
│   │   ├── BarraNavegacion.css
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   ├── CartItem.jsx
│   │   ├── CartItem.css
│   │   ├── CartWidget.jsx
│   │   ├── CartWidget.css
│   │   ├── Checkout.jsx
│   │   ├── Checkout.css
│   │   ├── Item.jsx
│   │   ├── Item.css
│   │   ├── ItemCount.jsx
│   │   ├── ItemCount.css
│   │   ├── ItemDetail.jsx
│   │   ├── ItemDetail.css
│   │   ├── ItemList.jsx
│   │   ├── ItemList.css
│   │   ├── Loader.jsx
│   │   └── Loader.css
│   │
│   ├── contenedores/
│   │   ├── ItemDetailContainer.jsx
│   │   ├── ItemListContainer.jsx
│   │   └── ItemListContainer.css
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── data/
│   │   └── productos.js
│   │
│   ├── services/
│   │   └── firebase.js
│   │
│   ├── utils/
│   │   ├── uploadProducts.js
│   │   └── cleanFirestore.js
│   │
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

## Funcionalidades

### Catálogo de Productos

- **Listado completo**: Visualización de todos los productos disponibles
- **Filtrado por categoría**: Navegación intuitiva entre categorías
- **Detalle de producto**: Información completa de cada artículo
- **Badges de stock**: Indicadores visuales de disponibilidad

### Carrito de Compras

- **Agregar productos**: Con selector de cantidad
- **Modificar cantidades**: Actualización en tiempo real
- **Eliminar productos**: Gestión individual de items
- **Vaciar carrito**: Limpieza completa con un click
- **Persistencia**: Mantenimiento del estado durante la sesión

### Sistema de Checkout

- **Formulario validado**: 
  - Nombre y apellido
  - Teléfono (10 dígitos)
  - Email con confirmación
  - Validación en tiempo real

- **Verificación de stock**: Antes de confirmar la orden
- **Actualización automática**: Descuento de stock post-compra
- **Confirmación**: Número de orden único
- **Seguridad**: Transacciones batch de Firebase

### Gestión de Stock

```javascript
// Verificación antes de compra
const checkStock = async () => {
  for (const item of cart) {
    const docSnap = await getDoc(doc(db, 'productos', item.id));
    if (docSnap.data().stock < item.quantity) {
      return false;
    }
  }
  return true;
};

// Actualización post-compra
const updateStock = async () => {
  const batch = writeBatch(db);
  cart.forEach((item) => {
    batch.update(doc(db, 'productos', item.id), {
      stock: item.stock - item.quantity
    });
  });
  await batch.commit();
};
```

## Reglas de Firestore

Las reglas de seguridad implementadas garantizan:

- Lectura pública de productos
- Solo actualización de campo `stock` en productos
- Creación de órdenes sin autenticación
- Eliminación/modificación de productos no permitida
- Lectura/modificación de órdenes no permitida

## Deployment

### Vercel (Recomendado)

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Configurar variables de entorno** en Vercel Dashboard

### Firebase Hosting

1. **Instalar Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login**
```bash
firebase login
```

3. **Inicializar**
```bash
firebase init hosting
```

4. **Build y Deploy**
```bash
npm run build
firebase deploy
```

### Netlify

1. Conecta tu repositorio en [Netlify](https://netlify.com)
2. Configura:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Agrega variables de entorno
4. Deploy automático con cada push

## Solución de Problemas

### Error: Firebase no inicializado
```bash
# Verifica que todas las variables estén en .env
# Reinicia el servidor de desarrollo
npm start
```

### Error: No se cargan los productos
```bash
# Verifica las reglas de Firestore
# Asegúrate de haber subido los productos
window.uploadProducts()
```

### Error de CORS
```bash
# Limpia caché y reinstala
rm -rf node_modules package-lock.json
npm install
```

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.


---

## Webgrafía

- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Bootstrap](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)

---

<div align="center">

Hecho por Mateo Pavoni

</div>
