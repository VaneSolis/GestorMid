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

console.log('🔍 VERIFICANDO ESTRUCTURA DE TABLAS');
console.log('==================================');

function checkTables() {
  const connection = mysql.createConnection(dbConfig);
  
  connection.connect((err) => {
    if (err) {
      console.error('❌ Error de conexión:', err.message);
      return;
    }
    
    console.log('✅ Conexión establecida');
    
    const tables = ['clientes', 'productos', 'empleados', 'proveedores', 'ventas', 'compras'];
    
    tables.forEach((table, index) => {
      connection.query(`DESCRIBE ${table}`, (err, rows) => {
        if (err) {
          console.log(`❌ Error al describir ${table}: ${err.message}`);
        } else {
          console.log(`\n📋 Estructura de ${table}:`);
          rows.forEach(row => {
            console.log(`  - ${row.Field} (${row.Type}) ${row.Key ? `[${row.Key}]` : ''}`);
          });
        }
        
        // Si es la última tabla, verificar datos
        if (index === tables.length - 1) {
          setTimeout(() => {
            console.log('\n📊 Verificando datos en las tablas...');
            
            tables.forEach(table => {
              connection.query(`SELECT COUNT(*) as count FROM ${table}`, (err, rows) => {
                if (err) {
                  console.log(`❌ Error al contar ${table}: ${err.message}`);
                } else {
                  console.log(`✅ ${table}: ${rows[0].count} registros`);
                }
                
                // Si es la última tabla, cerrar conexión
                if (table === tables[tables.length - 1]) {
                  setTimeout(() => {
                    connection.end();
                    console.log('\n✅ Verificación completada');
                  }, 1000);
                }
              });
            });
          }, 1000);
        }
      });
    });
  });
}

checkTables(); 