require('dotenv').config();

console.log('🔍 VERIFICACIÓN DE CLEVER CLOUD MYSQL ADD-ON');
console.log('=============================================');

// Verificar variables de Clever Cloud
const cleverCloudVars = [
  'MYSQL_ADDON_HOST',
  'MYSQL_ADDON_USER', 
  'MYSQL_ADDON_PASSWORD',
  'MYSQL_ADDON_DB',
  'MYSQL_ADDON_PORT'
];

const customVars = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD', 
  'DB_NAME',
  'DB_PORT'
];

console.log('\n📋 Variables de Clever Cloud Add-on:');
let cleverCloudDetected = false;
cleverCloudVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName.includes('PASSWORD') ? '***DEFINIDA***' : value}`);
    cleverCloudDetected = true;
  } else {
    console.log(`❌ ${varName}: NO DEFINIDA`);
  }
});

console.log('\n📋 Variables personalizadas:');
let customVarsDetected = false;
customVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName.includes('PASSWORD') ? '***DEFINIDA***' : value}`);
    customVarsDetected = true;
  } else {
    console.log(`❌ ${varName}: NO DEFINIDA`);
  }
});

console.log(`\n🔧 Puerto: ${process.env.MYSQL_ADDON_PORT || process.env.DB_PORT || '3306 (por defecto)'}`);
console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);

if (cleverCloudDetected) {
  console.log('\n🎉 ¡PERFECTO! Clever Cloud MySQL Add-on detectado');
  console.log('La aplicación debería funcionar correctamente en Clever Cloud');
  console.log('\n📝 Próximos pasos:');
  console.log('1. Espera a que se redespliegue automáticamente');
  console.log('2. Revisa los logs en Clever Cloud');
  console.log('3. Busca la URL de tu aplicación');
  console.log('4. Prueba las rutas de la API');
} else if (customVarsDetected) {
  console.log('\n✅ Variables personalizadas detectadas');
  console.log('La aplicación debería funcionar con configuración personalizada');
} else {
  console.log('\n⚠️  PROBLEMAS ENCONTRADOS:');
  console.log('No se detectaron variables de entorno para la base de datos');
  console.log('\n🔧 SOLUCIÓN:');
  console.log('1. Verifica que el add-on de MySQL esté conectado a tu aplicación');
  console.log('2. Asegúrate de que las variables estén disponibles');
  console.log('3. Revisa la configuración en Clever Cloud Dashboard');
}

console.log('\n📚 RECURSOS ÚTILES:');
console.log('- Clever Cloud Dashboard: https://console.clever-cloud.com');
console.log('- Documentación Clever Cloud: https://www.clever-cloud.com/doc/');
console.log('- MySQL Add-on: https://www.clever-cloud.com/add-ons/mysql/'); 