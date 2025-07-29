# 🎨 GUÍA COMPLETA DE DESPLIEGUE EN RENDER

## 📋 PASOS PARA SUBIR A RENDER

### **Paso 1: Verificar que el código esté en GitHub**
```bash
# Verificar que todo esté subido
git status
git push origin main
```

### **Paso 2: Crear cuenta en Render**
1. Ve a https://render.com
2. Regístrate con tu cuenta de GitHub
3. Haz clic en **"New"** → **"Web Service"**

### **Paso 3: Conectar tu repositorio**
1. Selecciona tu repositorio: **`VaneSolis/GestorMid`**
2. Configura los siguientes parámetros:
   - **Name**: `gestor-tortilleria`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Branch**: `main`

### **Paso 4: Configurar base de datos**
**Opción A: PlanetScale (Recomendado)**
1. Ve a https://planetscale.com
2. Regístrate con GitHub
3. Crea una nueva base de datos
4. Ejecuta los comandos SQL del archivo `database-setup-render.md`

**Opción B: Railway MySQL**
1. Ve a https://railway.app
2. Crea un proyecto y agrega MySQL
3. Usa las credenciales que te da Railway

### **Paso 5: Configurar variables de entorno en Render**
En Render Dashboard, en tu aplicación, agrega estas variables:

```
DB_HOST=tu-host-mysql
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tu-base-de-datos
DB_PORT=3306
NODE_ENV=production
PORT=3000
```

### **Paso 6: Desplegar**
1. Haz clic en **"Create Web Service"**
2. Render construirá y desplegará automáticamente
3. Te dará una URL como: `https://gestor-tortilleria.onrender.com`

## 🔧 CONFIGURACIÓN ESPECÍFICA PARA RENDER

### Archivos creados:
- ✅ `render.yaml` - Configuración automática
- ✅ `database-setup-render.md` - Guía de base de datos
- ✅ `package.json` - Actualizado para Render

### Variables de entorno necesarias:
```
DB_HOST=tu-host-mysql
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tu-base-de-datos
DB_PORT=3306
NODE_ENV=production
PORT=3000
```

## 🌐 RESULTADO FINAL

Después del despliegue tendrás:
- ✅ URL pública: `https://gestor-tortilleria.onrender.com`
- ✅ SSL automático (https://)
- ✅ Base de datos MySQL en la nube
- ✅ Despliegue automático desde GitHub

## 📱 COMPARTIR LA APLICACIÓN

Una vez desplegada:
1. Comparte la URL con quien quieras
2. Cualquiera con el link podrá usar la aplicación
3. Los datos se guardarán en la base de datos en la nube

## 🎯 VENTAJAS DE RENDER

**Para tu caso, Render es excelente porque:**
- ✅ Es gratis para proyectos pequeños
- ✅ Muy fácil de usar
- ✅ SSL automático
- ✅ Despliegue automático
- ✅ Muy confiable
- ✅ Soporte para MySQL
- ✅ Muy rápido

## 🚀 PASOS RÁPIDOS

1. **Ve a Render**: https://render.com
2. **Conecta tu repositorio**: `VaneSolis/GestorMid`
3. **Configura**: Name, Environment, Build Command, Start Command
4. **Agrega variables de entorno** (DB_HOST, DB_USER, etc.)
5. **Despliega** y obtén tu URL pública 