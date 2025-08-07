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
    
    // Procedimientos corregidos - uno por uno
    const procedures = [
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
    
    console.log('\n🎉 ¡Procedimientos corregidos exitosamente!');
    console.log('Ahora los formularios deberían funcionar correctamente.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    connection.end();
  }
}

fixStoredProcedures(); 