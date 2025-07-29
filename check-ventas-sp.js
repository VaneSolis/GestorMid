const { pool } = require('./config/database');

async function checkVentasSP() {
  try {
    console.log('🔍 VERIFICANDO PROCEDIMIENTO DE VENTAS\n');
    
    // 1. Verificar el procedimiento almacenado actual
    console.log('📊 DATOS DEL SP sp_mostrar_ventas:');
    const [ventasSP] = await pool.execute('CALL sp_mostrar_ventas()');
    
    console.log(`Total de ventas: ${ventasSP[0].length}\n`);
    
    console.log('📋 PRIMERAS 5 VENTAS:');
    ventasSP[0].slice(0, 5).forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha}`);
    });
    
    console.log('\n📋 ÚLTIMAS 5 VENTAS:');
    ventasSP[0].slice(-5).forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha}`);
    });
    
    // 2. Verificar orden por fecha
    console.log('\n📅 ANÁLISIS DE ORDEN:');
    const fechas = ventasSP[0].map(v => new Date(v.fecha));
    const ordenado = fechas.every((fecha, index) => {
      if (index === 0) return true;
      return fecha <= fechas[index - 1];
    });
    console.log(`¿Está ordenado por fecha (DESC)?: ${ordenado ? 'SÍ' : 'NO'}`);
    
    // 3. Verificar si hay fechas futuras
    const hoy = new Date();
    const fechasFuturas = ventasSP[0].filter(v => new Date(v.fecha) > hoy);
    console.log(`Ventas con fechas futuras: ${fechasFuturas.length}`);
    
    if (fechasFuturas.length > 0) {
      console.log('⚠️  VENTAS CON FECHAS FUTURAS:');
      fechasFuturas.slice(0, 3).forEach((venta, index) => {
        console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Fecha: ${venta.fecha}`);
      });
    }
    
    // 4. Verificar clientes nulos
    const clientesNulos = ventasSP[0].filter(v => !v.cliente_nombre || v.cliente_nombre === 'null null');
    console.log(`Ventas con clientes nulos: ${clientesNulos.length}`);
    
    if (clientesNulos.length > 0) {
      console.log('⚠️  VENTAS CON CLIENTES NULOS:');
      clientesNulos.slice(0, 3).forEach((venta, index) => {
        console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}`);
      });
    }
    
    // 5. Verificar totales
    const totales = ventasSP[0].map(v => parseFloat(v.total));
    const totalGeneral = totales.reduce((sum, total) => sum + total, 0);
    console.log(`\n💰 TOTAL GENERAL: $${totalGeneral.toFixed(2)}`);
    console.log(`Promedio por venta: $${(totalGeneral / ventasSP[0].length).toFixed(2)}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkVentasSP(); 