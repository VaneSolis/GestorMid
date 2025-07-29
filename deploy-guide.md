# 🚀 GUÍA COMPLETA DE DESPLIEGUE

## 📋 PASOS PARA SUBIR A LA NUBE

### **OPCIÓN 1: RAILWAY (Más Fácil)**

#### Paso 1: Preparar el proyecto
```bash
# Asegúrate de que todo funcione localmente
npm run dev
```

#### Paso 2: Subir a GitHub
```bash
git add .
git commit -m "Preparar para despliegue"
git push origin main
```

#### Paso 3: Crear cuenta en Railway
1. Ve a https://railway.app
2. Regístrate con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Selecciona tu repositorio

#### Paso 4: Configurar base de datos
1. En Railway Dashboard, haz clic en "New"
2. Selecciona "Database" → "MySQL"
3. Railway creará automáticamente las credenciales

#### Paso 5: Configurar variables de entorno
En tu aplicación en Railway:
- `DB_HOST` = (se configura automáticamente)
- `DB_USER` = (se configura automáticamente)
- `DB_PASSWORD` = (se configura automáticamente)
- `DB_NAME` = (se configura automáticamente)
- `PORT` = 3000

#### Paso 6: Desplegar
- Railway detectará automáticamente que es Node.js
- Desplegará automáticamente
- Te dará una URL como: `https://tu-app.railway.app`

### **OPCIÓN 2: RENDER**

#### Paso 1: Crear cuenta en Render
1. Ve a https://render.com
2. Regístrate con GitHub
3. Haz clic en "New" → "Web Service"

#### Paso 2: Conectar repositorio
1. Selecciona tu repositorio de GitHub
2. Configura:
   - **Name**: gestor-tortilleria
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Paso 3: Configurar base de datos
1. Crea un nuevo "PostgreSQL" o usa PlanetScale para MySQL
2. Configura las variables de entorno

### **OPCIÓN 3: PLANETSCALE (Base de datos)**

#### Paso 1: Crear base de datos
1. Ve a https://planetscale.com
2. Regístrate con GitHub
3. Crea una nueva base de datos

#### Paso 2: Configurar tablas
```sql
-- Ejecuta estos comandos en PlanetScale
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

#### Paso 3: Obtener credenciales
1. En PlanetScale Dashboard
2. Ve a "Connect"
3. Copia las credenciales de conexión

## 🔧 CONFIGURACIÓN FINAL

### Variables de entorno necesarias:
```
DB_HOST=tu-host-mysql
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tu-base-de-datos
PORT=3000
```

### Verificar que funcione:
1. La aplicación debe estar corriendo
2. La base de datos debe estar conectada
3. Todos los módulos deben funcionar

## 🌐 RESULTADO FINAL

Después del despliegue tendrás:
- ✅ URL pública para acceder desde cualquier lugar
- ✅ SSL automático (https://)
- ✅ Base de datos en la nube
- ✅ Despliegue automático desde GitHub

## 📱 COMPARTIR LA APLICACIÓN

Una vez desplegada:
1. Comparte la URL con quien quieras
2. Cualquiera con el link podrá usar la aplicación
3. Los datos se guardarán en la base de datos en la nube

## 🎯 RECOMENDACIÓN

**Para tu caso, recomiendo Railway porque:**
- ✅ Es gratis
- ✅ Muy fácil de usar
- ✅ Incluye base de datos MySQL
- ✅ Despliegue automático
- ✅ SSL automático
- ✅ Muy confiable 