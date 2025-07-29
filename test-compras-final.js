const { pool } = require('./config/database');

async function testComprasFinal() {
  try {
    console.log('🎯 PRUEBA FINAL DE COMPRAS CON PRODUCTOS\n');
    
    // Probar el procedimiento actualizado
    console.log('📊 PROBANDO PROCEDIMIENTO ACTUALIZADO:');
    const [compras] = await pool.execute('CALL sp_mostrar_compras()');
    
    if (compras[0] && compras[0].length > 0) {
      console.log(`✅ ${compras[0].length} compras encontradas\n`);
      
      console.log('📋 PRIMERAS 5 COMPRAS CON PRODUCTOS:');
      compras[0].slice(0, 5).forEach((compra, index) => {
        console.log(`\n   Compra ${index + 1}:`);
        console.log(`     ID: ${compra.id}`);
        console.log(`     Proveedor: ${compra.proveedor_nombre}`);
        console.log(`     Productos: ${compra.productos || 'Sin productos'}`);
        console.log(`     Total: $${compra.total}`);
        console.log(`     Fecha: ${new Date(compra.fecha).toLocaleDateString()}`);
      });
      
      // Verificar cuántas compras tienen productos
      const comprasConProductos = compras[0].filter(c => c.productos && c.productos !== 'Sin productos');
      const comprasSinProductos = compras[0].filter(c => !c.productos || c.productos === 'Sin productos');
      
      console.log('\n📊 ESTADÍSTICAS:');
      console.log(`   Total de compras: ${compras[0].length}`);
      console.log(`   Compras con productos: ${comprasConProductos.length}`);
      console.log(`   Compras sin productos: ${comprasSinProductos.length}`);
      
      if (comprasConProductos.length > 0) {
        console.log('\n🎉 ¡COMPRAS CON PRODUCTOS FUNCIONANDO!');
        console.log('   Ejemplos de productos:');
        comprasConProductos.slice(0, 3).forEach((compra, index) => {
          console.log(`   ${index + 1}. ${compra.productos}`);
        });
      } else {
        console.log('\n⚠️  No hay compras con productos registrados');
      }
      
    } else {
      console.log('❌ No se encontraron compras');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

testComprasFinal(); 