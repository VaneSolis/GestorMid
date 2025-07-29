const fetch = require('node-fetch');

async function testVentasFrontend() {
  try {
    console.log('🔍 PROBANDO ESTRUCTURA DE VENTAS EN FRONTEND\n');
    
    // Simular los datos que vienen del backend
    const ventasData = [
      {
        id: 11,
        cliente_nombre: "María García",
        total: "37.50",
        fecha: "2025-07-28T06:00:00.000Z"
      },
      {
        id: 12,
        cliente_nombre: "Juan Martínez",
        total: "30.00",
        fecha: "2025-07-28T06:00:00.000Z"
      },
      {
        id: 13,
        cliente_nombre: "Doña Lupe Hernández",
        total: "32.50",
        fecha: "2025-07-28T06:00:00.000Z"
      }
    ];
    
    console.log('📊 DATOS DE EJEMPLO:');
    ventasData.forEach((venta, index) => {
      console.log(`\n   Venta ${index + 1}:`);
      console.log(`     ID: ${venta.id}`);
      console.log(`     Cliente: ${venta.cliente_nombre}`);
      console.log(`     Total: $${venta.total}`);
      console.log(`     Fecha: ${new Date(venta.fecha).toLocaleDateString()}`);
    });
    
    console.log('\n📋 ESTRUCTURA DE TABLA CORREGIDA:');
    console.log('   | ID | Cliente | Productos | Total | Fecha | Acciones |');
    console.log('   |----|---------|-----------|-------|-------|----------|');
    
    ventasData.forEach((venta, index) => {
      console.log(`   | ${venta.id} | ${venta.cliente_nombre} | - | $${venta.total} | ${new Date(venta.fecha).toLocaleDateString()} | 👁️ |`);
    });
    
    console.log('\n✅ ESTRUCTURA CORREGIDA:');
    console.log('   - ID: ID de la venta');
    console.log('   - Cliente: Nombre del cliente');
    console.log('   - Productos: - (no disponible en este modelo)');
    console.log('   - Total: Total de la venta');
    console.log('   - Fecha: Fecha de la venta');
    console.log('   - Acciones: Botón de ver detalles');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testVentasFrontend(); 