const mysql = require('mysql2/promise');

// Configuración de la base de datos
const dbConfig = {
  host: process.env.MYSQL_ADDON_HOST || process.env.DB_HOST || '127.0.0.1',
  port: process.env.MYSQL_ADDON_PORT || process.env.DB_PORT || 3306,
  user: process.env.MYSQL_ADDON_USER || process.env.DB_USER || 'root',
  password: process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD || 'Mazerunner12',
  database: process.env.MYSQL_ADDON_DB || process.env.DB_NAME || 'tortillerialaherradurasolis'
};

async function installBasicProcedures() {
  console.log('🔧 INSTALANDO PROCEDIMIENTOS BÁSICOS');
  console.log('=====================================');
  
  try {
    // Conectar a la base de datos
    console.log('🔗 Conectando a la base de datos...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión establecida correctamente');
    
    // Procedimientos básicos necesarios
    const procedures = [
      // Procedimientos para CLIENTES
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_clientes()
       BEGIN
           SELECT * FROM clientes ORDER BY nombre;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_cliente(
           IN p_nombre VARCHAR(100),
           IN p_telefono VARCHAR(20),
           IN p_email VARCHAR(100),
           IN p_direccion TEXT
       )
       BEGIN
           INSERT INTO clientes (nombre, telefono, email, direccion) 
           VALUES (p_nombre, p_telefono, p_email, p_direccion);
           SELECT LAST_INSERT_ID() as id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_actualizar_cliente(
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
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_cliente(IN p_id INT)
       BEGIN
           DELETE FROM clientes WHERE id = p_id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_obtener_cliente(IN p_id INT)
       BEGIN
           SELECT * FROM clientes WHERE id = p_id;
       END`,
      
      // Procedimientos para PRODUCTOS
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_productos()
       BEGIN
           SELECT * FROM productos ORDER BY nombre;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_producto(
           IN p_nombre VARCHAR(100),
           IN p_precio DECIMAL(10,2),
           IN p_stock INT,
           IN p_descripcion TEXT
       )
       BEGIN
           INSERT INTO productos (nombre, precio, stock, descripcion) 
           VALUES (p_nombre, p_precio, p_stock, p_descripcion);
           SELECT LAST_INSERT_ID() as id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_actualizar_producto(
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
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_producto(IN p_id INT)
       BEGIN
           DELETE FROM productos WHERE id = p_id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_obtener_producto(IN p_id INT)
       BEGIN
           SELECT * FROM productos WHERE id = p_id;
       END`,
      
      // Procedimientos para EMPLEADOS
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_empleados()
       BEGIN
           SELECT * FROM empleados ORDER BY nombre;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_empleado(
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
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_actualizar_empleado(
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
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_empleado(IN p_id INT)
       BEGIN
           DELETE FROM empleados WHERE id = p_id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_obtener_empleado(IN p_id INT)
       BEGIN
           SELECT * FROM empleados WHERE id = p_id;
       END`,
      
      // Procedimientos para PROVEEDORES
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_proveedores()
       BEGIN
           SELECT id_proveedor as id, nombre, telefono, producto_suministrado, frecuencia_entrega 
           FROM proveedores ORDER BY nombre;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_proveedor(
           IN p_nombre VARCHAR(100),
           IN p_telefono VARCHAR(20),
           IN p_producto_suministrado VARCHAR(100),
           IN p_frecuencia_entrega VARCHAR(50)
       )
       BEGIN
           INSERT INTO proveedores (nombre, telefono, producto_suministrado, frecuencia_entrega) 
           VALUES (p_nombre, p_telefono, p_producto_suministrado, p_frecuencia_entrega);
           SELECT LAST_INSERT_ID() as id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_actualizar_proveedor(
           IN p_id INT,
           IN p_nombre VARCHAR(100),
           IN p_telefono VARCHAR(20),
           IN p_producto_suministrado VARCHAR(100),
           IN p_frecuencia_entrega VARCHAR(50)
       )
       BEGIN
           UPDATE proveedores 
           SET nombre = p_nombre, telefono = p_telefono, producto_suministrado = p_producto_suministrado, frecuencia_entrega = p_frecuencia_entrega
           WHERE id_proveedor = p_id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_proveedor(IN p_id INT)
       BEGIN
           DELETE FROM proveedores WHERE id_proveedor = p_id;
       END`,
      
      // Procedimientos para VENTAS
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_ventas()
       BEGIN
           SELECT v.*, c.nombre as cliente_nombre 
           FROM ventas v 
           LEFT JOIN clientes c ON v.cliente_id = c.id 
           ORDER BY v.fecha DESC;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_venta(
           IN p_cliente_id INT,
           IN p_total DECIMAL(10,2),
           IN p_fecha DATE
       )
       BEGIN
           INSERT INTO ventas (cliente_id, total, fecha) 
           VALUES (p_cliente_id, p_total, p_fecha);
           SELECT LAST_INSERT_ID() as id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_detalle_venta(
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
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_obtener_venta(IN p_id INT)
       BEGIN
           SELECT v.*, c.nombre as cliente_nombre 
           FROM ventas v 
           LEFT JOIN clientes c ON v.cliente_id = c.id 
           WHERE v.id = p_id;
       END`,
      
      // Procedimientos para COMPRAS
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_compras()
       BEGIN
           SELECT c.*, p.nombre as proveedor_nombre 
           FROM compras c 
           LEFT JOIN proveedores p ON c.proveedor_id = p.id 
           ORDER BY c.fecha DESC;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_compra(
           IN p_proveedor_id INT,
           IN p_total DECIMAL(10,2),
           IN p_fecha DATE
       )
       BEGIN
           INSERT INTO compras (proveedor_id, total, fecha) 
           VALUES (p_proveedor_id, p_total, p_fecha);
           SELECT LAST_INSERT_ID() as id;
       END`,
      
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_detalle_compra(
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
       END`
    ];
    
    console.log(`\n📝 Instalando ${procedures.length} procedimientos básicos...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Ejecutar cada procedimiento
    for (let i = 0; i < procedures.length; i++) {
      const procedure = procedures[i];
      try {
        await connection.execute(procedure);
        successCount++;
        console.log(`✅ Procedimiento ${i + 1} instalado correctamente`);
      } catch (error) {
        errorCount++;
        console.log(`⚠️  Procedimiento ${i + 1}: ${error.message}`);
      }
    }
    
    console.log(`\n📊 Resumen:`);
    console.log(`   - Procedimientos instalados: ${successCount}`);
    console.log(`   - Errores: ${errorCount}`);
    
    // Verificar procedimientos críticos
    console.log('\n🔍 Verificando procedimientos críticos...');
    const criticalProcedures = [
      'sp_mostrar_clientes',
      'sp_mostrar_productos', 
      'sp_mostrar_empleados',
      'sp_mostrar_proveedores',
      'sp_mostrar_ventas',
      'sp_mostrar_compras'
    ];
    
    for (const procName of criticalProcedures) {
      try {
        const [result] = await connection.execute(`CALL ${procName}()`);
        console.log(`✅ ${procName}: FUNCIONA (${result.length} registros)`);
      } catch (error) {
        console.log(`❌ ${procName}: ${error.message}`);
      }
    }
    
    await connection.end();
    console.log('\n🎉 ¡Procedimientos básicos instalados exitosamente!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Prueba las rutas de la API');
    console.log('2. Verifica que los gestores funcionen correctamente');
    
  } catch (error) {
    console.error('❌ Error al instalar procedimientos básicos:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('SQL State:', error.sqlState);
  }
}

installBasicProcedures(); 