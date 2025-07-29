const mysql = require('mysql2');

async function fixVentasFinal() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🔧 CORRECCIÓN FINAL DE VENTAS\n');
    
    // 1. Verificar el estado actual
    connection.query(`
      SELECT COUNT(*) as total_ventas,
             COUNT(CASE WHEN c.id_cliente IS NULL THEN 1 END) as ventas_sin_cliente
      FROM ventas v 
      LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
    `, (error, results) => {
      if (error) {
        console.error('❌ Error al verificar estado:', error.message);
        return;
      }
      
      const estado = results[0];
      console.log(`📊 Estado actual:`);
      console.log(`   Total de ventas: ${estado.total_ventas}`);
      console.log(`   Ventas sin cliente: ${estado.ventas_sin_cliente}`);
      
      if (estado.ventas_sin_cliente > 0) {
        // 2. Obtener clientes válidos
        connection.query('SELECT id_cliente, nombre, apellido FROM clientes WHERE nombre IS NOT NULL ORDER BY id_cliente', (error, clientes) => {
          if (error) {
            console.error('❌ Error al obtener clientes:', error.message);
            return;
          }
          
          console.log(`\n👥 Clientes válidos disponibles: ${clientes.length}`);
          clientes.slice(0, 5).forEach((cliente, index) => {
            console.log(`   ${index + 1}. ID: ${cliente.id_cliente}, Nombre: ${cliente.nombre} ${cliente.apellido}`);
          });
          
          // 3. Distribuir las ventas sin cliente entre los clientes válidos
          const clientesValidos = clientes.map(c => c.id_cliente);
          let clienteIndex = 0;
          
          connection.query(`
            SELECT v.id_venta, v.id_cliente, v.total, v.fecha_venta
            FROM ventas v 
            LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
            WHERE c.id_cliente IS NULL
            ORDER BY v.id_venta
          `, (error, ventasSinCliente) => {
            if (error) {
              console.error('❌ Error al obtener ventas sin cliente:', error.message);
              return;
            }
            
            console.log(`\n🔄 Corrigiendo ${ventasSinCliente.length} ventas sin cliente...`);
            
            let actualizadas = 0;
            
            ventasSinCliente.forEach((venta, index) => {
              const clienteAsignado = clientesValidos[clienteIndex % clientesValidos.length];
              clienteIndex++;
              
              connection.query(`
                UPDATE ventas 
                SET id_cliente = ? 
                WHERE id_venta = ?
              `, [clienteAsignado, venta.id_venta], (error, result) => {
                if (error) {
                  console.error(`❌ Error al actualizar venta ${venta.id_venta}:`, error.message);
                } else {
                  actualizadas++;
                  console.log(`   ✅ Venta ${venta.id_venta} asignada a cliente ${clienteAsignado}`);
                  
                  if (actualizadas === ventasSinCliente.length) {
                    // 4. Verificar corrección
                    connection.query(`
                      SELECT COUNT(*) as total_ventas,
                             COUNT(CASE WHEN c.id_cliente IS NULL THEN 1 END) as ventas_sin_cliente
                      FROM ventas v 
                      LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
                    `, (error, results) => {
                      if (error) {
                        console.error('❌ Error al verificar corrección:', error.message);
                        return;
                      }
                      
                      const estadoFinal = results[0];
                      console.log(`\n📊 Estado final:`);
                      console.log(`   Total de ventas: ${estadoFinal.total_ventas}`);
                      console.log(`   Ventas sin cliente: ${estadoFinal.ventas_sin_cliente}`);
                      
                      if (estadoFinal.ventas_sin_cliente === 0) {
                        console.log('🎉 ¡Todas las ventas ahora tienen clientes válidos!');
                        
                        // 5. Mostrar ejemplo de ventas corregidas
                        connection.query(`
                          SELECT v.id_venta, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, 
                                 v.total, v.fecha_venta
                          FROM ventas v 
                          LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
                          ORDER BY v.fecha_venta DESC 
                          LIMIT 10
                        `, (error, results) => {
                          if (error) {
                            console.error('❌ Error al mostrar ejemplos:', error.message);
                            return;
                          }
                          
                          console.log('\n📋 Ejemplos de ventas corregidas (ordenadas por fecha):');
                          results.forEach((venta, index) => {
                            console.log(`   ${index + 1}. ID: ${venta.id_venta}, Cliente: ${venta.cliente_nombre}, Total: $${venta.total}, Fecha: ${venta.fecha_venta}`);
                          });
                          
                          connection.end();
                        });
                      } else {
                        console.log('⚠️  Aún quedan ventas sin cliente');
                        connection.end();
                      }
                    });
                  }
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

fixVentasFinal(); 