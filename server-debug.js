const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    routes: [
      '/api/test-connection',
      '/api/database-info',
      '/api/clientes',
      '/api/productos'
    ]
  });
});

// Ruta de prueba simple
app.get('/api/test-connection', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Conexión de prueba exitosa',
    timestamp: new Date().toISOString()
  });
});

// Ruta para verificar variables de entorno
app.get('/api/debug-env', (req, res) => {
  res.json({
    DB_HOST: process.env.DB_HOST || 'NO DEFINIDA',
    DB_USER: process.env.DB_USER || 'NO DEFINIDA',
    DB_NAME: process.env.DB_NAME || 'NO DEFINIDA',
    DB_PORT: process.env.DB_PORT || 'NO DEFINIDA',
    NODE_ENV: process.env.NODE_ENV || 'NO DEFINIDA',
    PORT: process.env.PORT || 'NO DEFINIDA',
    DB_PASSWORD: process.env.DB_PASSWORD ? 'DEFINIDA' : 'NO DEFINIDA'
  });
});

// Ruta para probar todas las rutas
app.get('/api/routes-test', (req, res) => {
  res.json({
    message: 'Todas las rutas están funcionando',
    availableRoutes: [
      'GET /',
      'GET /api/test-connection',
      'GET /api/debug-env',
      'GET /api/routes-test'
    ]
  });
});

// Middleware para capturar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    requestedUrl: req.originalUrl,
    availableRoutes: [
      '/',
      '/api/test-connection',
      '/api/debug-env',
      '/api/routes-test'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de debug corriendo en http://localhost:${PORT}`);
  console.log(`📋 Rutas disponibles:`);
  console.log(`   GET /`);
  console.log(`   GET /api/test-connection`);
  console.log(`   GET /api/debug-env`);
  console.log(`   GET /api/routes-test`);
}); 