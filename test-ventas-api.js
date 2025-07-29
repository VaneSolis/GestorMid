const fetch = require('node-fetch');

async function testVentasAPI() {
  try {
    console.log('🔍 PROBANDO API DE VENTAS\n');
    
    // Probar la API de ventas
    const response = await fetch('http://localhost:3000/api/ventas');
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ API funcionando: ${data.data.length} ventas encontradas\n`);
      
      console.log('📋 PRIMERAS 5 VENTAS:');
      data.data.slice(0, 5).forEach((venta, index) => {
        console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha}`);
      });
      
      console.log('\n📋 ÚLTIMAS 5 VENTAS:');
      data.data.slice(-5).forEach((venta, index) => {
        console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha}`);
      });
      
      // Verificar si hay datos duplicados o desordenados
      const ids = data.data.map(v => v.id);
      const uniqueIds = [...new Set(ids)];
      
      console.log(`\n📊 ANÁLISIS:`);
      console.log(`   Total de ventas: ${data.data.length}`);
      console.log(`   IDs únicos: ${uniqueIds.length}`);
      console.log(`   ¿Hay duplicados?: ${ids.length !== uniqueIds.length ? 'SÍ' : 'NO'}`);
      
      // Verificar orden
      const ordenado = data.data.every((venta, index) => {
        if (index === 0) return true;
        return new Date(venta.fecha) <= new Date(data.data[index - 1].fecha);
      });
      console.log(`   ¿Está ordenado por fecha?: ${ordenado ? 'SÍ' : 'NO'}`);
      
    } else {
      console.log(`❌ Error en API: ${data.message}`);
    }
    
  } catch (error) {
    console.error('❌ Error al probar API:', error.message);
  }
}

// Esperar un poco para que el servidor esté listo
setTimeout(() => {
  testVentasAPI();
}, 1000); 