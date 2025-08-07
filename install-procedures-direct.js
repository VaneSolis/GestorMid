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

console.log('🔧 INSTALANDO PROCEDIMIENTOS EN CLEVER CLOUD (DIRECTO)');
console.log('====================================================');
console.log('Host:', dbConfig.host);
console.log('Database:', dbConfig.database);
console.log('User:', dbConfig.user);

function installProcedures() {
  const connection = mysql.createConnection(dbConfig);
  
  connection.connect((err) => {
    if (err) {
      console.error('❌ Error de conexión:', err.message);
      return;
    }
    
    console.log('✅ Conexión establecida');
    
    // Procedimientos básicos
    const procedures = [
      // sp_mostrar_clientes
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_clientes()
       BEGIN
         SELECT * FROM clientes ORDER BY id;
       END`,
      
      // sp_insertar_cliente
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
      
      // sp_actualizar_cliente
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
      
      // sp_eliminar_cliente
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_cliente(IN p_id INT)
       BEGIN
         DELETE FROM clientes WHERE id = p_id;
       END`,
      
      // sp_obtener_cliente
      `CREATE PROCEDURE IF NOT EXISTS sp_obtener_cliente(IN p_id INT)
       BEGIN
         SELECT * FROM clientes WHERE id = p_id;
       END`,
      
      // sp_mostrar_productos
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_productos()
       BEGIN
         SELECT * FROM productos ORDER BY id;
       END`,
      
      // sp_insertar_producto
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
      
      // sp_actualizar_producto
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
      
      // sp_eliminar_producto
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_producto(IN p_id INT)
       BEGIN
         DELETE FROM productos WHERE id = p_id;
       END`,
      
      // sp_obtener_producto
      `CREATE PROCEDURE IF NOT EXISTS sp_obtener_producto(IN p_id INT)
       BEGIN
         SELECT * FROM productos WHERE id = p_id;
       END`,
      
      // sp_mostrar_empleados
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_empleados()
       BEGIN
         SELECT * FROM empleados ORDER BY id;
       END`,
      
      // sp_insertar_empleado
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
      
      // sp_actualizar_empleado
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
      
      // sp_eliminar_empleado
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_empleado(IN p_id INT)
       BEGIN
         DELETE FROM empleados WHERE id = p_id;
       END`,
      
      // sp_obtener_empleado
      `CREATE PROCEDURE IF NOT EXISTS sp_obtener_empleado(IN p_id INT)
       BEGIN
         SELECT * FROM empleados WHERE id = p_id;
       END`,
      
      // sp_mostrar_proveedores
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_proveedores()
       BEGIN
         SELECT * FROM proveedores ORDER BY id;
       END`,
      
      // sp_insertar_proveedor
      `CREATE PROCEDURE IF NOT EXISTS sp_insertar_proveedor(
         IN p_nombre VARCHAR(100),
         IN p_telefono VARCHAR(20),
         IN p_email VARCHAR(100),
         IN p_direccion TEXT,
         IN p_producto VARCHAR(100)
       )
       BEGIN
         INSERT INTO proveedores (nombre, telefono, email, direccion, producto) 
         VALUES (p_nombre, p_telefono, p_email, p_direccion, p_producto);
         SELECT LAST_INSERT_ID() as id;
       END`,
      
      // sp_actualizar_proveedor
      `CREATE PROCEDURE IF NOT EXISTS sp_actualizar_proveedor(
         IN p_id INT,
         IN p_nombre VARCHAR(100),
         IN p_telefono VARCHAR(20),
         IN p_email VARCHAR(100),
         IN p_direccion TEXT,
         IN p_producto VARCHAR(100)
       )
       BEGIN
         UPDATE proveedores 
         SET nombre = p_nombre, telefono = p_telefono, email = p_email, direccion = p_direccion, producto = p_producto
         WHERE id = p_id;
       END`,
      
      // sp_eliminar_proveedor
      `CREATE PROCEDURE IF NOT EXISTS sp_eliminar_proveedor(IN p_id INT)
       BEGIN
         DELETE FROM proveedores WHERE id = p_id;
       END`,
      
      // sp_mostrar_ventas
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_ventas()
       BEGIN
         SELECT * FROM ventas ORDER BY id;
       END`,
      
      // sp_mostrar_compras
      `CREATE PROCEDURE IF NOT EXISTS sp_mostrar_compras()
       BEGIN
         SELECT * FROM compras ORDER BY id;
       END`
    ];
    
    console.log('📝 Instalando', procedures.length, 'procedimientos...');
    
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
                  console.log('\n🎉 ¡Procedimientos instalados exitosamente en Clever Cloud!');
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

installProcedures(); 