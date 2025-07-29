const { pool } = require('./config/database');

async function checkVentasStructure() {
  try {
    console.log('🔍 VERIFICANDO ESTRUCTURA DE VENTAS\n');
    
    // 1. Verificar estructura de la tabla ventas
    console.log('📊 ESTRUCTURA DE LA TABLA VENTAS:');
    const [structure] = await pool.execute('DESCRIBE ventas');
    structure.forEach(col => {
      console.log(`   ${col.Field} (${col.Type})`);
    });
    
    // 2. Verificar si hay una tabla de detalles de venta
    console.log('\n📊 BUSCANDO TABLA DE DETALLES DE VENTA:');
    const [tables] = await pool.execute('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0]);
    
    const detallesTable = tableNames.find(name => 
      name.toLowerCase().includes('detalle') || 
      name.toLowerCase().includes('item') ||
      name.toLowerCase().includes('linea')
    );
    
    if (detallesTable) {
      console.log(`   ✅ Encontrada tabla: ${detallesTable}`);
      const [detallesStructure] = await pool.execute(`DESCRIBE ${detallesTable}`);
      detallesStructure.forEach(col => {
        console.log(`     ${col.Field} (${col.Type})`);
      });
    } else {
      console.log('   ❌ No se encontró tabla de detalles de venta');
    }
    
    // 3. Verificar datos de ventas actuales
    console.log('\n📊 DATOS DE VENTAS ACTUALES:');
    const [ventas] = await pool.execute('SELECT * FROM ventas LIMIT 5');
    ventas.forEach((venta, index) => {
      console.log(`\n   Venta ${index + 1}:`);
      Object.keys(venta).forEach(key => {
        console.log(`     ${key}: ${venta[key]}`);
      });
    });
    
    // 4. Verificar si hay productos relacionados
    console.log('\n📊 BUSCANDO RELACIÓN CON PRODUCTOS:');
    const [productos] = await pool.execute('SELECT id_producto, nombre_producto FROM productos LIMIT 5');
    console.log('   Productos disponibles:');
    productos.forEach((producto, index) => {
      console.log(`     ${index + 1}. ID: ${producto.id_producto}, Nombre: ${producto.nombre_producto}`);
    });
    
    // 5. Proponer solución
    console.log('\n💡 SOLUCIÓN PROPUESTA:');
    console.log('   Para mostrar productos en ventas, necesitamos:');
    console.log('   1. Crear tabla venta_detalles con:');
    console.log('      - id_detalle (PK)');
    console.log('      - id_venta (FK)');
    console.log('      - id_producto (FK)');
    console.log('      - cantidad');
    console.log('      - precio_unitario');
    console.log('   2. Modificar procedimiento sp_mostrar_ventas para incluir productos');
    console.log('   3. Actualizar frontend para mostrar lista de productos');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkVentasStructure(); 