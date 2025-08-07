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

console.log('➕ AGREGANDO CAMPOS FALTANTES');
console.log('=============================');

async function addMissingFields() {
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
    
    // Agregar campos faltantes
    const fieldAdditions = [
      {
        table: 'productos',
        fields: [
          'ADD COLUMN precio_unitario DECIMAL(10,2) AFTER nombre_producto',
          'ADD COLUMN unidad_medida VARCHAR(50) AFTER precio_unitario',
          'ADD COLUMN categoria VARCHAR(50) AFTER unidad_medida'
        ]
      },
      {
        table: 'empleados',
        fields: [
          'ADD COLUMN fecha_contratacion DATE AFTER puesto',
          'ADD COLUMN estatus VARCHAR(20) DEFAULT "Activo" AFTER salario'
        ]
      },
      {
        table: 'proveedores',
        fields: [
          'ADD COLUMN producto_suministrado VARCHAR(100) AFTER contacto',
          'ADD COLUMN frecuencia_entrega VARCHAR(50) AFTER producto_suministrado'
        ]
      },
      {
        table: 'ventas',
        fields: [
          'ADD COLUMN metodo_pago VARCHAR(20) DEFAULT "efectivo" AFTER total',
          'ADD COLUMN id_empleado INT AFTER metodo_pago'
        ]
      },
      {
        table: 'compras',
        fields: [
          'ADD COLUMN total_compra DECIMAL(10,2) AFTER fecha_compra'
        ]
      }
    ];
    
    for (const addition of fieldAdditions) {
      console.log(`\n🔧 Agregando campos a: ${addition.table}`);
      console.log('─'.repeat(40));
      
      for (const field of addition.fields) {
        try {
          await new Promise((resolve, reject) => {
            connection.query(`ALTER TABLE ${addition.table} ${field}`, (err) => {
              if (err) {
                if (err.message.includes('Duplicate column name')) {
                  console.log(`✅ Campo ya existe en ${addition.table}`);
                } else {
                  console.log(`⚠️  Error: ${err.message}`);
                }
                reject(err);
              } else {
                console.log(`✅ Campo agregado a ${addition.table}`);
                resolve();
              }
            });
          });
        } catch (error) {
          // Continuar con el siguiente campo
        }
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
    
    console.log('\n🎉 ¡Campos agregados exitosamente!');
    console.log('Ahora las tablas tienen todos los campos necesarios.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    connection.end();
  }
}

addMissingFields(); 