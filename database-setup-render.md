# 🎨 CONFIGURACIÓN DE BASE DE DATOS PARA RENDER

## Opción 1: PlanetScale (Recomendado)

### 1. Crear cuenta en PlanetScale
- Ve a https://planetscale.com
- Regístrate con GitHub
- Crea una nueva base de datos

### 2. Configurar las tablas
```sql
-- Ejecuta estos comandos en PlanetScale
CREATE TABLE clientes (
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT
);

CREATE TABLE productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre_producto VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  descripcion TEXT
);

CREATE TABLE ventas (
  id_venta INT PRIMARY KEY AUTO_INCREMENT,
  id_cliente INT,
  total DECIMAL(10,2) NOT NULL,
  fecha_venta DATE,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE detalle_venta (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,
  id_venta INT,
  id_producto INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE empleados (
  id_empleado INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  puesto VARCHAR(50),
  salario DECIMAL(10,2)
);

CREATE TABLE proveedores (
  id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  contacto VARCHAR(100),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT
);

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

### 3. Obtener credenciales de conexión
- En PlanetScale Dashboard
- Ve a "Connect"
- Copia las credenciales de conexión

### 4. Configurar en Render
En Render Dashboard, en tu aplicación:
- `DB_HOST` = aws.connect.psdb.cloud
- `DB_USER` = tu-usuario
- `DB_PASSWORD` = tu-contraseña
- `DB_NAME` = tu-base-de-datos
- `DB_PORT` = 3306

## Opción 2: Railway MySQL (Alternativa)

### 1. Crear base de datos en Railway
- Ve a https://railway.app
- Crea un nuevo proyecto
- Agrega un servicio "MySQL"
- Railway te dará las credenciales automáticamente

### 2. Configurar en Render
Usa las credenciales que te da Railway:
- `DB_HOST` = (host de Railway)
- `DB_USER` = (usuario de Railway)
- `DB_PASSWORD` = (contraseña de Railway)
- `DB_NAME` = (nombre de la BD de Railway)
- `DB_PORT` = 3306

## Ventajas de PlanetScale:
✅ Gratis para proyectos pequeños
✅ MySQL compatible
✅ Muy rápido
✅ SSL automático
✅ Backup automático
✅ Muy confiable 