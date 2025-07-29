const mysql = require('mysql2/promise');

async function testMySQLConnection() {
  console.log('🔍 Probando conexión a MySQL...');
  
  const configs = [
    {
      name: 'Sin contraseña',
      config: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'tortillerialaherradurasolis'
      }
    },
    {
      name: 'Con contraseña común',
      config: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'tortillerialaherradurasolis'
      }
    },
    {
      name: 'Con contraseña Mazerunner12',
      config: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Mazerunner12',
        database: 'tortillerialaherradurasolis'
      }
    },
    {
      name: 'Sin base de datos específica (sin contraseña)',
      config: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: ''
      }
    }
  ];

  for (const test of configs) {
    console.log(`\n📋 Probando: ${test.name}`);
    try {
      const connection = await mysql.createConnection(test.config);
      console.log('✅ Conexión exitosa');
      
      if (test.config.database) {
        // Probar obtener tablas
        const [tables] = await connection.execute('SHOW TABLES');
        console.log(`📊 Tablas encontradas: ${tables.length}`);
        tables.forEach(table => {
          console.log(`   - ${Object.values(table)[0]}`);
        });
      } else {
        // Probar obtener bases de datos
        const [databases] = await connection.execute('SHOW DATABASES');
        console.log(`📊 Bases de datos encontradas: ${databases.length}`);
        databases.forEach(db => {
          console.log(`   - ${Object.values(db)[0]}`);
        });
      }
      
      await connection.end();
      
      // Si llegamos aquí, la conexión fue exitosa
      console.log('🎉 ¡Conexión exitosa! Usando configuración:', test.name);
      return test.config;
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n❌ No se pudo establecer conexión con ninguna configuración');
  console.log('💡 Por favor, verifica:');
  console.log('   1. Que MySQL esté ejecutándose');
  console.log('   2. Que la contraseña sea correcta');
  console.log('   3. Que el usuario root tenga permisos');
  return null;
}

testMySQLConnection().catch(console.error); 