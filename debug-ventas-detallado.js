const { pool } = require('./config/database');

async function debugVentasDetallado() {
  try {
    console.log('🔍 ANÁLISIS DETALLADO DE VENTAS\n');
    
    // 1. Verificar datos directos de la tabla
    console.log('📊 DATOS DIRECTOS DE LA TABLA VENTAS:');
    const [ventasDirectas] = await pool.execute('SELECT * FROM ventas ORDER BY id_venta LIMIT 5');
    ventasDirectas.forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id_venta}, Cliente: ${venta.id_cliente}, Total: $${venta.total}, Fecha: ${venta.fecha_venta}`);
    });
    
    // 2. Verificar datos con JOIN
    console.log('\n📊 DATOS CON JOIN (como los muestra el SP):');
    const [ventasJoin] = await pool.execute(`
      SELECT v.id_venta as id, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, 
             v.total as total, v.fecha_venta as fecha
      FROM ventas v 
      LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
      ORDER BY v.id_venta LIMIT 5
    `);
    ventasJoin.forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha}`);
    });
    
    // 3. Verificar procedimiento almacenado
    console.log('\n📊 DATOS DEL PROCEDIMIENTO ALMACENADO:');
    const [ventasSP] = await pool.execute('CALL sp_mostrar_ventas()');
    ventasSP[0].slice(0, 5).forEach((venta, index) => {
      console.log(`   ${index + 1}. ID: ${venta.id}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha}`);
    });
    
    // 4. Verificar clientes disponibles
    console.log('\n👥 CLIENTES DISPONIBLES:');
    const [clientes] = await pool.execute('SELECT id_cliente, nombre, apellido FROM clientes ORDER BY id_cliente LIMIT 10');
    clientes.forEach((cliente, index) => {
      console.log(`   ${index + 1}. ID: ${cliente.id_cliente}, Nombre: ${cliente.nombre} ${cliente.apellido}`);
    });
    
    // 5. Verificar ventas con clientes inexistentes
    console.log('\n⚠️  VENTAS CON CLIENTES INEXISTENTES:');
    const [ventasInvalidas] = await pool.execute(`
      SELECT v.id_venta, v.id_cliente, v.total, v.fecha_venta
      FROM ventas v 
      LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
      WHERE c.id_cliente IS NULL
      ORDER BY v.id_venta
    `);
    
    if (ventasInvalidas.length > 0) {
      ventasInvalidas.forEach((venta, index) => {
        console.log(`   ${index + 1}. ID Venta: ${venta.id_venta}, Cliente ID: ${venta.id_cliente} (NO EXISTE), Total: $${venta.total}, Fecha: ${venta.fecha_venta}`);
      });
    } else {
      console.log('   ✅ Todas las ventas tienen clientes válidos');
    }
    
    // 6. Verificar fechas
    console.log('\n📅 ANÁLISIS DE FECHAS:');
    const [fechas] = await pool.execute(`
      SELECT fecha_venta, COUNT(*) as cantidad
      FROM ventas 
      GROUP BY fecha_venta 
      ORDER BY fecha_venta DESC
      LIMIT 5
    `);
    fechas.forEach((fecha, index) => {
      console.log(`   ${index + 1}. Fecha: ${fecha.fecha_venta}, Ventas: ${fecha.cantidad}`);
    });
    
    // 7. Verificar totales
    console.log('\n💰 ANÁLISIS DE TOTALES:');
    const [totales] = await pool.execute(`
      SELECT 
        MIN(total) as minimo,
        MAX(total) as maximo,
        AVG(total) as promedio,
        SUM(total) as total_general,
        COUNT(*) as cantidad_ventas
      FROM ventas
    `);
    const total = totales[0];
    console.log(`   Mínimo: $${total.minimo}`);
    console.log(`   Máximo: $${total.maximo}`);
    console.log(`   Promedio: $${parseFloat(total.promedio).toFixed(2)}`);
    console.log(`   Total General: $${total.total_general}`);
    console.log(`   Cantidad de Ventas: ${total.cantidad_ventas}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

debugVentasDetallado(); 