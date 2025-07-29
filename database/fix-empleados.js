const mysql = require('mysql2');

async function fixEmpleados() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🔧 Corrigiendo procedimiento de empleados...\n');
    
    // Verificar estructura de la tabla empleados
    connection.query('DESCRIBE empleados', (error, results) => {
      if (error) {
        console.error('❌ Error al verificar estructura:', error.message);
        return;
      }
      
      console.log('📊 Estructura de la tabla empleados:');
      results.forEach(col => {
        console.log(`   ${col.Field} (${col.Type})`);
      });
      
      // Corregir el procedimiento almacenado
      const procedures = [
        {
          name: 'sp_mostrar_empleados',
          sql: `CREATE PROCEDURE sp_mostrar_empleados() BEGIN SELECT id_empleado as id, nombre, puesto, salario FROM empleados ORDER BY nombre; END`
        },
        {
          name: 'sp_insertar_empleado',
          sql: `CREATE PROCEDURE sp_insertar_empleado(IN p_nombre VARCHAR(100), IN p_puesto VARCHAR(100), IN p_salario DECIMAL(10,2)) BEGIN INSERT INTO empleados (nombre, puesto, salario) VALUES (p_nombre, p_puesto, p_salario); SELECT LAST_INSERT_ID() as id; END`
        },
        {
          name: 'sp_obtener_empleado',
          sql: `CREATE PROCEDURE sp_obtener_empleado(IN p_id INT) BEGIN SELECT id_empleado as id, nombre, puesto, salario FROM empleados WHERE id_empleado = p_id; END`
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
        
        // Probar el procedimiento corregido
        connection.query('CALL sp_mostrar_empleados()', (error, results) => {
          if (error) {
            console.error('❌ Error al probar procedimiento:', error.message);
          } else {
            console.log(`✅ Procedimiento funcionando: ${results[0].length} empleados encontrados`);
            if (results[0].length > 0) {
              console.log(`   Ejemplo: ${JSON.stringify(results[0][0])}`);
            }
          }
          connection.end();
        });
      }, 2000);
      
    });
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
    connection.end();
  }
}

fixEmpleados(); 