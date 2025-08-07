require('dotenv').config();

console.log('🔍 VERIFICACIÓN DE CREDENCIALES CLEVER CLOUD');
console.log('=============================================');

// Verificar variables de entorno
const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = [];

console.log('\n📋 Variables de entorno:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName === 'DB_PASSWORD' ? '***DEFINIDA***' : value}`);
  } else {
    console.log(`❌ ${varName}: NO DEFINIDA`);
    missingVars.push(varName);
  }
});

console.log(`\n🔧 Puerto: ${process.env.DB_PORT || '3306 (por defecto)'}`);
console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);

if (missingVars.length > 0) {
  console.log('\n⚠️  PROBLEMAS ENCONTRADOS:');
  console.log('Las siguientes variables NO están definidas:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  
  console.log('\n🔧 SOLUCIÓN:');
  console.log('1. Ve a tu dashboard de Render');
  console.log('2. En tu aplicación, ve a "Environment"');
  console.log('3. Agrega las variables faltantes:');
  missingVars.forEach(varName => {
    console.log(`   ${varName} = tu-valor-aqui`);
  });
  
  console.log('\n📝 Ejemplo para Clever Cloud:');
  console.log('DB_HOST = mysql-12345.clever-cloud.com');
  console.log('DB_USER = u123456789');
  console.log('DB_PASSWORD = tu-contraseña');
  console.log('DB_NAME = bd_gestor_tortilleria');
} else {
  console.log('\n✅ TODAS LAS VARIABLES ESTÁN DEFINIDAS');
  console.log('Ahora puedes probar la conexión con:');
  console.log('node test-render-connection.js');
}

console.log('\n📚 RECURSOS ÚTILES:');
console.log('- Clever Cloud Dashboard: https://console.clever-cloud.com');
console.log('- Render Dashboard: https://dashboard.render.com');
console.log('- Documentación Clever Cloud: https://www.clever-cloud.com/doc/'); 