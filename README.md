# Sistema de Gestión - Tortillería La Herradura

## 📋 Descripción

Sistema de gestión integral para la tortillería "La Herradura" que permite administrar clientes, productos, ventas, compras, empleados y proveedores de manera eficiente.

## 🚀 Características

- **Gestión de Clientes**: Registro y consulta de clientes frecuentes
- **Control de Inventario**: Administración de productos y stock
- **Registro de Ventas**: Captura y seguimiento de ventas
- **Control de Compras**: Gestión de compras a proveedores
- **Gestión de Empleados**: Administración del personal
- **Gestión de Proveedores**: Control de proveedores
- **Reportes**: Generación de reportes y análisis
- **Interfaz Moderna**: Diseño responsive y fácil de usar

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Dependencias**: mysql2, cors, dotenv, bcryptjs, jsonwebtoken

## 📦 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- MySQL Server
- MySQL Workbench (para administración de BD)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd APP-GestorMID
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la base de datos**
   - Abrir MySQL Workbench
   - Conectarse a tu servidor MySQL (127.0.0.1:3306)
   - Crear la base de datos si no existe
   - Actualizar la configuración en `config/database.js`

4. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   - Abrir el navegador
   - Ir a: `http://localhost:3000`

## ⚙️ Configuración de Base de Datos

Editar el archivo `config/database.js` con tus datos de conexión:

```javascript
const dbConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '', // Tu contraseña si la tienes
  database: 'nombre_de_tu_base_de_datos'
};
```

## 📁 Estructura del Proyecto

```
APP-GestorMID/
├── config/
│   └── database.js          # Configuración de BD
├── public/
│   ├── index.html           # Página principal
│   └── js/
│       └── app.js          # JavaScript del frontend
├── server.js               # Servidor principal
├── package.json            # Dependencias
└── README.md              # Este archivo
```

## 🔧 Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon

## 📊 Módulos del Sistema

### 1. Clientes
- Agregar nuevos clientes
- Consultar clientes existentes
- Actualizar información
- Eliminar registros

### 2. Productos
- Gestión de inventario
- Control de stock
- Precios y categorías

### 3. Ventas
- Registro de ventas
- Historial de transacciones
- Cálculo automático de totales

### 4. Compras
- Control de compras a proveedores
- Gestión de pedidos
- Seguimiento de entregas

### 5. Empleados
- Registro de personal
- Asignación de roles
- Control de acceso

### 6. Proveedores
- Catálogo de proveedores
- Información de contacto
- Historial de compras

### 7. Reportes
- Reportes de ventas
- Análisis de inventario
- Estadísticas del negocio

### 8. Configuración
- Ajustes del sistema
- Configuración de BD
- Información del sistema

## 🔒 Seguridad

- Validación de datos en frontend y backend
- Sanitización de inputs
- Protección contra inyección SQL
- Autenticación de usuarios (en desarrollo)

## 🐛 Solución de Problemas

### Error de Conexión a MySQL
1. Verificar que MySQL esté ejecutándose
2. Confirmar los datos de conexión en `config/database.js`
3. Verificar que la base de datos exista

### Error de Puerto en Uso
- Cambiar el puerto en `server.js` línea 8
- O terminar el proceso que use el puerto 3000

## 📞 Soporte

Para soporte técnico o reportar problemas:
- Revisar la consola del navegador (F12)
- Verificar los logs del servidor
- Confirmar la configuración de la base de datos

## 🔄 Actualizaciones

Para actualizar el sistema:
1. Hacer backup de la base de datos
2. Descargar la nueva versión
3. Ejecutar `npm install`
4. Reiniciar el servidor

## 📄 Licencia

Este proyecto es desarrollado para uso educativo y comercial de la Tortillería La Herradura.

---

**Desarrollado con ❤️ para optimizar la gestión de la Tortillería La Herradura** 