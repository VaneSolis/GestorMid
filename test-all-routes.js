const fetch = require('node-fetch');

const BASE_URL = 'https://gestor-tortilleria.onrender.com'; // Cambia por tu URL de Render

async function testRoutes() {
  console.log('🧪 PROBANDO TODAS LAS RUTAS DE LA API');
  console.log('=====================================');
  
  const routes = [
    { name: 'Test Connection', url: '/api/test-connection' },
    { name: 'Database Info', url: '/api/database-info' },
    { name: 'Clientes', url: '/api/clientes' },
    { name: 'Productos', url: '/api/productos' },
    { name: 'Ventas', url: '/api/ventas' },
    { name: 'Empleados', url: '/api/empleados' },
    { name: 'Proveedores', url: '/api/proveedores' },
    { name: 'Compras', url: '/api/compras' }
  ];
  
  for (const route of routes) {
    try {
      console.log(`\n🔍 Probando: ${route.name}`);
      console.log(`URL: ${BASE_URL}${route.url}`);
      
      const response = await fetch(`${BASE_URL}${route.url}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${route.name}: EXITOSO`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Data:`, JSON.stringify(data, null, 2).substring(0, 200) + '...');
      } else {
        console.log(`❌ ${route.name}: ERROR`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Error:`, data.message || 'Error desconocido');
      }
    } catch (error) {
      console.log(`💥 ${route.name}: ERROR DE CONEXIÓN`);
      console.log(`   Error:`, error.message);
    }
  }
  
  console.log('\n🎯 RESUMEN:');
  console.log('Si ves errores de conexión, verifica:');
  console.log('1. Que la aplicación esté desplegada en Render');
  console.log('2. Que las variables de entorno estén configuradas');
  console.log('3. Que la base de datos esté funcionando');
}

// Si no se proporciona BASE_URL, usar localhost
if (BASE_URL.includes('onrender.com')) {
  console.log('⚠️  IMPORTANTE: Cambia la URL en el script por tu URL de Render');
  console.log('Ejemplo: const BASE_URL = "https://tu-app.onrender.com";');
}

testRoutes(); 