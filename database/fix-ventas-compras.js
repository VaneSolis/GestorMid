const mysql = require('mysql2');

async function fixVentasCompras() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🔧 Corrigiendo procedimientos de ventas y compras...');
    
    const procedures = [
      {
        name: 'sp_mostrar_ventas',
        sql: `CREATE PROCEDURE sp_mostrar_ventas() BEGIN SELECT v.id_venta as id, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, v.total as total, v.fecha_venta as fecha FROM ventas v LEFT JOIN clientes c ON v.id_cliente = c.id_cliente ORDER BY v.fecha_venta DESC; END`
      },
      {
        name: 'sp_insertar_venta',
        sql: `CREATE PROCEDURE sp_insertar_venta(IN p_cliente_id INT, IN p_total DECIMAL(10,2), IN p_fecha DATE) BEGIN INSERT INTO ventas (id_cliente, total, fecha_venta) VALUES (p_cliente_id, p_total, p_fecha); SELECT LAST_INSERT_ID() as id; END`
      },
      {
        name: 'sp_obtener_venta',
        sql: `CREATE PROCEDURE sp_obtener_venta(IN p_id INT) BEGIN SELECT v.id_venta as id, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, v.total as total, v.fecha_venta as fecha FROM ventas v LEFT JOIN clientes c ON v.id_cliente = c.id_cliente WHERE v.id_venta = p_id; END`
      },
      {
        name: 'sp_mostrar_compras',
        sql: `CREATE PROCEDURE sp_mostrar_compras() BEGIN SELECT c.id_compra as id, p.nombre as proveedor_nombre, c.costo_total as total, c.fecha_compra as fecha FROM compras c LEFT JOIN proveedores p ON c.id_proveedor = p.id_proveedor ORDER BY c.fecha_compra DESC; END`
      },
      {
        name: 'sp_insertar_compra',
        sql: `CREATE PROCEDURE sp_insertar_compra(IN p_proveedor_id INT, IN p_total DECIMAL(10,2), IN p_fecha DATE) BEGIN INSERT INTO compras (id_proveedor, costo_total, fecha_compra) VALUES (p_proveedor_id, p_total, p_fecha); SELECT LAST_INSERT_ID() as id; END`
      }
    ];
    
    let updatedCount = 0;
    
    for (const procedure of procedures) {
      try {
        console.log(`📦 Corrigiendo: ${procedure.name}`);
        
        // Eliminar procedimiento si existe
        try {
          connection.query(`DROP PROCEDURE IF EXISTS ${procedure.name}`);
        } catch (error) {
          // Ignorar errores si no existe
        }
        
        // Crear el procedimiento
        connection.query(procedure.sql, (error, results) => {
          if (error) {
            console.error(`❌ Error al corregir ${procedure.name}: ${error.message}`);
          } else {
            updatedCount++;
            console.log(`✅ ${procedure.name} corregido correctamente`);
          }
        });
        
      } catch (error) {
        console.error(`❌ Error al corregir ${procedure.name}: ${error.message}`);
      }
    }
    
    // Esperar un poco para que se completen las consultas
    setTimeout(() => {
      console.log(`\n🎉 Corrección completada: ${updatedCount} procedimientos corregidos`);
      connection.end();
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error durante la corrección:', error.message);
    connection.end();
  }
}

// Ejecutar la corrección
fixVentasCompras(); 