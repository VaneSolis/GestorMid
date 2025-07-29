const express = require('express');
const cors = require('cors');
const path = require('path');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Probar conexión a la base de datos
testConnection();

// Rutas API
app.use('/api', require('./routes/stored-procedures'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para probar conexión
app.get('/api/test-connection', async (req, res) => {
  try {
    const isConnected = await testConnection();
    res.json({ 
      success: isConnected, 
      message: isConnected ? 'Conexión exitosa' : 'Error de conexión' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Ruta para obtener información de la base de datos
app.get('/api/database-info', async (req, res) => {
  try {
    const { getTables } = require('./config/database');
    const tables = await getTables();
    res.json({ success: true, tables });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}); 