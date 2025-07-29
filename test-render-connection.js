require('dotenv').config();
const mysql = require('mysql2/promise');

async function testRenderConnection() {
  try {
    console.log('🔍 Verificando variables de entorno...');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('DB_PORT:', process.env.DB_PORT);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    const dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    };
    
    console.log('🔌 Conectando a la base de datos...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión exitosa!');
    
    // Probar consulta
    const [rows] = await connection.execute('SELECT COUNT(*) as total FROM clientes');
    console.log('📊 Total de clientes:', rows[0].total);
    
    await connection.end();
    console.log('🎉 Prueba completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('🔍 Detalles del error:', error);
  }
}

testRenderConnection(); 