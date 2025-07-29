const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas básicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para probar la conexión a la BD (simulada)
app.get('/api/test-connection', async (req, res) => {
  res.json({ 
    success: false, 
    message: '⚠️ Configuración de BD pendiente. Por favor, proporciona la contraseña de MySQL.' 
  });
});

// Ruta para obtener información de la BD (simulada)
app.get('/api/database-info', async (req, res) => {
  res.json({
    success: false,
    message: '⚠️ Base de datos no configurada',
    tables: [],
    tableInfo: {}
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor temporal corriendo en http://localhost:${PORT}`);
  console.log('⚠️  NOTA: La base de datos no está configurada');
  console.log('📋 Para configurar la BD:');
  console.log('   1. Abre MySQL Workbench');
  console.log('   2. Ve a tu stored connection "tortilleria"');
  console.log('   3. Haz clic derecho → "Edit Connection"');
  console.log('   4. Copia la contraseña');
  console.log('   5. Proporciónala para actualizar la configuración');
}); 