# 🎨 DESPLIEGUE EN RENDER

## Pasos para subir a Render:

### 1. Preparar el proyecto
```bash
# Asegúrate de que el package.json tenga el script start
npm install
```

### 2. Crear cuenta en Render
- Ve a https://render.com
- Regístrate con GitHub
- Crea un nuevo "Web Service"

### 3. Configurar el servicio
- **Name**: gestor-tortilleria
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Branch**: main

### 4. Configurar variables de entorno
En Render Dashboard:
- `DB_HOST` = tu-host-mysql
- `DB_USER` = tu-usuario-mysql
- `DB_PASSWORD` = tu-contraseña-mysql
- `DB_NAME` = tortillerialaherradurasolis
- `PORT` = 3000

### 5. Desplegar
- Render construirá y desplegará automáticamente
- Te dará una URL como: https://gestor-tortilleria.onrender.com

## Ventajas de Render:
✅ Gratis para proyectos pequeños
✅ Despliegue automático
✅ SSL automático
✅ Muy confiable 