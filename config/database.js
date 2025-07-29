const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Mazerunner12',
  database: process.env.DB_NAME || 'tortillerialaherradurasolis'
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
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