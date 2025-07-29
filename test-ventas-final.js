const { pool } = require('./config/database');

async function testVentasFinal() {
  try {
    console.log('🎯 PRUEBA FINAL DE VENTAS CON PRODUCTOS\n');
    
    // Probar el procedimiento actualizado
    console.log('📊 PROBANDO PROCEDIMIENTO ACTUALIZADO:');
    const [ventas] = await pool.execute('CALL sp_mostrar_ventas()');
    
    if (ventas[0] && ventas[0].length > 0) {
      console.log(`✅ ${ventas[0].length} ventas encontradas\n`);
      
      console.log('📋 PRIMERAS 5 VENTAS CON PRODUCTOS:');
      ventas[0].slice(0, 5).forEach((venta, index) => {
        console.log(`\n   Venta ${index + 1}:`);
        console.log(`     ID: ${venta.id}`);
        console.log(`     Cliente: ${venta.cliente_nombre}`);
        console.log(`     Productos: ${venta.productos || 'Sin productos'}`);
        console.log(`     Total: $${venta.total}`);
        console.log(`     Fecha: ${new Date(venta.fecha).toLocaleDateString()}`);
      });
      
      // Verificar cuántas ventas tienen productos
      const ventasConProductos = ventas[0].filter(v => v.productos && v.productos !== 'Sin productos');
      const ventasSinProductos = ventas[0].filter(v => !v.productos || v.productos === 'Sin productos');
      
      console.log('\n📊 ESTADÍSTICAS:');
      console.log(`   Total de ventas: ${ventas[0].length}`);
      console.log(`   Ventas con productos: ${ventasConProductos.length}`);
      console.log(`   Ventas sin productos: ${ventasSinProductos.length}`);
      
      if (ventasConProductos.length > 0) {
        console.log('\n🎉 ¡VENTAS CON PRODUCTOS FUNCIONANDO!');
        console.log('   Ejemplos de productos:');
        ventasConProductos.slice(0, 3).forEach((venta, index) => {
          console.log(`   ${index + 1}. ${venta.productos}`);
        });
      } else {
        console.log('\n⚠️  No hay ventas con productos registrados');
      }
      
    } else {
      console.log('❌ No se encontraron ventas');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

testVentasFinal(); 