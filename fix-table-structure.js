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

console.log('🔧 CORRIGIENDO ESTRUCTURA DE TABLAS');
console.log('====================================');

async function fixTableStructure() {
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
    
    // Corregir estructura de tablas
    const tableFixes = [
      {
        name: 'clientes',
        sql: `
          ALTER TABLE clientes 
          ADD COLUMN IF NOT EXISTS id_cliente INT AUTO_INCREMENT PRIMARY KEY FIRST,
          MODIFY COLUMN nombre VARCHAR(100) NOT NULL,
          MODIFY COLUMN apellido VARCHAR(100) NOT NULL,
          MODIFY COLUMN telefono VARCHAR(20),
          MODIFY COLUMN email VARCHAR(100),
          MODIFY COLUMN direccion TEXT
        `
      },
      {
        name: 'productos',
        sql: `
          ALTER TABLE productos 
          ADD COLUMN IF NOT EXISTS id_producto INT AUTO_INCREMENT PRIMARY KEY FIRST,
          MODIFY COLUMN nombre_producto VARCHAR(100) NOT NULL,
          MODIFY COLUMN precio DECIMAL(10,2) NOT NULL,
          MODIFY COLUMN stock INT DEFAULT 0,
          MODIFY COLUMN descripcion TEXT,
          ADD COLUMN IF NOT EXISTS precio_unitario DECIMAL(10,2) AFTER nombre_producto,
          ADD COLUMN IF NOT EXISTS unidad_medida VARCHAR(50) AFTER precio_unitario,
          ADD COLUMN IF NOT EXISTS categoria VARCHAR(50) AFTER unidad_medida
        `
      },
      {
        name: 'empleados',
        sql: `
          ALTER TABLE empleados 
          ADD COLUMN IF NOT EXISTS id_empleado INT AUTO_INCREMENT PRIMARY KEY FIRST,
          MODIFY COLUMN nombre VARCHAR(100) NOT NULL,
          MODIFY COLUMN puesto VARCHAR(50) NOT NULL,
          MODIFY COLUMN salario DECIMAL(10,2) NOT NULL,
          ADD COLUMN IF NOT EXISTS fecha_contratacion DATE AFTER puesto,
          ADD COLUMN IF NOT EXISTS estatus VARCHAR(20) DEFAULT 'Activo' AFTER salario
        `
      },
      {
        name: 'proveedores',
        sql: `
          ALTER TABLE proveedores 
          ADD COLUMN IF NOT EXISTS id_proveedor INT AUTO_INCREMENT PRIMARY KEY FIRST,
          MODIFY COLUMN nombre VARCHAR(100) NOT NULL,
          MODIFY COLUMN contacto VARCHAR(100),
          MODIFY COLUMN telefono VARCHAR(20),
          MODIFY COLUMN email VARCHAR(100),
          MODIFY COLUMN direccion TEXT,
          ADD COLUMN IF NOT EXISTS producto_suministrado VARCHAR(100) AFTER contacto,
          ADD COLUMN IF NOT EXISTS frecuencia_entrega VARCHAR(50) AFTER producto_suministrado
        `
      },
      {
        name: 'ventas',
        sql: `
          ALTER TABLE ventas 
          ADD COLUMN IF NOT EXISTS id_venta INT AUTO_INCREMENT PRIMARY KEY FIRST,
          ADD COLUMN IF NOT EXISTS id_cliente INT AFTER id_venta,
          MODIFY COLUMN total DECIMAL(10,2) NOT NULL,
          MODIFY COLUMN fecha_venta DATE NOT NULL,
          ADD COLUMN IF NOT EXISTS metodo_pago VARCHAR(20) DEFAULT 'efectivo' AFTER total,
          ADD COLUMN IF NOT EXISTS id_empleado INT AFTER metodo_pago
        `
      },
      {
        name: 'compras',
        sql: `
          ALTER TABLE compras 
          ADD COLUMN IF NOT EXISTS id_compra INT AUTO_INCREMENT PRIMARY KEY FIRST,
          ADD COLUMN IF NOT EXISTS id_proveedor INT AFTER id_compra,
          MODIFY COLUMN producto VARCHAR(100),
          MODIFY COLUMN cantidad DECIMAL(10,2),
          MODIFY COLUMN costo_total DECIMAL(10,2) NOT NULL,
          MODIFY COLUMN fecha_compra DATE NOT NULL,
          ADD COLUMN IF NOT EXISTS total_compra DECIMAL(10,2) AFTER fecha_compra
        `
      }
    ];
    
    for (const tableFix of tableFixes) {
      console.log(`\n🔧 Corrigiendo tabla: ${tableFix.name}`);
      console.log('─'.repeat(40));
      
      try {
        await new Promise((resolve, reject) => {
          connection.query(tableFix.sql, (err) => {
            if (err) {
              console.log(`⚠️  Error en ${tableFix.name}:`, err.message);
              reject(err);
            } else {
              console.log(`✅ Tabla ${tableFix.name} corregida`);
              resolve();
            }
          });
        });
      } catch (error) {
        console.log(`❌ No se pudo corregir ${tableFix.name}`);
      }
    }
    
    console.log('\n📊 Verificando estructura final...');
    
    // Verificar estructura final
    const tables = ['clientes', 'productos', 'empleados', 'proveedores', 'ventas', 'compras'];
    
    for (const table of tables) {
      console.log(`\n📋 Estructura de ${table}:`);
      console.log('─'.repeat(30));
      
      const structure = await new Promise((resolve, reject) => {
        connection.query(`DESCRIBE ${table}`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      
      structure.forEach(row => {
        console.log(`  - ${row.Field} (${row.Type}) ${row.Key ? `[${row.Key}]` : ''}`);
      });
    }
    
    console.log('\n🎉 ¡Estructura de tablas corregida!');
    console.log('Ahora las tablas tienen todos los campos necesarios.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    connection.end();
  }
}

fixTableStructure(); 