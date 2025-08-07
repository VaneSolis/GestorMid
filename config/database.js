const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.MYSQL_ADDON_HOST || process.env.DB_HOST || '127.0.0.1',
  port: process.env.MYSQL_ADDON_PORT || process.env.DB_PORT || 3306,
  user: process.env.MYSQL_ADDON_USER || process.env.DB_USER || 'root',
  password: process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD || 'Mazerunner12',
  database: process.env.MYSQL_ADDON_DB || process.env.DB_NAME || 'tortillerialaherradurasolis',
  // Configuraciones adicionales para mejor estabilidad
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4'
};

console.log('🔧 Configuración de base de datos:');
console.log('Host:', dbConfig.host);
console.log('Puerto:', dbConfig.port);
console.log('Usuario:', dbConfig.user);
console.log('Base de datos:', dbConfig.database);
console.log('Contraseña:', dbConfig.password ? '***DEFINIDA***' : 'NO DEFINIDA');

// Verificar si estamos usando Clever Cloud
if (process.env.MYSQL_ADDON_HOST) {
  console.log('✅ Detectado Clever Cloud MySQL Add-on');
} else if (process.env.DB_HOST) {
  console.log('✅ Detectadas variables de entorno personalizadas');
} else {
  console.log('⚠️  Usando configuración local por defecto');
}

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    console.log('🔗 Intentando conectar a la base de datos...');
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    
    // Probar una consulta simple
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Consulta de prueba exitosa');
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('SQL State:', error.sqlState);
    return false;
  }
}

async function getTables() {
  try {
    const [rows] = await pool.execute('SHOW TABLES');
    return rows.map(row => Object.values(row)[0]);
  } catch (error) {
    console.error('Error al obtener tablas:', error.message);
    return [];
  }
}

async function getTableStructure(tableName) {
  try {
    const [rows] = await pool.execute(`DESCRIBE ${tableName}`);
    return rows;
  } catch (error) {
    console.error(`Error al obtener estructura de ${tableName}:`, error.message);
    return [];
  }
}

module.exports = {
  pool,
  testConnection,
  getTables,
  getTableStructure
}; 