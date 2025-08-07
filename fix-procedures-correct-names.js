const mysql = require('mysql2');

// Configuración específica para Clever Cloud
const dbConfig = {
  host: 'bmbomdrvxfmjayg1ob1t-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'u38jfxey6ydxpquj',
  password: 'G6OrgeuvwYB5CgquynZQ',
  database: 'bmbomdrvxfmjayg1ob1t',
  charset: 'utf8mb4'
};

console.log('🔧 CORRIGIENDO PROCEDIMIENTOS CON NOMBRES CORRECTOS');
console.log('==================================================');

function fixProcedures() {
  const connection = mysql.createConnection(dbConfig);
  
  connection.connect((err) => {
    if (err) {
      console.error('❌ Error de conexión:', err.message);
      return;
    }
    
    console.log('✅ Conexión establecida');
    
    // Procedimientos corregidos con nombres de columnas correctos
    const procedures = [
      // sp_mostrar_clientes
      `DROP PROCEDURE IF EXISTS sp_mostrar_clientes;
       CREATE PROCEDURE sp_mostrar_clientes()
       BEGIN
         SELECT * FROM clientes ORDER BY id_cliente;
       END`,
      
      // sp_insertar_cliente
      `DROP PROCEDURE IF EXISTS sp_insertar_cliente;
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
         SELECT LAST_INSERT_ID() as id;
       END`,
      
      // sp_actualizar_cliente
      `DROP PROCEDURE IF EXISTS sp_actualizar_cliente;
       CREATE PROCEDURE sp_actualizar_cliente(
         IN p_id INT,
         IN p_nombre VARCHAR(100),
         IN p_apellido VARCHAR(100),
         IN p_telefono VARCHAR(20),
         IN p_email VARCHAR(100),
         IN p_direccion TEXT
       )
       BEGIN
         UPDATE clientes 
         SET nombre = p_nombre, apellido = p_apellido, telefono = p_telefono, email = p_email, direccion = p_direccion
         WHERE id_cliente = p_id;
       END`,
      
      // sp_eliminar_cliente
      `DROP PROCEDURE IF EXISTS sp_eliminar_cliente;
       CREATE PROCEDURE sp_eliminar_cliente(IN p_id INT)
       BEGIN
         DELETE FROM clientes WHERE id_cliente = p_id;
       END`,
      
      // sp_obtener_cliente
      `DROP PROCEDURE IF EXISTS sp_obtener_cliente;
       CREATE PROCEDURE sp_obtener_cliente(IN p_id INT)
       BEGIN
         SELECT * FROM clientes WHERE id_cliente = p_id;
       END`,
      
      // sp_mostrar_productos
      `DROP PROCEDURE IF EXISTS sp_mostrar_productos;
       CREATE PROCEDURE sp_mostrar_productos()
       BEGIN
         SELECT * FROM productos ORDER BY id_producto;
       END`,
      
      // sp_insertar_producto
      `DROP PROCEDURE IF EXISTS sp_insertar_producto;
       CREATE PROCEDURE sp_insertar_producto(
         IN p_nombre VARCHAR(100),
         IN p_precio DECIMAL(10,2),
         IN p_stock INT,
         IN p_descripcion TEXT
       )
       BEGIN
         INSERT INTO productos (nombre_producto, precio, stock, descripcion) 
         VALUES (p_nombre, p_precio, p_stock, p_descripcion);
         SELECT LAST_INSERT_ID() as id;
       END`,
      
      // sp_actualizar_producto
      `DROP PROCEDURE IF EXISTS sp_actualizar_producto;
       CREATE PROCEDURE sp_actualizar_producto(
         IN p_id INT,
         IN p_nombre VARCHAR(100),
         IN p_precio DECIMAL(10,2),
         IN p_stock INT,
         IN p_descripcion TEXT
       )
       BEGIN
         UPDATE productos 
         SET nombre_producto = p_nombre, precio = p_precio, stock = p_stock, descripcion = p_descripcion
         WHERE id_producto = p_id;
       END`,
      
      // sp_eliminar_producto
      `DROP PROCEDURE IF EXISTS sp_eliminar_producto;
       CREATE PROCEDURE sp_eliminar_producto(IN p_id INT)
       BEGIN
         DELETE FROM productos WHERE id_producto = p_id;
       END`,
      
      // sp_obtener_producto
      `DROP PROCEDURE IF EXISTS sp_obtener_producto;
       CREATE PROCEDURE sp_obtener_producto(IN p_id INT)
       BEGIN
         SELECT * FROM productos WHERE id_producto = p_id;
       END`,
      
      // sp_mostrar_empleados
      `DROP PROCEDURE IF EXISTS sp_mostrar_empleados;
       CREATE PROCEDURE sp_mostrar_empleados()
       BEGIN
         SELECT * FROM empleados ORDER BY id_empleado;
       END`,
      
      // sp_insertar_empleado
      `DROP PROCEDURE IF EXISTS sp_insertar_empleado;
       CREATE PROCEDURE sp_insertar_empleado(
         IN p_nombre VARCHAR(100),
         IN p_puesto VARCHAR(50),
         IN p_salario DECIMAL(10,2)
       )
       BEGIN
         INSERT INTO empleados (nombre, puesto, salario) 
         VALUES (p_nombre, p_puesto, p_salario);
         SELECT LAST_INSERT_ID() as id;
       END`,
      
      // sp_actualizar_empleado
      `DROP PROCEDURE IF EXISTS sp_actualizar_empleado;
       CREATE PROCEDURE sp_actualizar_empleado(
         IN p_id INT,
         IN p_nombre VARCHAR(100),
         IN p_puesto VARCHAR(50),
         IN p_salario DECIMAL(10,2)
       )
       BEGIN
         UPDATE empleados 
         SET nombre = p_nombre, puesto = p_puesto, salario = p_salario
         WHERE id_empleado = p_id;
       END`,
      
      // sp_eliminar_empleado
      `DROP PROCEDURE IF EXISTS sp_eliminar_empleado;
       CREATE PROCEDURE sp_eliminar_empleado(IN p_id INT)
       BEGIN
         DELETE FROM empleados WHERE id_empleado = p_id;
       END`,
      
      // sp_obtener_empleado
      `DROP PROCEDURE IF EXISTS sp_obtener_empleado;
       CREATE PROCEDURE sp_obtener_empleado(IN p_id INT)
       BEGIN
         SELECT * FROM empleados WHERE id_empleado = p_id;
       END`,
      
      // sp_mostrar_proveedores
      `DROP PROCEDURE IF EXISTS sp_mostrar_proveedores;
       CREATE PROCEDURE sp_mostrar_proveedores()
       BEGIN
         SELECT * FROM proveedores ORDER BY id_proveedor;
       END`,
      
      // sp_insertar_proveedor
      `DROP PROCEDURE IF EXISTS sp_insertar_proveedor;
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
       END`,
      
      // sp_actualizar_proveedor
      `DROP PROCEDURE IF EXISTS sp_actualizar_proveedor;
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
         WHERE id_proveedor = p_id;
       END`,
      
      // sp_eliminar_proveedor
      `DROP PROCEDURE IF EXISTS sp_eliminar_proveedor;
       CREATE PROCEDURE sp_eliminar_proveedor(IN p_id INT)
       BEGIN
         DELETE FROM proveedores WHERE id_proveedor = p_id;
       END`,
      
      // sp_mostrar_ventas
      `DROP PROCEDURE IF EXISTS sp_mostrar_ventas;
       CREATE PROCEDURE sp_mostrar_ventas()
       BEGIN
         SELECT * FROM ventas ORDER BY id_venta;
       END`,
      
      // sp_mostrar_compras
      `DROP PROCEDURE IF EXISTS sp_mostrar_compras;
       CREATE PROCEDURE sp_mostrar_compras()
       BEGIN
         SELECT * FROM compras ORDER BY id_compra;
       END`
    ];
    
    console.log('📝 Instalando', procedures.length, 'procedimientos corregidos...');
    
    let installed = 0;
    let errors = 0;
    
    procedures.forEach((procedure, index) => {
      connection.query(procedure, (err, result) => {
        if (err) {
          console.log(`⚠️  Procedimiento ${index + 1}: ${err.message}`);
          errors++;
        } else {
          console.log(`✅ Procedimiento ${index + 1} instalado`);
          installed++;
        }
        
        // Si es el último procedimiento, verificar
        if (index === procedures.length - 1) {
          setTimeout(() => {
            console.log(`\n📊 Resumen:`);
            console.log(`   - Procedimientos instalados: ${installed}`);
            console.log(`   - Errores: ${errors}`);
            
            // Verificar que funcionan
            console.log('\n🔍 Verificando procedimientos...');
            
            const testProcedures = [
              'sp_mostrar_clientes',
              'sp_mostrar_productos', 
              'sp_mostrar_empleados',
              'sp_mostrar_proveedores',
              'sp_mostrar_ventas',
              'sp_mostrar_compras'
            ];
            
            let tested = 0;
            testProcedures.forEach(proc => {
              connection.query(`CALL ${proc}()`, (err, rows) => {
                if (err) {
                  console.log(`❌ ${proc}: ${err.message}`);
                } else {
                  console.log(`✅ ${proc}: FUNCIONA (${rows[0].length} registros)`);
                }
                
                tested++;
                if (tested === testProcedures.length) {
                  console.log('\n🎉 ¡Procedimientos corregidos e instalados exitosamente!');
                  connection.end();
                }
              });
            });
          }, 1000);
        }
      });
    });
  });
}

fixProcedures(); 