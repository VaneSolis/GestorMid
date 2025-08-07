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

async function setupDatabase() {
  console.log('🔧 CONFIGURANDO BASE DE DATOS EN CLEVER CLOUD');
  console.log('=============================================');
  
  console.log('📋 Configuración de conexión:');
  console.log('Host:', dbConfig.host);
  console.log('Puerto:', dbConfig.port);
  console.log('Usuario:', dbConfig.user);
  console.log('Base de datos:', dbConfig.database);
  console.log('Contraseña:', dbConfig.password ? '***DEFINIDA***' : 'NO DEFINIDA');
  
  try {
    // Conectar a la base de datos
    console.log('\n🔗 Conectando a la base de datos...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión establecida correctamente');
    
    // Leer el archivo SQL
    const sqlFile = path.join(__dirname, 'database', 'create-tables-clever-cloud.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Dividir el SQL en comandos individuales
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);
    
    console.log(`\n📝 Ejecutando ${commands.length} comandos SQL...`);
    
    // Ejecutar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (command.trim()) {
        try {
          await connection.execute(command);
          console.log(`✅ Comando ${i + 1} ejecutado correctamente`);
        } catch (error) {
          console.log(`⚠️  Comando ${i + 1}: ${error.message}`);
        }
      }
    }
    
    // Verificar que las tablas se crearon
    console.log('\n🔍 Verificando tablas creadas...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📊 Tablas encontradas:');
    tables.forEach(table => {
      console.log(`   - ${Object.values(table)[0]}`);
    });
    
    // Verificar datos de ejemplo
    console.log('\n📊 Verificando datos de ejemplo...');
    const [clientes] = await connection.execute('SELECT COUNT(*) as total FROM clientes');
    const [productos] = await connection.execute('SELECT COUNT(*) as total FROM productos');
    const [empleados] = await connection.execute('SELECT COUNT(*) as total FROM empleados');
    const [proveedores] = await connection.execute('SELECT COUNT(*) as total FROM proveedores');
    
    console.log(`   - Clientes: ${clientes[0].total}`);
    console.log(`   - Productos: ${productos[0].total}`);
    console.log(`   - Empleados: ${empleados[0].total}`);
    console.log(`   - Proveedores: ${proveedores[0].total}`);
    
    await connection.end();
    console.log('\n🎉 ¡Base de datos configurada exitosamente!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Ejecuta el script de procedimientos almacenados');
    console.log('2. Prueba las rutas de la API');
    console.log('3. Verifica que los gestores funcionen correctamente');
    
  } catch (error) {
    console.error('❌ Error al configurar la base de datos:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('SQL State:', error.sqlState);
  }
}

setupDatabase(); 