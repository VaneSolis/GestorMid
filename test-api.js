const fetch = require('node-fetch');

async function testAPI() {
  const baseURL = 'http://localhost:3000/api';
  
  console.log('🧪 Probando APIs...\n');
  
  const endpoints = [
    '/clientes',
    '/productos', 
    '/ventas',
    '/empleados',
    '/proveedores',
    '/compras'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Probando: ${endpoint}`);
      const response = await fetch(`${baseURL}${endpoint}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ ${endpoint}: ${data.data.length} registros encontrados`);
        if (data.data.length > 0) {
          console.log(`   Ejemplo: ${JSON.stringify(data.data[0])}`);
        }
      } else {
        console.log(`❌ ${endpoint}: ${data.message}`);
      }
      console.log('');
      
    } catch (error) {
      console.log(`❌ Error en ${endpoint}: ${error.message}`);
      console.log('');
    }
  }
}

// Esperar un poco para que el servidor esté listo
setTimeout(() => {
  testAPI();
}, 1000); 