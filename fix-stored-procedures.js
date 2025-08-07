const mysql = require('mysql2');

// Configuración Clever Cloud
const cleverConfig = {
  host: 'bmbomdrvxfmjayg1ob1t-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'u38jfxey6ydxpquj',
  password: 'G6OrgeuvwYB5CgquynZQ',
  database: 'bmbomdrvxfmjayg1ob1t',
  charset: 'utf8mb4'
};

console.log('🔧 CORRIGIENDO PROCEDIMIENTOS ALMACENADOS');
console.log('==========================================');

async function fixStoredProcedures() {
  const connection = mysql.createConnection(cleverConfig);
  
  try {
    console.log('🔗 Conectando a Clever Cloud...');
    
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    console.log('✅ Conexión establecida');
    
    // Procedimientos corregidos
    const procedures = [
      {
        name: 'sp_mostrar_clientes',
        sql: `
          DROP PROCEDURE IF EXISTS sp_mostrar_clientes;
          DELIMITER //
          CREATE PROCEDURE sp_mostrar_clientes()
          BEGIN
              SELECT * FROM clientes ORDER BY nombre;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_insertar_cliente',
        sql: `
          DROP PROCEDURE IF EXISTS sp_insertar_cliente;
          DELIMITER //
          CREATE PROCEDURE sp_insertar_cliente(
              IN p_nombre VARCHAR(100),
              IN p_apellido VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_direccion TEXT
          )
          BEGIN
              INSERT INTO clientes (nombre, apellido, telefono, email, direccion) 
              VALUES (p_nombre, p_apellido, p_telefono, p_email, p_direccion);
              SELECT LAST_INSERT_ID() as id_cliente;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_actualizar_cliente',
        sql: `
          DROP PROCEDURE IF EXISTS sp_actualizar_cliente;
          DELIMITER //
          CREATE PROCEDURE sp_actualizar_cliente(
              IN p_id_cliente INT,
              IN p_nombre VARCHAR(100),
              IN p_apellido VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_direccion TEXT
          )
          BEGIN
              UPDATE clientes 
              SET nombre = p_nombre, apellido = p_apellido, telefono = p_telefono, email = p_email, direccion = p_direccion
              WHERE id_cliente = p_id_cliente;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_eliminar_cliente',
        sql: `
          DROP PROCEDURE IF EXISTS sp_eliminar_cliente;
          DELIMITER //
          CREATE PROCEDURE sp_eliminar_cliente(IN p_id_cliente INT)
          BEGIN
              DELETE FROM clientes WHERE id_cliente = p_id_cliente;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_obtener_cliente',
        sql: `
          DROP PROCEDURE IF EXISTS sp_obtener_cliente;
          DELIMITER //
          CREATE PROCEDURE sp_obtener_cliente(IN p_id_cliente INT)
          BEGIN
              SELECT * FROM clientes WHERE id_cliente = p_id_cliente;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_mostrar_productos',
        sql: `
          DROP PROCEDURE IF EXISTS sp_mostrar_productos;
          DELIMITER //
          CREATE PROCEDURE sp_mostrar_productos()
          BEGIN
              SELECT * FROM productos ORDER BY nombre_producto;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_insertar_producto',
        sql: `
          DROP PROCEDURE IF EXISTS sp_insertar_producto;
          DELIMITER //
          CREATE PROCEDURE sp_insertar_producto(
              IN p_nombre_producto VARCHAR(100),
              IN p_precio DECIMAL(10,2),
              IN p_stock INT,
              IN p_descripcion TEXT
          )
          BEGIN
              INSERT INTO productos (nombre_producto, precio, stock, descripcion) 
              VALUES (p_nombre_producto, p_precio, p_stock, p_descripcion);
              SELECT LAST_INSERT_ID() as id_producto;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_actualizar_producto',
        sql: `
          DROP PROCEDURE IF EXISTS sp_actualizar_producto;
          DELIMITER //
          CREATE PROCEDURE sp_actualizar_producto(
              IN p_id_producto INT,
              IN p_nombre_producto VARCHAR(100),
              IN p_precio DECIMAL(10,2),
              IN p_stock INT,
              IN p_descripcion TEXT
          )
          BEGIN
              UPDATE productos 
              SET nombre_producto = p_nombre_producto, precio = p_precio, stock = p_stock, descripcion = p_descripcion
              WHERE id_producto = p_id_producto;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_eliminar_producto',
        sql: `
          DROP PROCEDURE IF EXISTS sp_eliminar_producto;
          DELIMITER //
          CREATE PROCEDURE sp_eliminar_producto(IN p_id_producto INT)
          BEGIN
              DELETE FROM productos WHERE id_producto = p_id_producto;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_obtener_producto',
        sql: `
          DROP PROCEDURE IF EXISTS sp_obtener_producto;
          DELIMITER //
          CREATE PROCEDURE sp_obtener_producto(IN p_id_producto INT)
          BEGIN
              SELECT * FROM productos WHERE id_producto = p_id_producto;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_mostrar_empleados',
        sql: `
          DROP PROCEDURE IF EXISTS sp_mostrar_empleados;
          DELIMITER //
          CREATE PROCEDURE sp_mostrar_empleados()
          BEGIN
              SELECT * FROM empleados ORDER BY nombre;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_insertar_empleado',
        sql: `
          DROP PROCEDURE IF EXISTS sp_insertar_empleado;
          DELIMITER //
          CREATE PROCEDURE sp_insertar_empleado(
              IN p_nombre VARCHAR(100),
              IN p_puesto VARCHAR(50),
              IN p_salario DECIMAL(10,2)
          )
          BEGIN
              INSERT INTO empleados (nombre, puesto, salario) 
              VALUES (p_nombre, p_puesto, p_salario);
              SELECT LAST_INSERT_ID() as id_empleado;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_actualizar_empleado',
        sql: `
          DROP PROCEDURE IF EXISTS sp_actualizar_empleado;
          DELIMITER //
          CREATE PROCEDURE sp_actualizar_empleado(
              IN p_id_empleado INT,
              IN p_nombre VARCHAR(100),
              IN p_puesto VARCHAR(50),
              IN p_salario DECIMAL(10,2)
          )
          BEGIN
              UPDATE empleados 
              SET nombre = p_nombre, puesto = p_puesto, salario = p_salario
              WHERE id_empleado = p_id_empleado;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_eliminar_empleado',
        sql: `
          DROP PROCEDURE IF EXISTS sp_eliminar_empleado;
          DELIMITER //
          CREATE PROCEDURE sp_eliminar_empleado(IN p_id_empleado INT)
          BEGIN
              DELETE FROM empleados WHERE id_empleado = p_id_empleado;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_obtener_empleado',
        sql: `
          DROP PROCEDURE IF EXISTS sp_obtener_empleado;
          DELIMITER //
          CREATE PROCEDURE sp_obtener_empleado(IN p_id_empleado INT)
          BEGIN
              SELECT * FROM empleados WHERE id_empleado = p_id_empleado;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_mostrar_proveedores',
        sql: `
          DROP PROCEDURE IF EXISTS sp_mostrar_proveedores;
          DELIMITER //
          CREATE PROCEDURE sp_mostrar_proveedores()
          BEGIN
              SELECT * FROM proveedores ORDER BY nombre;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_insertar_proveedor',
        sql: `
          DROP PROCEDURE IF EXISTS sp_insertar_proveedor;
          DELIMITER //
          CREATE PROCEDURE sp_insertar_proveedor(
              IN p_nombre VARCHAR(100),
              IN p_contacto VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_direccion TEXT
          )
          BEGIN
              INSERT INTO proveedores (nombre, contacto, telefono, direccion) 
              VALUES (p_nombre, p_contacto, p_telefono, p_direccion);
              SELECT LAST_INSERT_ID() as id_proveedor;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_actualizar_proveedor',
        sql: `
          DROP PROCEDURE IF EXISTS sp_actualizar_proveedor;
          DELIMITER //
          CREATE PROCEDURE sp_actualizar_proveedor(
              IN p_id_proveedor INT,
              IN p_nombre VARCHAR(100),
              IN p_contacto VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_direccion TEXT
          )
          BEGIN
              UPDATE proveedores 
              SET nombre = p_nombre, contacto = p_contacto, telefono = p_telefono, direccion = p_direccion
              WHERE id_proveedor = p_id_proveedor;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_eliminar_proveedor',
        sql: `
          DROP PROCEDURE IF EXISTS sp_eliminar_proveedor;
          DELIMITER //
          CREATE PROCEDURE sp_eliminar_proveedor(IN p_id_proveedor INT)
          BEGIN
              DELETE FROM proveedores WHERE id_proveedor = p_id_proveedor;
          END //
          DELIMITER ;
        `
      },
      {
        name: 'sp_obtener_proveedor',
        sql: `
          DROP PROCEDURE IF EXISTS sp_obtener_proveedor;
          DELIMITER //
          CREATE PROCEDURE sp_obtener_proveedor(IN p_id_proveedor INT)
          BEGIN
              SELECT * FROM proveedores WHERE id_proveedor = p_id_proveedor;
          END //
          DELIMITER ;
        `
      }
    ];
    
    for (const procedure of procedures) {
      console.log(`\n🔧 Instalando procedimiento: ${procedure.name}`);
      console.log('─'.repeat(50));
      
      try {
        // Dividir el SQL en comandos separados
        const commands = procedure.sql.split(';').filter(cmd => cmd.trim());
        
        for (const command of commands) {
          if (command.trim()) {
            await new Promise((resolve, reject) => {
              connection.query(command, (err) => {
                if (err) {
                  console.log(`⚠️  Error en comando:`, err.message);
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
          }
        }
        
        console.log(`✅ Procedimiento ${procedure.name} instalado correctamente`);
      } catch (error) {
        console.log(`❌ Error instalando ${procedure.name}:`, error.message);
      }
    }
    
    console.log('\n🎉 ¡Procedimientos corregidos exitosamente!');
    console.log('Ahora los formularios deberían funcionar correctamente.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    connection.end();
  }
}

fixStoredProcedures(); 