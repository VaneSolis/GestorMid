# ☁️ CONFIGURACIÓN DE CLEVER CLOUD MYSQL

## 🚀 PASOS PARA CONFIGURAR CLEVER CLOUD

### Paso 1: Crear cuenta en Clever Cloud
1. Ve a https://www.clever-cloud.com
2. Haz clic en "Sign up"
3. Regístrate con tu email
4. Confirma tu cuenta

### Paso 2: Crear base de datos MySQL
1. En el dashboard, haz clic en "Create"
2. Selecciona "MySQL"
3. Elige el plan gratuito
4. Dale un nombre a tu base de datos
5. Haz clic en "Create"

### Paso 3: Obtener credenciales
1. Una vez creada, haz clic en tu base de datos
2. Ve a la pestaña "Information"
3. Copia las credenciales:
   - **Host**: `mysql.clever-cloud.com`
   - **Database**: `tu-nombre-de-bd`
   - **User**: `tu-usuario`
   - **Password**: `tu-contraseña`
   - **Port**: `3306`

### Paso 4: Configurar tablas
1. Ve a la pestaña "Console"
2. Ejecuta estos comandos SQL:

```sql
-- Crear tabla clientes
CREATE TABLE clientes (
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT
);

-- Crear tabla productos
CREATE TABLE productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre_producto VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  descripcion TEXT
);

-- Crear tabla ventas
CREATE TABLE ventas (
  id_venta INT PRIMARY KEY AUTO_INCREMENT,
  id_cliente INT,
  total DECIMAL(10,2) NOT NULL,
  fecha_venta DATE,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Crear tabla detalle_venta
CREATE TABLE detalle_venta (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,
  id_venta INT,
  id_producto INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Crear tabla empleados
CREATE TABLE empleados (
  id_empleado INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  puesto VARCHAR(50),
  salario DECIMAL(10,2)
);

-- Crear tabla proveedores
CREATE TABLE proveedores (
  id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  contacto VARCHAR(100),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT
);

-- Crear tabla compras
CREATE TABLE compras (
  id_compra INT PRIMARY KEY AUTO_INCREMENT,
  id_proveedor INT,
  producto VARCHAR(100),
  cantidad DECIMAL(10,2),
  costo_total DECIMAL(10,2),
  fecha_compra DATE,
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
);
```

### Paso 5: Configurar en Render
En Render Dashboard, en tu aplicación, agrega estas variables:

```
DB_HOST=mysql.clever-cloud.com
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tu-nombre-de-bd
DB_PORT=3306
NODE_ENV=production
PORT=3000
```

## 🎯 VENTAJAS DE CLEVER CLOUD

- ✅ **Gratis para siempre**
- ✅ **MySQL 8.0** completo
- ✅ **1GB de almacenamiento** gratis
- ✅ **Panel web** incluido
- ✅ **SSL automático**
- ✅ **Muy confiable**
- ✅ **Soporte técnico**

## 🔧 VERIFICAR CONEXIÓN

Para verificar que funciona:
1. Prueba la conexión localmente
2. Asegúrate de que las credenciales sean correctas
3. Sube a Render con las variables configuradas

## 📱 RESULTADO

Una vez configurado:
- ✅ Base de datos MySQL en la nube
- ✅ Acceso desde cualquier lugar
- ✅ SSL automático
- ✅ Panel web para administrar
- ✅ Completamente gratuito 