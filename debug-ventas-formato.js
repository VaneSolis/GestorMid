const { pool } = require('./config/database');

async function debugVentasFormato() {
  try {
    console.log('🔍 VERIFICANDO FORMATO DE DATOS DE VENTAS\n');
    
    // 1. Verificar datos directos de la tabla
    console.log('📊 DATOS DIRECTOS DE LA TABLA:');
    const [ventasDirectas] = await pool.execute('SELECT * FROM ventas ORDER BY id_venta LIMIT 10');
    ventasDirectas.forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id_venta}, Cliente: ${venta.id_cliente}, Total: $${venta.total}, Fecha: ${venta.fecha_venta}`);
    });
    
    // 2. Verificar datos con JOIN
    console.log('\n📊 DATOS CON JOIN:');
    const [ventasJoin] = await pool.execute(`
      SELECT v.id_venta, v.id_cliente, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, 
             v.total, v.fecha_venta
      FROM ventas v 
      LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
      ORDER BY v.id_venta 
      LIMIT 10
    `);
    ventasJoin.forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id_venta}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha_venta}`);
    });
    
    // 3. Verificar procedimiento almacenado
    console.log('\n📊 DATOS DEL PROCEDIMIENTO ALMACENADO:');
    const [ventasSP] = await pool.execute('CALL sp_mostrar_ventas()');
    ventasSP[0].slice(0, 10).forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha}`);
    });
    
    // 4. Verificar si hay diferencias en el orden
    console.log('\n📊 COMPARACIÓN DE ORDEN:');
    console.log('   Directo (por ID):', ventasDirectas.map(v => v.id_venta).join(', '));
    console.log('   SP (por fecha DESC):', ventasSP[0].slice(0, 10).map(v => v.id).join(', '));
    
    // 5. Verificar fechas específicas
    console.log('\n📅 ANÁLISIS DE FECHAS:');
    const fechasUnicas = [...new Set(ventasSP[0].map(v => v.fecha))];
    fechasUnicas.sort().reverse();
    console.log('   Fechas únicas (ordenadas):');
    fechasUnicas.slice(0, 5).forEach((fecha, index) => {
      const ventasEnFecha = ventasSP[0].filter(v => v.fecha === fecha);
      console.log(`   ${index + 1}. ${fecha}: ${ventasEnFecha.length} ventas`);
    });
    
    // 6. Verificar si hay datos duplicados
    console.log('\n🔍 VERIFICACIÓN DE DUPLICADOS:');
    const ids = ventasSP[0].map(v => v.id);
    const uniqueIds = [...new Set(ids)];
    console.log(`   Total de ventas: ${ids.length}`);
    console.log(`   IDs únicos: ${uniqueIds.length}`);
    console.log(`   ¿Hay duplicados?: ${ids.length !== uniqueIds.length ? 'SÍ' : 'NO'}`);
    
    if (ids.length !== uniqueIds.length) {
      const duplicados = ids.filter((id, index) => ids.indexOf(id) !== index);
      console.log(`   IDs duplicados: ${duplicados.join(', ')}`);
    }
    
    // 7. Verificar clientes específicos
    console.log('\n👥 ANÁLISIS DE CLIENTES:');
    const clientesUnicos = [...new Set(ventasSP[0].map(v => v.cliente_nombre))];
    console.log(`   Clientes únicos: ${clientesUnicos.length}`);
    console.log('   Lista de clientes:');
    clientesUnicos.slice(0, 10).forEach((cliente, index) => {
      const ventasCliente = ventasSP[0].filter(v => v.cliente_nombre === cliente);
      console.log(`   ${index + 1}. ${cliente}: ${ventasCliente.length} ventas`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

debugVentasFormato(); 