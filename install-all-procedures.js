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

console.log('🔧 INSTALANDO TODOS LOS PROCEDIMIENTOS ALMACENADOS');
console.log('==================================================');

async function installAllProcedures() {
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
    
    // Todos los procedimientos necesarios
    const procedures = [
      // CLIENTES
      {
        name: 'sp_mostrar_clientes',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_mostrar_clientes',
        createSql: `
          CREATE PROCEDURE sp_mostrar_clientes()
          BEGIN
              SELECT * FROM clientes ORDER BY nombre;
          END
        `
      },
      {
        name: 'sp_insertar_cliente',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_insertar_cliente',
        createSql: `
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
          END
        `
      },
      {
        name: 'sp_actualizar_cliente',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_actualizar_cliente',
        createSql: `
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
          END
        `
      },
      {
        name: 'sp_eliminar_cliente',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_eliminar_cliente',
        createSql: `
          CREATE PROCEDURE sp_eliminar_cliente(IN p_id_cliente INT)
          BEGIN
              DELETE FROM clientes WHERE id_cliente = p_id_cliente;
          END
        `
      },
      {
        name: 'sp_obtener_cliente',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_obtener_cliente',
        createSql: `
          CREATE PROCEDURE sp_obtener_cliente(IN p_id_cliente INT)
          BEGIN
              SELECT * FROM clientes WHERE id_cliente = p_id_cliente;
          END
        `
      },
      
      // PRODUCTOS
      {
        name: 'sp_mostrar_productos',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_mostrar_productos',
        createSql: `
          CREATE PROCEDURE sp_mostrar_productos()
          BEGIN
              SELECT * FROM productos ORDER BY nombre_producto;
          END
        `
      },
      {
        name: 'sp_insertar_producto',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_insertar_producto',
        createSql: `
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
          END
        `
      },
      {
        name: 'sp_actualizar_producto',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_actualizar_producto',
        createSql: `
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
          END
        `
      },
      {
        name: 'sp_eliminar_producto',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_eliminar_producto',
        createSql: `
          CREATE PROCEDURE sp_eliminar_producto(IN p_id_producto INT)
          BEGIN
              DELETE FROM productos WHERE id_producto = p_id_producto;
          END
        `
      },
      {
        name: 'sp_obtener_producto',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_obtener_producto',
        createSql: `
          CREATE PROCEDURE sp_obtener_producto(IN p_id_producto INT)
          BEGIN
              SELECT * FROM productos WHERE id_producto = p_id_producto;
          END
        `
      },
      
      // EMPLEADOS
      {
        name: 'sp_mostrar_empleados',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_mostrar_empleados',
        createSql: `
          CREATE PROCEDURE sp_mostrar_empleados()
          BEGIN
              SELECT * FROM empleados ORDER BY nombre;
          END
        `
      },
      {
        name: 'sp_insertar_empleado',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_insertar_empleado',
        createSql: `
          CREATE PROCEDURE sp_insertar_empleado(
              IN p_nombre VARCHAR(100),
              IN p_puesto VARCHAR(50),
              IN p_salario DECIMAL(10,2)
          )
          BEGIN
              INSERT INTO empleados (nombre, puesto, salario) 
              VALUES (p_nombre, p_puesto, p_salario);
              SELECT LAST_INSERT_ID() as id_empleado;
          END
        `
      },
      {
        name: 'sp_actualizar_empleado',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_actualizar_empleado',
        createSql: `
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
          END
        `
      },
      {
        name: 'sp_eliminar_empleado',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_eliminar_empleado',
        createSql: `
          CREATE PROCEDURE sp_eliminar_empleado(IN p_id_empleado INT)
          BEGIN
              DELETE FROM empleados WHERE id_empleado = p_id_empleado;
          END
        `
      },
      {
        name: 'sp_obtener_empleado',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_obtener_empleado',
        createSql: `
          CREATE PROCEDURE sp_obtener_empleado(IN p_id_empleado INT)
          BEGIN
              SELECT * FROM empleados WHERE id_empleado = p_id_empleado;
          END
        `
      },
      
      // PROVEEDORES
      {
        name: 'sp_mostrar_proveedores',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_mostrar_proveedores',
        createSql: `
          CREATE PROCEDURE sp_mostrar_proveedores()
          BEGIN
              SELECT * FROM proveedores ORDER BY nombre;
          END
        `
      },
      {
        name: 'sp_insertar_proveedor',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_insertar_proveedor',
        createSql: `
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
          END
        `
      },
      {
        name: 'sp_actualizar_proveedor',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_actualizar_proveedor',
        createSql: `
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
          END
        `
      },
      {
        name: 'sp_eliminar_proveedor',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_eliminar_proveedor',
        createSql: `
          CREATE PROCEDURE sp_eliminar_proveedor(IN p_id_proveedor INT)
          BEGIN
              DELETE FROM proveedores WHERE id_proveedor = p_id_proveedor;
          END
        `
      },
      {
        name: 'sp_obtener_proveedor',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_obtener_proveedor',
        createSql: `
          CREATE PROCEDURE sp_obtener_proveedor(IN p_id_proveedor INT)
          BEGIN
              SELECT * FROM proveedores WHERE id_proveedor = p_id_proveedor;
          END
        `
      },
      
      // VENTAS
      {
        name: 'sp_mostrar_ventas',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_mostrar_ventas',
        createSql: `
          CREATE PROCEDURE sp_mostrar_ventas()
          BEGIN
              SELECT v.*, c.nombre as cliente_nombre, e.nombre as empleado_nombre
              FROM ventas v
              LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
              LEFT JOIN empleados e ON v.id_empleado = e.id_empleado
              ORDER BY v.fecha_venta DESC;
          END
        `
      },
      
      // COMPRAS
      {
        name: 'sp_mostrar_compras',
        dropSql: 'DROP PROCEDURE IF EXISTS sp_mostrar_compras',
        createSql: `
          CREATE PROCEDURE sp_mostrar_compras()
          BEGIN
              SELECT c.*, p.nombre as proveedor_nombre
              FROM compras c
              LEFT JOIN proveedores p ON c.id_proveedor = p.id_proveedor
              ORDER BY c.fecha_compra DESC;
          END
        `
      }
    ];
    
    for (const procedure of procedures) {
      console.log(`\n🔧 Instalando procedimiento: ${procedure.name}`);
      console.log('─'.repeat(50));
      
      try {
        // Primero eliminar el procedimiento si existe
        await new Promise((resolve, reject) => {
          connection.query(procedure.dropSql, (err) => {
            if (err) {
              console.log(`⚠️  Error eliminando ${procedure.name}:`, err.message);
            }
            resolve();
          });
        });
        
        // Luego crear el nuevo procedimiento
        await new Promise((resolve, reject) => {
          connection.query(procedure.createSql, (err) => {
            if (err) {
              console.log(`⚠️  Error creando ${procedure.name}:`, err.message);
              reject(err);
            } else {
              console.log(`✅ Procedimiento ${procedure.name} instalado correctamente`);
              resolve();
            }
          });
        });
      } catch (error) {
        console.log(`❌ Error instalando ${procedure.name}:`, error.message);
      }
    }
    
    console.log('\n🎉 ¡Todos los procedimientos instalados exitosamente!');
    console.log('Ahora la API debería funcionar completamente.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    connection.end();
  }
}

installAllProcedures(); 