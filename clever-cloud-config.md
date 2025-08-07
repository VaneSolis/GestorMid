# ☁️ CONFIGURACIÓN PARA CLEVER CLOUD

## 📋 Información de tu aplicación:
- **Application ID**: `app_ffbb7ac6-ac73-4119-ba6a-51c126b717ec`
- **GitHub Repository**: `https://github.com/VaneSolis/GestorMid.git`
- **Instance Type**: Node.js & Bun

## 🔧 Variables de entorno necesarias:

En Clever Cloud Dashboard, ve a tu aplicación y configura estas variables:

```
DB_HOST = bmbomdrvxfmjayg1ob1t-mysql.services.clever-cloud.com
DB_USER = u38jfxey6ydxpquj
DB_PASSWORD = G6OrgeuvwYB5CgquynZQ
DB_NAME = bmbomdrvxfmjayg1ob1t
DB_PORT = 3306
NODE_ENV = production
PORT = 8080
```

## 🚀 Pasos para configurar:

### 1. Configurar variables de entorno
1. Ve a [Clever Cloud Console](https://console.clever-cloud.com)
2. Selecciona tu aplicación `gestormid`
3. Ve a **"Environment variables"**
4. Agrega cada variable una por una

### 2. Verificar el despliegue
1. Ve a la pestaña **"Logs"**
2. Verifica que no haya errores
3. Busca mensajes como:
   - `🚀 Servidor corriendo en puerto 8080`
   - `✅ Conexión a MySQL establecida correctamente`

### 3. Obtener la URL de tu aplicación
1. En el dashboard, busca la URL de tu aplicación
2. Debería ser algo como: `https://gestormid-xxxx.cleverapps.io`

## 🧪 Probar la aplicación:

Una vez configurada, prueba estas URLs:

```
https://tu-app.cleverapps.io/
https://tu-app.cleverapps.io/api/test-connection
https://tu-app.cleverapps.io/api/database-info
https://tu-app.cleverapps.io/api/clientes
```

## 📊 Logs importantes a buscar:

### ✅ Logs exitosos:
- `🚀 Servidor corriendo en puerto 8080`
- `✅ Conexión a MySQL establecida correctamente`
- `✅ Consulta de prueba exitosa`

### ❌ Logs de error:
- `❌ Error al conectar con MySQL`
- `DB_HOST: NO DEFINIDA`
- `Error: connect ECONNREFUSED`

## 🔍 Troubleshooting:

### Si no conecta a la base de datos:
1. Verifica que las variables de entorno estén configuradas
2. Asegúrate de que la base de datos esté activa en Clever Cloud
3. Revisa los logs de la aplicación

### Si la aplicación no responde:
1. Verifica que el puerto sea 8080
2. Revisa los logs de despliegue
3. Asegúrate de que el repositorio esté sincronizado 