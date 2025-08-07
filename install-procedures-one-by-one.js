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

console.log('🔧 INSTALANDO PROCEDIMIENTOS UNO POR UNO');
console.log('========================================');

function installProcedures() {
  const connection = mysql.createConnection(dbConfig);
  
  connection.connect((err) => {
    if (err) {
      console.error('❌ Error de conexión:', err.message);
      return;
    }
    
    console.log('✅ Conexión establecida');
    
    // Lista de procedimientos a instalar
    const procedures = [
      {
        name: 'sp_mostrar_clientes',
        sql: `CREATE PROCEDURE sp_mostrar_clientes()
               BEGIN
                 SELECT * FROM clientes ORDER BY id_cliente;
               END`
      },
      {
        name: 'sp_insertar_cliente',
        sql: `CREATE PROCEDURE sp_insertar_cliente(
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
               END`
      },
      {
        name: 'sp_obtener_cliente',
        sql: `CREATE PROCEDURE sp_obtener_cliente(IN p_id INT)
               BEGIN
                 SELECT * FROM clientes WHERE id_cliente = p_id;
               END`
      },
      {
        name: 'sp_mostrar_productos',
        sql: `CREATE PROCEDURE sp_mostrar_productos()
               BEGIN
                 SELECT * FROM productos ORDER BY id_producto;
               END`
      },
      {
        name: 'sp_insertar_producto',
        sql: `CREATE PROCEDURE sp_insertar_producto(
                 IN p_nombre VARCHAR(100),
                 IN p_precio DECIMAL(10,2),
                 IN p_stock INT,
                 IN p_descripcion TEXT
               )
               BEGIN
                 INSERT INTO productos (nombre_producto, precio, stock, descripcion) 
                 VALUES (p_nombre, p_precio, p_stock, p_descripcion);
                 SELECT LAST_INSERT_ID() as id;
               END`
      },
      {
        name: 'sp_obtener_producto',
        sql: `CREATE PROCEDURE sp_obtener_producto(IN p_id INT)
               BEGIN
                 SELECT * FROM productos WHERE id_producto = p_id;
               END`
      },
      {
        name: 'sp_mostrar_empleados',
        sql: `CREATE PROCEDURE sp_mostrar_empleados()
               BEGIN
                 SELECT * FROM empleados ORDER BY id_empleado;
               END`
      },
      {
        name: 'sp_insertar_empleado',
        sql: `CREATE PROCEDURE sp_insertar_empleado(
                 IN p_nombre VARCHAR(100),
                 IN p_puesto VARCHAR(50),
                 IN p_salario DECIMAL(10,2)
               )
               BEGIN
                 INSERT INTO empleados (nombre, puesto, salario) 
                 VALUES (p_nombre, p_puesto, p_salario);
                 SELECT LAST_INSERT_ID() as id;
               END`
      },
      {
        name: 'sp_obtener_empleado',
        sql: `CREATE PROCEDURE sp_obtener_empleado(IN p_id INT)
               BEGIN
                 SELECT * FROM empleados WHERE id_empleado = p_id;
               END`
      },
      {
        name: 'sp_mostrar_proveedores',
        sql: `CREATE PROCEDURE sp_mostrar_proveedores()
               BEGIN
                 SELECT * FROM proveedores ORDER BY id_proveedor;
               END`
      },
      {
        name: 'sp_insertar_proveedor',
        sql: `CREATE PROCEDURE sp_insertar_proveedor(
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
               END`
      },
      {
        name: 'sp_mostrar_ventas',
        sql: `CREATE PROCEDURE sp_mostrar_ventas()
               BEGIN
                 SELECT * FROM ventas ORDER BY id_venta;
               END`
      },
      {
        name: 'sp_mostrar_compras',
        sql: `CREATE PROCEDURE sp_mostrar_compras()
               BEGIN
                 SELECT * FROM compras ORDER BY id_compra;
               END`
      }
    ];
    
    console.log('📝 Instalando', procedures.length, 'procedimientos...');
    
    let installed = 0;
    let errors = 0;
    
    function installNext(index) {
      if (index >= procedures.length) {
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
              console.log('\n🎉 ¡Procedimientos instalados exitosamente!');
              connection.end();
            }
          });
        });
        return;
      }
      
      const proc = procedures[index];
      
      // Primero eliminar si existe
      connection.query(`DROP PROCEDURE IF EXISTS ${proc.name}`, (err) => {
        if (err) {
          console.log(`⚠️  Error al eliminar ${proc.name}: ${err.message}`);
        }
        
        // Luego crear
        connection.query(proc.sql, (err, result) => {
          if (err) {
            console.log(`❌ ${proc.name}: ${err.message}`);
            errors++;
          } else {
            console.log(`✅ ${proc.name} instalado`);
            installed++;
          }
          
          // Instalar el siguiente
          setTimeout(() => installNext(index + 1), 100);
        });
      });
    }
    
    // Empezar con el primer procedimiento
    installNext(0);
  });
}

installProcedures(); 