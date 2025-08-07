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

console.log('✅ VERIFICANDO SINCRONIZACIÓN');
console.log('=============================');

async function verifySync() {
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
    
    const tables = ['clientes', 'productos', 'empleados', 'proveedores', 'ventas', 'compras'];
    
    for (const table of tables) {
      console.log(`\n📊 Tabla: ${table}`);
      console.log('─'.repeat(40));
      
      // Contar registros
      const countResult = await new Promise((resolve, reject) => {
        connection.query(`SELECT COUNT(*) as count FROM ${table}`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows[0].count);
        });
      });
      
      console.log(`📈 Total de registros: ${countResult}`);
      
      // Mostrar algunos ejemplos
      const sampleData = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} LIMIT 3`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      
      console.log('📋 Ejemplos de datos:');
      sampleData.forEach((row, i) => {
        console.log(`  ${i + 1}.`, JSON.stringify(row, null, 2));
      });
    }
    
    console.log('\n🎉 ¡Verificación completada!');
    console.log('Ahora prueba la API en Postman para ver tus datos originales.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    connection.end();
  }
}

verifySync(); 