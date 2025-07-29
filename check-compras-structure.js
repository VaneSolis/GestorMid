const { pool } = require('./config/database');

async function checkComprasStructure() {
  try {
    console.log('🔍 VERIFICANDO ESTRUCTURA DE COMPRAS\n');
    
    // 1. Verificar estructura de la tabla compras
    console.log('📊 ESTRUCTURA DE LA TABLA COMPRAS:');
    const [structure] = await pool.execute('DESCRIBE compras');
    structure.forEach(col => {
      console.log(`   ${col.Field} (${col.Type})`);
    });
    
    // 2. Verificar datos de compras actuales
    console.log('\n📊 DATOS DE COMPRAS ACTUALES:');
    const [compras] = await pool.execute('SELECT * FROM compras LIMIT 5');
    compras.forEach((compra, index) => {
      console.log(`\n   Compra ${index + 1}:`);
      Object.keys(compra).forEach(key => {
        console.log(`     ${key}: ${compra[key]}`);
      });
    });
    
    // 3. Verificar procedimiento almacenado actual
    console.log('\n📊 PROCEDIMIENTO ALMACENADO ACTUAL:');
    const [comprasSP] = await pool.execute('CALL sp_mostrar_compras()');
    
    if (comprasSP[0] && comprasSP[0].length > 0) {
      console.log(`Total de compras: ${comprasSP[0].length}`);
      
      console.log('\n📋 PRIMERAS 3 COMPRAS (estructura completa):');
      comprasSP[0].slice(0, 3).forEach((compra, index) => {
        console.log(`\n   Compra ${index + 1}:`);
        Object.keys(compra).forEach(key => {
          console.log(`     ${key}: ${compra[key]} (tipo: ${typeof compra[key]})`);
        });
      });
    }
    
    // 4. Verificar si hay tabla de detalles de compra
    console.log('\n📊 BUSCANDO TABLA DE DETALLES DE COMPRA:');
    const [tables] = await pool.execute('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0]);
    
    const detallesCompraTable = tableNames.find(name => 
      name.toLowerCase().includes('detalle') && name.toLowerCase().includes('compra') ||
      name.toLowerCase().includes('item') && name.toLowerCase().includes('compra')
    );
    
    if (detallesCompraTable) {
      console.log(`   ✅ Encontrada tabla: ${detallesCompraTable}`);
      const [detallesStructure] = await pool.execute(`DESCRIBE ${detallesCompraTable}`);
      detallesStructure.forEach(col => {
        console.log(`     ${col.Field} (${col.Type})`);
      });
    } else {
      console.log('   ❌ No se encontró tabla de detalles de compra');
    }
    
    // 5. Verificar proveedores disponibles
    console.log('\n📊 PROVEEDORES DISPONIBLES:');
    const [proveedores] = await pool.execute('SELECT id_proveedor, nombre FROM proveedores LIMIT 5');
    proveedores.forEach((proveedor, index) => {
      console.log(`   ${index + 1}. ID: ${proveedor.id_proveedor}, Nombre: ${proveedor.nombre}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkComprasStructure(); 