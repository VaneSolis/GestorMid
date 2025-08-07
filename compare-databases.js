const mysql = require('mysql2');

// Configuración local
const localConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Mazerunner12',
  database: 'tortillerialaherradurasolis',
  charset: 'utf8mb4'
};

// Configuración Clever Cloud
const cleverConfig = {
  host: 'bmbomdrvxfmjayg1ob1t-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'u38jfxey6ydxpquj',
  password: 'G6OrgeuvwYB5CgquynZQ',
  database: 'bmbomdrvxfmjayg1ob1t',
  charset: 'utf8mb4'
};

console.log('🔍 COMPARANDO DATOS ENTRE BASES DE DATOS');
console.log('==========================================');

async function compareDatabases() {
  const localConnection = mysql.createConnection(localConfig);
  const cleverConnection = mysql.createConnection(cleverConfig);
  
  try {
    console.log('🔗 Conectando a ambas bases de datos...');
    
    await new Promise((resolve, reject) => {
      localConnection.connect((err) => {
        if (err) reject(err);
        else {
          cleverConnection.connect((err2) => {
            if (err2) reject(err2);
            else resolve();
          });
        }
      });
    });
    
    console.log('✅ Conexiones establecidas');
    
    const tables = ['clientes', 'productos', 'empleados', 'proveedores', 'ventas', 'compras'];
    
    for (const table of tables) {
      console.log(`\n📊 Tabla: ${table}`);
      console.log('─'.repeat(50));
      
      // Datos locales
      const localData = await new Promise((resolve, reject) => {
        localConnection.query(`SELECT * FROM ${table} LIMIT 5`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      
      // Datos Clever Cloud
      const cleverData = await new Promise((resolve, reject) => {
        cleverConnection.query(`SELECT * FROM ${table} LIMIT 5`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      
      console.log(`📁 LOCAL (${localData.length} registros):`);
      localData.forEach((row, i) => {
        console.log(`  ${i + 1}.`, JSON.stringify(row, null, 2));
      });
      
      console.log(`☁️  CLEVER CLOUD (${cleverData.length} registros):`);
      cleverData.forEach((row, i) => {
        console.log(`  ${i + 1}.`, JSON.stringify(row, null, 2));
      });
    }
    
    console.log('\n🎯 CONCLUSIÓN:');
    console.log('La API está mostrando los datos de Clever Cloud, no los de tu base local.');
    console.log('Para usar tus datos originales, necesitamos sincronizar la base de Clever Cloud.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    localConnection.end();
    cleverConnection.end();
  }
}

compareDatabases(); 