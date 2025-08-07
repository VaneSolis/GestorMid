const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Configuración de la base de datos
const dbConfig = {
  host: process.env.MYSQL_ADDON_HOST || process.env.DB_HOST || '127.0.0.1',
  port: process.env.MYSQL_ADDON_PORT || process.env.DB_PORT || 3306,
  user: process.env.MYSQL_ADDON_USER || process.env.DB_USER || 'root',
  password: process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD || 'Mazerunner12',
  database: process.env.MYSQL_ADDON_DB || process.env.DB_NAME || 'tortillerialaherradurasolis'
};

async function setupStoredProcedures() {
  console.log('🔧 INSTALANDO PROCEDIMIENTOS ALMACENADOS');
  console.log('========================================');
  
  try {
    // Conectar a la base de datos
    console.log('🔗 Conectando a la base de datos...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión establecida correctamente');
    
    // Leer el archivo SQL de procedimientos almacenados
    const sqlFile = path.join(__dirname, 'database', 'stored-procedures.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Dividir el SQL en comandos individuales (por DELIMITER)
    const commands = sqlContent
      .split('DELIMITER')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);
    
    console.log(`\n📝 Instalando procedimientos almacenados...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Ejecutar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (command.trim() && !command.startsWith('//')) {
        try {
          await connection.execute(command);
          successCount++;
          console.log(`✅ Procedimiento ${i + 1} instalado correctamente`);
        } catch (error) {
          errorCount++;
          console.log(`⚠️  Procedimiento ${i + 1}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n📊 Resumen:`);
    console.log(`   - Procedimientos instalados: ${successCount}`);
    console.log(`   - Errores: ${errorCount}`);
    
    // Verificar que los procedimientos se crearon
    console.log('\n🔍 Verificando procedimientos almacenados...');
    const [procedures] = await connection.execute(`
      SELECT ROUTINE_NAME 
      FROM INFORMATION_SCHEMA.ROUTINES 
      WHERE ROUTINE_TYPE = 'PROCEDURE' 
      AND ROUTINE_SCHEMA = ?
    `, [dbConfig.database]);
    
    console.log('📊 Procedimientos encontrados:');
    procedures.forEach(proc => {
      console.log(`   - ${proc.ROUTINE_NAME}`);
    });
    
    await connection.end();
    console.log('\n🎉 ¡Procedimientos almacenados instalados exitosamente!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Prueba las rutas de la API');
    console.log('2. Verifica que los gestores funcionen correctamente');
    console.log('3. Prueba crear, editar y eliminar registros');
    
  } catch (error) {
    console.error('❌ Error al instalar procedimientos almacenados:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('SQL State:', error.sqlState);
  }
}

setupStoredProcedures(); 