const mysql = require('mysql2');

async function fixVentasNull() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🔧 Corrigiendo ventas con clientes nulos...\n');
    
    // 1. Verificar cuántas ventas tienen clientes nulos
    connection.query(`
      SELECT COUNT(*) as count 
      FROM ventas v 
      LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
      WHERE c.id_cliente IS NULL OR c.nombre IS NULL
    `, (error, results) => {
      if (error) {
        console.error('❌ Error al verificar:', error.message);
        return;
      }
      
      const ventasNull = results[0].count;
      console.log(`📊 Ventas con clientes nulos: ${ventasNull}`);
      
      if (ventasNull > 0) {
        // 2. Mostrar las ventas problemáticas
        connection.query(`
          SELECT v.id_venta, v.id_cliente, v.total, v.fecha_venta
          FROM ventas v 
          LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
          WHERE c.id_cliente IS NULL OR c.nombre IS NULL
          ORDER BY v.id_venta
        `, (error, results) => {
          if (error) {
            console.error('❌ Error al obtener ventas nulas:', error.message);
            return;
          }
          
          console.log('\n⚠️  VENTAS CON CLIENTES NULOS:');
          results.forEach((venta, index) => {
            console.log(`   ${index + 1}. ID Venta: ${venta.id_venta}, Cliente ID: ${venta.id_cliente}, Total: $${venta.total}, Fecha: ${venta.fecha_venta}`);
          });
          
          // 3. Obtener el primer cliente válido
          connection.query('SELECT id_cliente FROM clientes WHERE nombre IS NOT NULL ORDER BY id_cliente LIMIT 1', (error, results) => {
            if (error) {
              console.error('❌ Error al obtener cliente válido:', error.message);
              return;
            }
            
            const clienteValido = results[0].id_cliente;
            console.log(`\n🔄 Usando cliente ID ${clienteValido} como reemplazo`);
            
            // 4. Actualizar las ventas con clientes nulos
            connection.query(`
              UPDATE ventas 
              SET id_cliente = ? 
              WHERE id_cliente NOT IN (SELECT id_cliente FROM clientes WHERE nombre IS NOT NULL)
            `, [clienteValido], (error, results) => {
              if (error) {
                console.error('❌ Error al actualizar ventas:', error.message);
                return;
              }
              
              console.log(`✅ ${results.affectedRows} ventas actualizadas correctamente`);
              
              // 5. Verificar que se corrigieron
              connection.query(`
                SELECT COUNT(*) as count 
                FROM ventas v 
                LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
                WHERE c.id_cliente IS NULL OR c.nombre IS NULL
              `, (error, results) => {
                if (error) {
                  console.error('❌ Error al verificar corrección:', error.message);
                  return;
                }
                
                const ventasNullDespues = results[0].count;
                console.log(`📊 Ventas con clientes nulos después: ${ventasNullDespues}`);
                
                if (ventasNullDespues === 0) {
                  console.log('🎉 ¡Todas las ventas ahora tienen clientes válidos!');
                } else {
                  console.log('⚠️  Aún quedan ventas con clientes nulos');
                }
                
                // 6. Mostrar ejemplo de ventas corregidas
                connection.query(`
                  SELECT v.id_venta, v.id_cliente, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, 
                         v.total, v.fecha_venta
                  FROM ventas v 
                  LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
                  ORDER BY v.id_venta 
                  LIMIT 5
                `, (error, results) => {
                  if (error) {
                    console.error('❌ Error al mostrar ejemplos:', error.message);
                    return;
                  }
                  
                  console.log('\n📋 Ejemplos de ventas corregidas:');
                  results.forEach((venta, index) => {
                    console.log(`   ${index + 1}. ID: ${venta.id_venta}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha_venta}`);
                  });
                  
                  connection.end();
                });
              });
            });
          });
        });
      } else {
        console.log('✅ Todas las ventas ya tienen clientes válidos');
        connection.end();
      }
    });
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
    connection.end();
  }
}

fixVentasNull(); 