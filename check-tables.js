const { pool } = require('./config/database');

async function checkTables() {
  try {
    console.log('🔍 Verificando contenido de las tablas...\n');
    
    const tables = ['productos', 'ventas', 'compras', 'clientes', 'empleados', 'proveedores'];
    
    for (const table of tables) {
      console.log(`📊 Tabla: ${table}`);
      try {
        // Verificar si la tabla existe
        const [tableExists] = await pool.execute(`SHOW TABLES LIKE '${table}'`);
        if (tableExists.length === 0) {
          console.log(`❌ La tabla ${table} no existe`);
          continue;
        }
        
        // Contar registros
        const [countResult] = await pool.execute(`SELECT COUNT(*) as count FROM ${table}`);
        const count = countResult[0].count;
        console.log(`   Registros: ${count}`);
        
        // Mostrar estructura de la tabla
        const [structure] = await pool.execute(`DESCRIBE ${table}`);
        console.log(`   Columnas: ${structure.map(col => col.Field).join(', ')}`);
        
        // Mostrar algunos registros si existen
        if (count > 0) {
          const [rows] = await pool.execute(`SELECT * FROM ${table} LIMIT 3`);
          console.log(`   Primeros registros:`);
          rows.forEach((row, index) => {
            console.log(`     ${index + 1}. ${JSON.stringify(row)}`);
          });
        } else {
          console.log(`   ⚠️  La tabla está vacía`);
        }
        
        console.log('');
        
      } catch (error) {
        console.log(`❌ Error al verificar ${table}: ${error.message}`);
        console.log('');
      }
    }
    
    // Verificar procedimientos almacenados
    console.log('🔧 Verificando procedimientos almacenados...\n');
    
    const procedures = [
      'sp_mostrar_productos',
      'sp_mostrar_ventas', 
      'sp_mostrar_compras',
      'sp_mostrar_clientes',
      'sp_mostrar_empleados',
      'sp_mostrar_proveedores'
    ];
    
    for (const proc of procedures) {
      try {
        const [procExists] = await pool.execute(`SHOW PROCEDURE STATUS WHERE Name = '${proc}'`);
        if (procExists.length > 0) {
          console.log(`✅ ${proc} existe`);
        } else {
          console.log(`❌ ${proc} NO existe`);
        }
      } catch (error) {
        console.log(`❌ Error al verificar ${proc}: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  } finally {
    await pool.end();
  }
}

checkTables(); 