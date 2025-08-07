const { pool } = require('./config/database');

async function debugProcedures() {
  try {
    console.log('🔍 DEBUGGING PROCEDIMIENTOS ALMACENADOS');
    console.log('=====================================');
    
    // 1. Verificar conexión
    console.log('1. Probando conexión...');
    const connection = await pool.getConnection();
    console.log('✅ Conexión establecida');
    
    // 2. Verificar base de datos actual
    const [dbResult] = await connection.execute('SELECT DATABASE() as current_db');
    console.log('📊 Base de datos actual:', dbResult[0].current_db);
    
    // 3. Listar todos los procedimientos almacenados
    console.log('\n2. Listando procedimientos almacenados...');
    const [procedures] = await connection.execute(`
      SELECT 
        ROUTINE_NAME,
        ROUTINE_SCHEMA,
        ROUTINE_TYPE
      FROM INFORMATION_SCHEMA.ROUTINES 
      WHERE ROUTINE_TYPE = 'PROCEDURE' 
      AND ROUTINE_SCHEMA = ?
      ORDER BY ROUTINE_NAME
    `, [dbResult[0].current_db]);
    
    console.log('📋 Procedimientos encontrados:');
    procedures.forEach(proc => {
      console.log(`  - ${proc.ROUTINE_NAME} (${proc.ROUTINE_SCHEMA})`);
    });
    
    // 4. Probar llamada directa a sp_mostrar_clientes
    console.log('\n3. Probando sp_mostrar_clientes...');
    try {
      const [clientes] = await connection.execute('CALL sp_mostrar_clientes()');
      console.log('✅ sp_mostrar_clientes funciona correctamente');
      console.log('📊 Registros encontrados:', clientes[0].length);
    } catch (error) {
      console.log('❌ Error al llamar sp_mostrar_clientes:', error.message);
      
      // Intentar con el nombre completo
      try {
        const [clientes] = await connection.execute(`CALL ${dbResult[0].current_db}.sp_mostrar_clientes()`);
        console.log('✅ sp_mostrar_clientes funciona con nombre completo');
        console.log('📊 Registros encontrados:', clientes[0].length);
      } catch (error2) {
        console.log('❌ Error con nombre completo:', error2.message);
      }
    }
    
    // 5. Verificar configuración del pool
    console.log('\n4. Configuración del pool:');
    console.log('Host:', pool.config.host);
    console.log('Database:', pool.config.database);
    console.log('User:', pool.config.user);
    
    connection.release();
    console.log('\n✅ Debug completado');
    
  } catch (error) {
    console.error('❌ Error en debug:', error.message);
  } finally {
    process.exit(0);
  }
}

debugProcedures(); 