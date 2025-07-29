const mysql = require('mysql2');

async function fixVentasProductos() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🔧 MODIFICANDO PROCEDIMIENTO DE VENTAS PARA INCLUIR PRODUCTOS\n');
    
    // 1. Verificar datos de detalle_venta
    console.log('📊 VERIFICANDO DATOS DE DETALLE_VENTA:');
    connection.query(`
      SELECT dv.id_venta, dv.id_producto, p.nombre_producto, dv.cantidad, dv.subtotal
      FROM detalle_venta dv
      LEFT JOIN productos p ON dv.id_producto = p.id_producto
      ORDER BY dv.id_venta
      LIMIT 10
    `, (error, results) => {
      if (error) {
        console.error('❌ Error al verificar detalles:', error.message);
        return;
      }
      
      console.log(`   Encontrados ${results.length} detalles de venta`);
      results.forEach((detalle, index) => {
        console.log(`   ${index + 1}. Venta: ${detalle.id_venta}, Producto: ${detalle.nombre_producto}, Cantidad: ${detalle.cantidad}, Subtotal: $${detalle.subtotal}`);
      });
      
      // 2. Crear nuevo procedimiento con productos
      const newProcedure = `
        CREATE PROCEDURE sp_mostrar_ventas_con_productos() 
        BEGIN 
          SELECT 
            v.id_venta as id,
            CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre,
            GROUP_CONCAT(
              CONCAT(p.nombre_producto, ' (', dv.cantidad, ')') 
              SEPARATOR ', '
            ) as productos,
            v.total as total,
            v.fecha_venta as fecha
          FROM ventas v 
          LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
          LEFT JOIN detalle_venta dv ON v.id_venta = dv.id_venta
          LEFT JOIN productos p ON dv.id_producto = p.id_producto
          GROUP BY v.id_venta, c.nombre, c.apellido, v.total, v.fecha_venta
          ORDER BY v.fecha_venta DESC;
        END
      `;
      
      console.log('\n📦 CREANDO NUEVO PROCEDIMIENTO...');
      
      // Eliminar procedimiento si existe
      connection.query('DROP PROCEDURE IF EXISTS sp_mostrar_ventas_con_productos', (error) => {
        if (error) {
          console.error('❌ Error al eliminar procedimiento:', error.message);
          return;
        }
        
        // Crear nuevo procedimiento
        connection.query(newProcedure, (error) => {
          if (error) {
            console.error('❌ Error al crear procedimiento:', error.message);
            return;
          }
          
          console.log('✅ Procedimiento sp_mostrar_ventas_con_productos creado');
          
          // 3. Probar el nuevo procedimiento
          console.log('\n🧪 PROBANDO NUEVO PROCEDIMIENTO:');
          connection.query('CALL sp_mostrar_ventas_con_productos()', (error, results) => {
            if (error) {
              console.error('❌ Error al probar procedimiento:', error.message);
              return;
            }
            
            console.log(`✅ Procedimiento funcionando: ${results[0].length} ventas encontradas`);
            
            if (results[0].length > 0) {
              console.log('\n📋 EJEMPLOS DE VENTAS CON PRODUCTOS:');
              results[0].slice(0, 5).forEach((venta, index) => {
                console.log(`\n   Venta ${index + 1}:`);
                console.log(`     ID: ${venta.id}`);
                console.log(`     Cliente: ${venta.cliente_nombre}`);
                console.log(`     Productos: ${venta.productos || 'Sin productos'}`);
                console.log(`     Total: $${venta.total}`);
                console.log(`     Fecha: ${venta.fecha}`);
              });
            }
            
            // 4. Actualizar el procedimiento original
            console.log('\n📦 ACTUALIZANDO PROCEDIMIENTO ORIGINAL...');
            const updateOriginal = `
              CREATE PROCEDURE sp_mostrar_ventas() 
              BEGIN 
                SELECT 
                  v.id_venta as id,
                  CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre,
                  GROUP_CONCAT(
                    CONCAT(p.nombre_producto, ' (', dv.cantidad, ')') 
                    SEPARATOR ', '
                  ) as productos,
                  v.total as total,
                  v.fecha_venta as fecha
                FROM ventas v 
                LEFT JOIN clientes c ON v.id_cliente = c.id_cliente 
                LEFT JOIN detalle_venta dv ON v.id_venta = dv.id_venta
                LEFT JOIN productos p ON dv.id_producto = p.id_producto
                GROUP BY v.id_venta, c.nombre, c.apellido, v.total, v.fecha_venta
                ORDER BY v.fecha_venta DESC;
              END
            `;
            
            connection.query('DROP PROCEDURE IF EXISTS sp_mostrar_ventas', (error) => {
              if (error) {
                console.error('❌ Error al eliminar procedimiento original:', error.message);
                return;
              }
              
              connection.query(updateOriginal, (error) => {
                if (error) {
                  console.error('❌ Error al actualizar procedimiento original:', error.message);
                  return;
                }
                
                console.log('✅ Procedimiento sp_mostrar_ventas actualizado con productos');
                console.log('\n🎉 ¡PROCEDIMIENTO ACTUALIZADO EXITOSAMENTE!');
                console.log('   Ahora las ventas mostrarán los productos vendidos');
                
                connection.end();
              });
            });
          });
        });
      });
    });
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
    connection.end();
  }
}

fixVentasProductos(); 