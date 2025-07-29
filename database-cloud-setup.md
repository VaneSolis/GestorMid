# ☁️ CONFIGURAR BASE DE DATOS EN LA NUBE

## Opción 1: PlanetScale (Recomendado)

### 1. Crear cuenta en PlanetScale
- Ve a https://planetscale.com
- Regístrate con GitHub
- Crea una nueva base de datos

### 2. Configurar la base de datos
```sql
-- Crear las tablas necesarias
CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT
);

CREATE TABLE productos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  descripcion TEXT
);

-- ... (resto de tablas)
```

### 3. Obtener credenciales de conexión
- En PlanetScale Dashboard
- Ve a "Connect"
- Copia las credenciales de conexión

### 4. Actualizar variables de entorno
```
DB_HOST=aws.connect.psdb.cloud
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tu-base-de-datos
```

## Opción 2: Railway MySQL

### 1. En Railway Dashboard
- Crea un nuevo servicio "MySQL"
- Railway te dará automáticamente las credenciales

### 2. Conectar tu aplicación
- Las variables se configuran automáticamente
- No necesitas configuración adicional

## Opción 3: Usar tu MySQL local (NO RECOMENDADO)

### 1. Configurar MySQL para acceso externo
```sql
-- En MySQL Workbench
GRANT ALL PRIVILEGES ON tortillerialaherradurasolis.* TO 'root'@'%';
FLUSH PRIVILEGES;
```

### 2. Configurar firewall
- Abrir puerto 3306
- Configurar IP pública

## Ventajas de PlanetScale:
✅ Gratis para proyectos pequeños
✅ MySQL compatible
✅ Muy rápido
✅ SSL automático
✅ Backup automático 