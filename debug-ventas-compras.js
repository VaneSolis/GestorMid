const { pool } = require('./config/database');

async function debugVentasCompras() {
  try {
    console.log('🔍 Diagnosticando ventas y compras...\n');
    
    // Verificar tabla ventas
    console.log('📊 TABLA VENTAS:');
    try {
      const [ventasStructure] = await pool.execute('DESCRIBE ventas');
      console.log('   Estructura:', ventasStructure.map(col => `${col.Field} (${col.Type})`).join(', '));
      
      const [ventasCount] = await pool.execute('SELECT COUNT(*) as count FROM ventas');
      console.log('   Total registros:', ventasCount[0].count);
      
      if (ventasCount[0].count > 0) {
        const [ventasData] = await pool.execute('SELECT * FROM ventas LIMIT 3');
        console.log('   Datos de ejemplo:');
        ventasData.forEach((row, index) => {
          console.log(`     ${index + 1}. ${JSON.stringify(row)}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log('\n📊 TABLA COMPRAS:');
    try {
      const [comprasStructure] = await pool.execute('DESCRIBE compras');
      console.log('   Estructura:', comprasStructure.map(col => `${col.Field} (${col.Type})`).join(', '));
      
      const [comprasCount] = await pool.execute('SELECT COUNT(*) as count FROM compras');
      console.log('   Total registros:', comprasCount[0].count);
      
      if (comprasCount[0].count > 0) {
        const [comprasData] = await pool.execute('SELECT * FROM compras LIMIT 3');
        console.log('   Datos de ejemplo:');
        comprasData.forEach((row, index) => {
          console.log(`     ${index + 1}. ${JSON.stringify(row)}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    // Probar procedimientos almacenados
    console.log('\n🔧 PROBANDO PROCEDIMIENTOS ALMACENADOS:');
    
    try {
      console.log('   Probando sp_mostrar_ventas...');
      const [ventasResult] = await pool.execute('CALL sp_mostrar_ventas()');
      console.log(`   Resultado: ${ventasResult[0].length} registros`);
      if (ventasResult[0].length > 0) {
        console.log(`   Ejemplo: ${JSON.stringify(ventasResult[0][0])}`);
      }
    } catch (error) {
      console.log(`   ❌ Error en sp_mostrar_ventas: ${error.message}`);
    }
    
    try {
      console.log('   Probando sp_mostrar_compras...');
      const [comprasResult] = await pool.execute('CALL sp_mostrar_compras()');
      console.log(`   Resultado: ${comprasResult[0].length} registros`);
      if (comprasResult[0].length > 0) {
        console.log(`   Ejemplo: ${JSON.stringify(comprasResult[0][0])}`);
      }
    } catch (error) {
      console.log(`   ❌ Error en sp_mostrar_compras: ${error.message}`);
    }
    
    // Verificar joins
    console.log('\n🔗 PROBANDO JOINS:');
    
    try {
      console.log('   Probando JOIN ventas con clientes...');
      const [ventasJoin] = await pool.execute(`
        SELECT v.id_venta, v.total_venta, v.fecha_venta, 
               CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre
        FROM ventas v 
        LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
        LIMIT 3
      `);
      console.log(`   Resultado: ${ventasJoin.length} registros`);
      ventasJoin.forEach((row, index) => {
        console.log(`     ${index + 1}. ${JSON.stringify(row)}`);
      });
    } catch (error) {
      console.log(`   ❌ Error en JOIN ventas: ${error.message}`);
    }
    
    try {
      console.log('   Probando JOIN compras con proveedores...');
      const [comprasJoin] = await pool.execute(`
        SELECT c.id_compra, c.costo_total, c.fecha_compra, 
               p.nombre as proveedor_nombre
        FROM compras c 
        LEFT JOIN proveedores p ON c.id_proveedor = p.id_proveedor 
        LIMIT 3
      `);
      console.log(`   Resultado: ${comprasJoin.length} registros`);
      comprasJoin.forEach((row, index) => {
        console.log(`     ${index + 1}. ${JSON.stringify(row)}`);
      });
    } catch (error) {
      console.log(`   ❌ Error en JOIN compras: ${error.message}`);
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  } finally {
    await pool.end();
  }
}

debugVentasCompras(); 