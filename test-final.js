const fetch = require('node-fetch');

async function testFinal() {
  const baseURL = 'http://localhost:3000/api';
  
  console.log('🎯 PRUEBA FINAL DEL SISTEMA\n');
  
  const tests = [
    { name: 'Clientes', endpoint: '/clientes', expected: '9 registros' },
    { name: 'Productos', endpoint: '/productos', expected: '12 registros' },
    { name: 'Ventas', endpoint: '/ventas', expected: '22 registros' },
    { name: 'Compras', endpoint: '/compras', expected: '10 registros' },
    { name: 'Empleados', endpoint: '/empleados', expected: '4 registros' },
    { name: 'Proveedores', endpoint: '/proveedores', expected: '30 registros' }
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  for (const test of tests) {
    try {
      console.log(`📡 Probando: ${test.name}`);
      const response = await fetch(`${baseURL}${test.endpoint}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ ${test.name}: ${data.data.length} registros encontrados (Esperado: ${test.expected})`);
        if (data.data.length > 0) {
          console.log(`   Ejemplo: ${JSON.stringify(data.data[0])}`);
        }
        passedTests++;
      } else {
        console.log(`❌ ${test.name}: ${data.message}`);
      }
      console.log('');
      
    } catch (error) {
      console.log(`❌ Error en ${test.name}: ${error.message}`);
      console.log('');
    }
  }
  
  console.log('📊 RESUMEN:');
  console.log(`✅ Pruebas exitosas: ${passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ¡TODAS LAS PRUEBAS PASARON! El sistema está funcionando correctamente.');
    console.log('\n🚀 INSTRUCCIONES PARA EL USUARIO:');
    console.log('1. Abre tu navegador');
    console.log('2. Ve a: http://localhost:3000');
    console.log('3. Haz clic en cualquier módulo para ver los datos');
    console.log('4. Usa los botones "Nuevo" para agregar registros');
    console.log('5. Usa los botones de editar/eliminar en las tablas');
  } else {
    console.log('⚠️  Algunas pruebas fallaron. Revisa los errores arriba.');
  }
}

// Esperar un poco para que el servidor esté listo
setTimeout(() => {
  testFinal();
}, 1000); 