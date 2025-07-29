const { pool } = require('../config/database');

async function installStoredProcedures() {
  try {
    console.log('🔧 Instalando procedimientos almacenados...');
    
    const procedures = [
      {
        name: 'sp_mostrar_clientes',
        sql: `
          CREATE PROCEDURE sp_mostrar_clientes()
          BEGIN
              SELECT * FROM clientes ORDER BY nombre;
          END
        `
      },
      {
        name: 'sp_insertar_cliente',
        sql: `
          CREATE PROCEDURE sp_insertar_cliente(
              IN p_nombre VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_direccion TEXT
          )
          BEGIN
              INSERT INTO clientes (nombre, telefono, email, direccion) 
              VALUES (p_nombre, p_telefono, p_email, p_direccion);
              SELECT LAST_INSERT_ID() as id;
          END
        `
      },
      {
        name: 'sp_actualizar_cliente',
        sql: `
          CREATE PROCEDURE sp_actualizar_cliente(
              IN p_id INT,
              IN p_nombre VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_direccion TEXT
          )
          BEGIN
              UPDATE clientes 
              SET nombre = p_nombre, telefono = p_telefono, email = p_email, direccion = p_direccion
              WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_eliminar_cliente',
        sql: `
          CREATE PROCEDURE sp_eliminar_cliente(IN p_id INT)
          BEGIN
              DELETE FROM clientes WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_obtener_cliente',
        sql: `
          CREATE PROCEDURE sp_obtener_cliente(IN p_id INT)
          BEGIN
              SELECT * FROM clientes WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_mostrar_productos',
        sql: `
          CREATE PROCEDURE sp_mostrar_productos()
          BEGIN
              SELECT * FROM productos ORDER BY nombre;
          END
        `
      },
      {
        name: 'sp_insertar_producto',
        sql: `
          CREATE PROCEDURE sp_insertar_producto(
              IN p_nombre VARCHAR(100),
              IN p_precio DECIMAL(10,2),
              IN p_stock INT,
              IN p_descripcion TEXT
          )
          BEGIN
              INSERT INTO productos (nombre, precio, stock, descripcion) 
              VALUES (p_nombre, p_precio, p_stock, p_descripcion);
              SELECT LAST_INSERT_ID() as id;
          END
        `
      },
      {
        name: 'sp_actualizar_producto',
        sql: `
          CREATE PROCEDURE sp_actualizar_producto(
              IN p_id INT,
              IN p_nombre VARCHAR(100),
              IN p_precio DECIMAL(10,2),
              IN p_stock INT,
              IN p_descripcion TEXT
          )
          BEGIN
              UPDATE productos 
              SET nombre = p_nombre, precio = p_precio, stock = p_stock, descripcion = p_descripcion
              WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_eliminar_producto',
        sql: `
          CREATE PROCEDURE sp_eliminar_producto(IN p_id INT)
          BEGIN
              DELETE FROM productos WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_obtener_producto',
        sql: `
          CREATE PROCEDURE sp_obtener_producto(IN p_id INT)
          BEGIN
              SELECT * FROM productos WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_mostrar_ventas',
        sql: `
          CREATE PROCEDURE sp_mostrar_ventas()
          BEGIN
              SELECT v.*, c.nombre as cliente_nombre 
              FROM ventas v 
              LEFT JOIN clientes c ON v.cliente_id = c.id 
              ORDER BY v.fecha DESC;
          END
        `
      },
      {
        name: 'sp_insertar_venta',
        sql: `
          CREATE PROCEDURE sp_insertar_venta(
              IN p_cliente_id INT,
              IN p_total DECIMAL(10,2),
              IN p_fecha DATE
          )
          BEGIN
              INSERT INTO ventas (cliente_id, total, fecha) 
              VALUES (p_cliente_id, p_total, p_fecha);
              SELECT LAST_INSERT_ID() as id;
          END
        `
      },
      {
        name: 'sp_insertar_detalle_venta',
        sql: `
          CREATE PROCEDURE sp_insertar_detalle_venta(
              IN p_venta_id INT,
              IN p_producto_id INT,
              IN p_cantidad INT,
              IN p_precio_unitario DECIMAL(10,2)
          )
          BEGIN
              INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario) 
              VALUES (p_venta_id, p_producto_id, p_cantidad, p_precio_unitario);
              
              UPDATE productos 
              SET stock = stock - p_cantidad 
              WHERE id = p_producto_id;
          END
        `
      },
      {
        name: 'sp_obtener_venta',
        sql: `
          CREATE PROCEDURE sp_obtener_venta(IN p_id INT)
          BEGIN
              SELECT v.*, c.nombre as cliente_nombre 
              FROM ventas v 
              LEFT JOIN clientes c ON v.cliente_id = c.id 
              WHERE v.id = p_id;
          END
        `
      },
      {
        name: 'sp_mostrar_empleados',
        sql: `
          CREATE PROCEDURE sp_mostrar_empleados()
          BEGIN
              SELECT * FROM empleados ORDER BY nombre;
          END
        `
      },
      {
        name: 'sp_insertar_empleado',
        sql: `
          CREATE PROCEDURE sp_insertar_empleado(
              IN p_nombre VARCHAR(100),
              IN p_cargo VARCHAR(50),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_salario DECIMAL(10,2)
          )
          BEGIN
              INSERT INTO empleados (nombre, cargo, telefono, email, salario) 
              VALUES (p_nombre, p_cargo, p_telefono, p_email, p_salario);
              SELECT LAST_INSERT_ID() as id;
          END
        `
      },
      {
        name: 'sp_actualizar_empleado',
        sql: `
          CREATE PROCEDURE sp_actualizar_empleado(
              IN p_id INT,
              IN p_nombre VARCHAR(100),
              IN p_cargo VARCHAR(50),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_salario DECIMAL(10,2)
          )
          BEGIN
              UPDATE empleados 
              SET nombre = p_nombre, cargo = p_cargo, telefono = p_telefono, email = p_email, salario = p_salario
              WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_eliminar_empleado',
        sql: `
          CREATE PROCEDURE sp_eliminar_empleado(IN p_id INT)
          BEGIN
              DELETE FROM empleados WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_mostrar_proveedores',
        sql: `
          CREATE PROCEDURE sp_mostrar_proveedores()
          BEGIN
              SELECT * FROM proveedores ORDER BY nombre;
          END
        `
      },
      {
        name: 'sp_insertar_proveedor',
        sql: `
          CREATE PROCEDURE sp_insertar_proveedor(
              IN p_nombre VARCHAR(100),
              IN p_contacto VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_direccion TEXT
          )
          BEGIN
              INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) 
              VALUES (p_nombre, p_contacto, p_telefono, p_email, p_direccion);
              SELECT LAST_INSERT_ID() as id;
          END
        `
      },
      {
        name: 'sp_actualizar_proveedor',
        sql: `
          CREATE PROCEDURE sp_actualizar_proveedor(
              IN p_id INT,
              IN p_nombre VARCHAR(100),
              IN p_contacto VARCHAR(100),
              IN p_telefono VARCHAR(20),
              IN p_email VARCHAR(100),
              IN p_direccion TEXT
          )
          BEGIN
              UPDATE proveedores 
              SET nombre = p_nombre, contacto = p_contacto, telefono = p_telefono, email = p_email, direccion = p_direccion
              WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_eliminar_proveedor',
        sql: `
          CREATE PROCEDURE sp_eliminar_proveedor(IN p_id INT)
          BEGIN
              DELETE FROM proveedores WHERE id = p_id;
          END
        `
      },
      {
        name: 'sp_mostrar_compras',
        sql: `
          CREATE PROCEDURE sp_mostrar_compras()
          BEGIN
              SELECT c.*, p.nombre as proveedor_nombre 
              FROM compras c 
              LEFT JOIN proveedores p ON c.proveedor_id = p.id 
              ORDER BY c.fecha DESC;
          END
        `
      },
      {
        name: 'sp_insertar_compra',
        sql: `
          CREATE PROCEDURE sp_insertar_compra(
              IN p_proveedor_id INT,
              IN p_total DECIMAL(10,2),
              IN p_fecha DATE
          )
          BEGIN
              INSERT INTO compras (proveedor_id, total, fecha) 
              VALUES (p_proveedor_id, p_total, p_fecha);
              SELECT LAST_INSERT_ID() as id;
          END
        `
      },
      {
        name: 'sp_insertar_detalle_compra',
        sql: `
          CREATE PROCEDURE sp_insertar_detalle_compra(
              IN p_compra_id INT,
              IN p_producto_id INT,
              IN p_cantidad INT,
              IN p_precio_unitario DECIMAL(10,2)
          )
          BEGIN
              INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario) 
              VALUES (p_compra_id, p_producto_id, p_cantidad, p_precio_unitario);
              
              UPDATE productos 
              SET stock = stock + p_cantidad 
              WHERE id = p_producto_id;
          END
        `
      }
    ];
    
    let installedCount = 0;
    
    for (const procedure of procedures) {
      try {
        console.log(`📦 Instalando: ${procedure.name}`);
        
        // Eliminar procedimiento si existe
        try {
          await pool.execute(`DROP PROCEDURE IF EXISTS ${procedure.name}`);
        } catch (error) {
          // Ignorar errores si no existe
        }
        
        // Crear el procedimiento
        await pool.execute(procedure.sql);
        installedCount++;
        console.log(`✅ ${procedure.name} instalado correctamente`);
        
      } catch (error) {
        console.error(`❌ Error al instalar ${procedure.name}: ${error.message}`);
      }
    }
    
    console.log(`\n🎉 Instalación completada: ${installedCount} procedimientos instalados`);
    
  } catch (error) {
    console.error('❌ Error durante la instalación:', error.message);
  } finally {
    await pool.end();
  }
}

// Ejecutar la instalación
installStoredProcedures(); 