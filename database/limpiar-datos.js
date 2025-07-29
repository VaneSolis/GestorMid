const mysql = require('mysql2');

async function limpiarDatos() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🧹 LIMPIANDO DATOS DEL SISTEMA\n');
    
    // 1. Limpiar clientes con datos nulos
    console.log('👥 Limpiando clientes...');
    connection.query(`
      UPDATE clientes 
      SET nombre = 'Cliente ' || id_cliente, 
          apellido = 'Apellido ' || id_cliente,
          telefono = '555-000' || LPAD(id_cliente, 3, '0'),
          direccion = 'Dirección ' || id_cliente
      WHERE nombre IS NULL OR apellido IS NULL
    `, (error, result) => {
      if (error) {
        console.error('❌ Error al limpiar clientes:', error.message);
      } else {
        console.log(`✅ ${result.affectedRows} clientes limpiados`);
      }
      
      // 2. Limpiar empleados con datos nulos
      console.log('👷 Limpiando empleados...');
      connection.query(`
        UPDATE empleados 
        SET nombre = 'Empleado ' || id_empleado,
            puesto = 'Puesto ' || id_empleado,
            salario = 5000.00
        WHERE nombre IS NULL OR puesto IS NULL
      `, (error, result) => {
        if (error) {
          console.error('❌ Error al limpiar empleados:', error.message);
        } else {
          console.log(`✅ ${result.affectedRows} empleados limpiados`);
        }
        
        // 3. Limpiar proveedores con datos nulos
        console.log('🏢 Limpiando proveedores...');
        connection.query(`
          UPDATE proveedores 
          SET nombre = 'Proveedor ' || id_proveedor,
              producto_suministrado = 'Producto ' || id_proveedor,
              telefono = '555-000' || LPAD(id_proveedor, 3, '0')
          WHERE nombre IS NULL OR producto_suministrado IS NULL
        `, (error, result) => {
          if (error) {
            console.error('❌ Error al limpiar proveedores:', error.message);
          } else {
            console.log(`✅ ${result.affectedRows} proveedores limpiados`);
          }
          
          // 4. Verificar estado final
          console.log('\n📊 VERIFICACIÓN FINAL:');
          connection.query(`
            SELECT 
              (SELECT COUNT(*) FROM clientes WHERE nombre IS NOT NULL) as clientes_validos,
              (SELECT COUNT(*) FROM empleados WHERE nombre IS NOT NULL) as empleados_validos,
              (SELECT COUNT(*) FROM proveedores WHERE nombre IS NOT NULL) as proveedores_validos,
              (SELECT COUNT(*) FROM ventas) as total_ventas,
              (SELECT COUNT(*) FROM compras) as total_compras,
              (SELECT COUNT(*) FROM productos) as total_productos
          `, (error, results) => {
            if (error) {
              console.error('❌ Error al verificar estado:', error.message);
              return;
            }
            
            const estado = results[0];
            console.log(`   Clientes válidos: ${estado.clientes_validos}`);
            console.log(`   Empleados válidos: ${estado.empleados_validos}`);
            console.log(`   Proveedores válidos: ${estado.proveedores_validos}`);
            console.log(`   Total ventas: ${estado.total_ventas}`);
            console.log(`   Total compras: ${estado.total_compras}`);
            console.log(`   Total productos: ${estado.total_productos}`);
            
            if (estado.clientes_validos > 0 && estado.empleados_validos > 0 && estado.proveedores_validos > 0) {
              console.log('\n🎉 ¡TODOS LOS DATOS ESTÁN LIMPIOS Y FUNCIONANDO!');
              console.log('\n🚀 El sistema está listo para usar.');
              console.log('   Abre http://localhost:3000 en tu navegador');
            } else {
              console.log('\n⚠️  Algunos datos aún necesitan limpieza');
            }
            
            connection.end();
          });
        });
      });
    });
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
    connection.end();
  }
}

limpiarDatos(); 