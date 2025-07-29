const mysql = require('mysql2');

async function fixComprasStructure() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🔧 CORRIGIENDO PROCEDIMIENTO DE COMPRAS\n');
    
    // 1. Verificar datos actuales de compras
    console.log('📊 VERIFICANDO DATOS DE COMPRAS:');
    connection.query(`
      SELECT c.id_compra, c.producto, c.cantidad, c.costo_total, c.fecha_compra, p.nombre as proveedor_nombre
      FROM compras c
      LEFT JOIN proveedores p ON c.id_proveedor = p.id_proveedor
      ORDER BY c.id_compra
      LIMIT 5
    `, (error, results) => {
      if (error) {
        console.error('❌ Error al verificar compras:', error.message);
        return;
      }
      
      console.log(`   Encontradas ${results.length} compras`);
      results.forEach((compra, index) => {
        console.log(`   ${index + 1}. ID: ${compra.id_compra}, Producto: ${compra.producto}, Cantidad: ${compra.cantidad}, Total: $${compra.costo_total}, Proveedor: ${compra.proveedor_nombre}`);
      });
      
      // 2. Crear nuevo procedimiento con productos
      const newProcedure = `
        CREATE PROCEDURE sp_mostrar_compras_con_productos() 
        BEGIN 
          SELECT 
            c.id_compra as id,
            p.nombre as proveedor_nombre,
            CONCAT(c.producto, ' (', c.cantidad, ')') as productos,
            c.costo_total as total,
            c.fecha_compra as fecha
          FROM compras c 
          LEFT JOIN proveedores p ON c.id_proveedor = p.id_proveedor
          ORDER BY c.fecha_compra DESC;
        END
      `;
      
      console.log('\n📦 CREANDO NUEVO PROCEDIMIENTO...');
      
      // Eliminar procedimiento si existe
      connection.query('DROP PROCEDURE IF EXISTS sp_mostrar_compras_con_productos', (error) => {
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
          
          console.log('✅ Procedimiento sp_mostrar_compras_con_productos creado');
          
          // 3. Probar el nuevo procedimiento
          console.log('\n🧪 PROBANDO NUEVO PROCEDIMIENTO:');
          connection.query('CALL sp_mostrar_compras_con_productos()', (error, results) => {
            if (error) {
              console.error('❌ Error al probar procedimiento:', error.message);
              return;
            }
            
            console.log(`✅ Procedimiento funcionando: ${results[0].length} compras encontradas`);
            
            if (results[0].length > 0) {
              console.log('\n📋 EJEMPLOS DE COMPRAS CON PRODUCTOS:');
              results[0].slice(0, 5).forEach((compra, index) => {
                console.log(`\n   Compra ${index + 1}:`);
                console.log(`     ID: ${compra.id}`);
                console.log(`     Proveedor: ${compra.proveedor_nombre}`);
                console.log(`     Productos: ${compra.productos}`);
                console.log(`     Total: $${compra.total}`);
                console.log(`     Fecha: ${compra.fecha}`);
              });
            }
            
            // 4. Actualizar el procedimiento original
            console.log('\n📦 ACTUALIZANDO PROCEDIMIENTO ORIGINAL...');
            const updateOriginal = `
              CREATE PROCEDURE sp_mostrar_compras() 
              BEGIN 
                SELECT 
                  c.id_compra as id,
                  p.nombre as proveedor_nombre,
                  CONCAT(c.producto, ' (', c.cantidad, ')') as productos,
                  c.costo_total as total,
                  c.fecha_compra as fecha
                FROM compras c 
                LEFT JOIN proveedores p ON c.id_proveedor = p.id_proveedor
                ORDER BY c.fecha_compra DESC;
              END
            `;
            
            connection.query('DROP PROCEDURE IF EXISTS sp_mostrar_compras', (error) => {
              if (error) {
                console.error('❌ Error al eliminar procedimiento original:', error.message);
                return;
              }
              
              connection.query(updateOriginal, (error) => {
                if (error) {
                  console.error('❌ Error al actualizar procedimiento original:', error.message);
                  return;
                }
                
                console.log('✅ Procedimiento sp_mostrar_compras actualizado con productos');
                console.log('\n🎉 ¡PROCEDIMIENTO ACTUALIZADO EXITOSAMENTE!');
                console.log('   Ahora las compras mostrarán los productos comprados');
                
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

fixComprasStructure(); 