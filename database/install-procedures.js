const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function installStoredProcedures() {
  try {
    console.log('🔧 Instalando procedimientos almacenados...');
    
    // Leer el archivo SQL
    const sqlFile = path.join(__dirname, 'stored-procedures.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Dividir el contenido en procedimientos individuales
    const procedures = sqlContent.split('DELIMITER //').filter(proc => proc.trim());
    
    let installedCount = 0;
    
    for (const procedure of procedures) {
      if (procedure.trim()) {
        try {
          // Extraer el nombre del procedimiento
          const nameMatch = procedure.match(/CREATE PROCEDURE (\w+)/);
          if (nameMatch) {
            const procName = nameMatch[1];
            console.log(`📦 Instalando: ${procName}`);
            
            // Ejecutar el procedimiento
            await pool.execute(procedure);
            installedCount++;
            console.log(`✅ ${procName} instalado correctamente`);
          }
        } catch (error) {
          if (error.message.includes('already exists')) {
            console.log(`⚠️  El procedimiento ya existe, omitiendo...`);
          } else {
            console.error(`❌ Error al instalar procedimiento: ${error.message}`);
          }
        }
      }
    }
    
    console.log(`\n🎉 Instalación completada: ${installedCount} procedimientos procesados`);
    
  } catch (error) {
    console.error('❌ Error durante la instalación:', error.message);
  } finally {
    await pool.end();
  }
}

// Ejecutar la instalación
installStoredProcedures(); 