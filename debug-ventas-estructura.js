const { pool } = require('./config/database');

async function debugVentasEstructura() {
  try {
    console.log('🔍 VERIFICANDO ESTRUCTURA DE DATOS DE VENTAS\n');
    
    // 1. Verificar el procedimiento almacenado actual
    console.log('📊 DATOS DEL SP sp_mostrar_ventas:');
    const [ventasSP] = await pool.execute('CALL sp_mostrar_ventas()');
    
    if (ventasSP[0] && ventasSP[0].length > 0) {
      console.log(`Total de ventas: ${ventasSP[0].length}`);
      
      console.log('\n📋 PRIMERAS 3 VENTAS (estructura completa):');
      ventasSP[0].slice(0, 3).forEach((venta, index) => {
        console.log(`\n   Venta ${index + 1}:`);
        Object.keys(venta).forEach(key => {
          console.log(`     ${key}: ${venta[key]} (tipo: ${typeof venta[key]})`);
        });
      });
      
      // 2. Verificar qué columnas debería tener
      console.log('\n📋 ESTRUCTURA ESPERADA:');
      console.log('   - id: ID de la venta');
      console.log('   - cliente_nombre: Nombre del cliente');
      console.log('   - total: Total de la venta');
      console.log('   - fecha: Fecha de la venta');
      
      // 3. Verificar si hay columnas extra o faltantes
      const primeraVenta = ventasSP[0][0];
      const columnasEsperadas = ['id', 'cliente_nombre', 'total', 'fecha'];
      const columnasActuales = Object.keys(primeraVenta);
      
      console.log('\n📊 ANÁLISIS DE COLUMNAS:');
      console.log(`   Columnas actuales: ${columnasActuales.join(', ')}`);
      console.log(`   Columnas esperadas: ${columnasEsperadas.join(', ')}`);
      
      const columnasExtra = columnasActuales.filter(col => !columnasEsperadas.includes(col));
      const columnasFaltantes = columnasEsperadas.filter(col => !columnasActuales.includes(col));
      
      if (columnasExtra.length > 0) {
        console.log(`   ⚠️  Columnas extra: ${columnasExtra.join(', ')}`);
      }
      if (columnasFaltantes.length > 0) {
        console.log(`   ⚠️  Columnas faltantes: ${columnasFaltantes.join(', ')}`);
      }
      
      // 4. Verificar datos específicos
      console.log('\n📋 ANÁLISIS DE DATOS:');
      ventasSP[0].slice(0, 3).forEach((venta, index) => {
        console.log(`\n   Venta ${index + 1}:`);
        console.log(`     ID: ${venta.id || 'N/A'}`);
        console.log(`     Cliente: ${venta.cliente_nombre || 'N/A'}`);
        console.log(`     Total: ${venta.total || 'N/A'}`);
        console.log(`     Fecha: ${venta.fecha || 'N/A'}`);
      });
      
    } else {
      console.log('❌ No hay datos en el procedimiento almacenado');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

debugVentasEstructura(); 