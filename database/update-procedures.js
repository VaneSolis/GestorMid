const mysql = require('mysql2');

async function updateStoredProcedures() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Mazerunner12',
    database: 'tortillerialaherradurasolis'
  });

  try {
    console.log('🔧 Actualizando procedimientos almacenados...');
    
    const procedures = [
      {
        name: 'sp_mostrar_clientes',
        sql: `CREATE PROCEDURE sp_mostrar_clientes() BEGIN SELECT id_cliente as id, CONCAT(nombre, ' ', apellido) as nombre, telefono, email, direccion FROM clientes ORDER BY nombre; END`
      },
      {
        name: 'sp_insertar_cliente',
        sql: `CREATE PROCEDURE sp_insertar_cliente(IN p_nombre VARCHAR(100), IN p_telefono VARCHAR(20), IN p_email VARCHAR(100), IN p_direccion TEXT) BEGIN INSERT INTO clientes (nombre, apellido, telefono, email, direccion) VALUES (p_nombre, '', p_telefono, p_email, p_direccion); SELECT LAST_INSERT_ID() as id; END`
      },
      {
        name: 'sp_actualizar_cliente',
        sql: `CREATE PROCEDURE sp_actualizar_cliente(IN p_id INT, IN p_nombre VARCHAR(100), IN p_telefono VARCHAR(20), IN p_email VARCHAR(100), IN p_direccion TEXT) BEGIN UPDATE clientes SET nombre = p_nombre, telefono = p_telefono, email = p_email, direccion = p_direccion WHERE id_cliente = p_id; END`
      },
      {
        name: 'sp_eliminar_cliente',
        sql: `CREATE PROCEDURE sp_eliminar_cliente(IN p_id INT) BEGIN DELETE FROM clientes WHERE id_cliente = p_id; END`
      },
      {
        name: 'sp_obtener_cliente',
        sql: `CREATE PROCEDURE sp_obtener_cliente(IN p_id INT) BEGIN SELECT id_cliente as id, CONCAT(nombre, ' ', apellido) as nombre, telefono, email, direccion FROM clientes WHERE id_cliente = p_id; END`
      },
      {
        name: 'sp_mostrar_productos',
        sql: `CREATE PROCEDURE sp_mostrar_productos() BEGIN SELECT id_producto as id, nombre_producto as nombre, precio_unitario as precio, 'N/A' as stock, categoria as descripcion FROM productos ORDER BY nombre_producto; END`
      },
      {
        name: 'sp_insertar_producto',
        sql: `CREATE PROCEDURE sp_insertar_producto(IN p_nombre VARCHAR(100), IN p_precio DECIMAL(10,2), IN p_stock INT, IN p_descripcion TEXT) BEGIN INSERT INTO productos (nombre_producto, precio_unitario, categoria) VALUES (p_nombre, p_precio, p_descripcion); SELECT LAST_INSERT_ID() as id; END`
      },
      {
        name: 'sp_actualizar_producto',
        sql: `CREATE PROCEDURE sp_actualizar_producto(IN p_id INT, IN p_nombre VARCHAR(100), IN p_precio DECIMAL(10,2), IN p_stock INT, IN p_descripcion TEXT) BEGIN UPDATE productos SET nombre_producto = p_nombre, precio_unitario = p_precio, categoria = p_descripcion WHERE id_producto = p_id; END`
      },
      {
        name: 'sp_eliminar_producto',
        sql: `CREATE PROCEDURE sp_eliminar_producto(IN p_id INT) BEGIN DELETE FROM productos WHERE id_producto = p_id; END`
      },
      {
        name: 'sp_obtener_producto',
        sql: `CREATE PROCEDURE sp_obtener_producto(IN p_id INT) BEGIN SELECT id_producto as id, nombre_producto as nombre, precio_unitario as precio, 'N/A' as stock, categoria as descripcion FROM productos WHERE id_producto = p_id; END`
      },
      {
        name: 'sp_mostrar_ventas',
        sql: `CREATE PROCEDURE sp_mostrar_ventas() BEGIN SELECT v.id_venta as id, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, v.total_venta as total, v.fecha_venta as fecha FROM ventas v LEFT JOIN clientes c ON v.id_cliente = c.id_cliente ORDER BY v.fecha_venta DESC; END`
      },
      {
        name: 'sp_insertar_venta',
        sql: `CREATE PROCEDURE sp_insertar_venta(IN p_cliente_id INT, IN p_total DECIMAL(10,2), IN p_fecha DATE) BEGIN INSERT INTO ventas (id_cliente, total_venta, fecha_venta) VALUES (p_cliente_id, p_total, p_fecha); SELECT LAST_INSERT_ID() as id; END`
      },
      {
        name: 'sp_obtener_venta',
        sql: `CREATE PROCEDURE sp_obtener_venta(IN p_id INT) BEGIN SELECT v.id_venta as id, CONCAT(c.nombre, ' ', c.apellido) as cliente_nombre, v.total_venta as total, v.fecha_venta as fecha FROM ventas v LEFT JOIN clientes c ON v.id_cliente = c.id_cliente WHERE v.id_venta = p_id; END`
      },
      {
        name: 'sp_mostrar_empleados',
        sql: `CREATE PROCEDURE sp_mostrar_empleados() BEGIN SELECT id_empleado as id, nombre, puesto as cargo, telefono, email, salario FROM empleados ORDER BY nombre; END`
      },
      {
        name: 'sp_insertar_empleado',
        sql: `CREATE PROCEDURE sp_insertar_empleado(IN p_nombre VARCHAR(100), IN p_cargo VARCHAR(50), IN p_telefono VARCHAR(20), IN p_email VARCHAR(100), IN p_salario DECIMAL(10,2)) BEGIN INSERT INTO empleados (nombre, puesto, salario) VALUES (p_nombre, p_cargo, p_salario); SELECT LAST_INSERT_ID() as id; END`
      },
      {
        name: 'sp_actualizar_empleado',
        sql: `CREATE PROCEDURE sp_actualizar_empleado(IN p_id INT, IN p_nombre VARCHAR(100), IN p_cargo VARCHAR(50), IN p_telefono VARCHAR(20), IN p_email VARCHAR(100), IN p_salario DECIMAL(10,2)) BEGIN UPDATE empleados SET nombre = p_nombre, puesto = p_cargo, salario = p_salario WHERE id_empleado = p_id; END`
      },
      {
        name: 'sp_eliminar_empleado',
        sql: `CREATE PROCEDURE sp_eliminar_empleado(IN p_id INT) BEGIN DELETE FROM empleados WHERE id_empleado = p_id; END`
      },
      {
        name: 'sp_mostrar_proveedores',
        sql: `CREATE PROCEDURE sp_mostrar_proveedores() BEGIN SELECT id_proveedor as id, nombre, producto_suministrado as contacto, telefono, 'N/A' as email, 'N/A' as direccion FROM proveedores ORDER BY nombre; END`
      },
      {
        name: 'sp_insertar_proveedor',
        sql: `CREATE PROCEDURE sp_insertar_proveedor(IN p_nombre VARCHAR(100), IN p_contacto VARCHAR(100), IN p_telefono VARCHAR(20), IN p_email VARCHAR(100), IN p_direccion TEXT) BEGIN INSERT INTO proveedores (nombre, producto_suministrado, telefono) VALUES (p_nombre, p_contacto, p_telefono); SELECT LAST_INSERT_ID() as id; END`
      },
      {
        name: 'sp_actualizar_proveedor',
        sql: `CREATE PROCEDURE sp_actualizar_proveedor(IN p_id INT, IN p_nombre VARCHAR(100), IN p_contacto VARCHAR(100), IN p_telefono VARCHAR(20), IN p_email VARCHAR(100), IN p_direccion TEXT) BEGIN UPDATE proveedores SET nombre = p_nombre, producto_suministrado = p_contacto, telefono = p_telefono WHERE id_proveedor = p_id; END`
      },
      {
        name: 'sp_eliminar_proveedor',
        sql: `CREATE PROCEDURE sp_eliminar_proveedor(IN p_id INT) BEGIN DELETE FROM proveedores WHERE id_proveedor = p_id; END`
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
        console.log(`📦 Actualizando: ${procedure.name}`);
        
        // Eliminar procedimiento si existe
        try {
          connection.query(`DROP PROCEDURE IF EXISTS ${procedure.name}`);
        } catch (error) {
          // Ignorar errores si no existe
        }
        
        // Crear el procedimiento
        connection.query(procedure.sql, (error, results) => {
          if (error) {
            console.error(`❌ Error al actualizar ${procedure.name}: ${error.message}`);
          } else {
            updatedCount++;
            console.log(`✅ ${procedure.name} actualizado correctamente`);
          }
        });
        
      } catch (error) {
        console.error(`❌ Error al actualizar ${procedure.name}: ${error.message}`);
      }
    }
    
    // Esperar un poco para que se completen las consultas
    setTimeout(() => {
      console.log(`\n🎉 Actualización completada: ${updatedCount} procedimientos actualizados`);
      connection.end();
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error durante la actualización:', error.message);
    connection.end();
  }
}

// Ejecutar la actualización
updateStoredProcedures(); 