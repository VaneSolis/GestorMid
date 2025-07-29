# 🚂 DESPLIEGUE EN RAILWAY

## Pasos para subir a Railway:

### 1. Preparar el proyecto
```bash
# Asegúrate de que el package.json tenga el script start
npm run build  # si es necesario
```

### 2. Crear cuenta en Railway
- Ve a https://railway.app
- Regístrate con GitHub
- Conecta tu repositorio

### 3. Configurar variables de entorno
En Railway Dashboard:
- `DB_HOST` = tu-host-mysql
- `DB_USER` = tu-usuario-mysql  
- `DB_PASSWORD` = tu-contraseña-mysql
- `DB_NAME` = tortillerialaherradurasolis
- `PORT` = 3000

### 4. Desplegar
- Railway detectará automáticamente que es Node.js
- Desplegará automáticamente
- Te dará una URL como: https://tu-app.railway.app

### 5. Configurar base de datos
Opción A: Usar Railway MySQL
Opción B: Usar tu MySQL local (configurar acceso externo)
Opción C: Usar PlanetScale (MySQL en la nube)

## Ventajas de Railway:
✅ Gratis para proyectos pequeños
✅ Despliegue automático desde GitHub
✅ Base de datos incluida
✅ SSL automático
✅ Muy fácil de usar 