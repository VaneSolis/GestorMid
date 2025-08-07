require('dotenv').config();
const { testConnection } = require('./config/database');

async function testRenderConnection() {
  console.log('🔍 Probando conexión desde Render...');
  console.log('📋 Variables de entorno:');
  console.log('DB_HOST:', process.env.DB_HOST || 'NO DEFINIDA');
  console.log('DB_PORT:', process.env.DB_PORT || 'NO DEFINIDA');
  console.log('DB_USER:', process.env.DB_USER || 'NO DEFINIDA');
  console.log('DB_NAME:', process.env.DB_NAME || 'NO DEFINIDA');
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***DEFINIDA***' : 'NO DEFINIDA');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'NO DEFINIDA');
  console.log('PORT:', process.env.PORT || 'NO DEFINIDA');
  
  console.log('\n🔗 Intentando conectar...');
  
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      console.log('✅ Conexión exitosa!');
    } else {
      console.log('❌ Error de conexión');
    }
  } catch (error) {
    console.error('💥 Error completo:', error);
  }
}

testRenderConnection(); 