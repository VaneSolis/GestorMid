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

console.log('🔄 SINCRONIZANDO DATOS LOCALES A CLEVER CLOUD');
console.log('==============================================');

async function syncData() {
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
    
    const tables = [
      { name: 'clientes', localId: 'id_cliente', cleverId: 'id_cliente' },
      { name: 'productos', localId: 'id_producto', cleverId: 'id_producto' },
      { name: 'empleados', localId: 'id_empleado', cleverId: 'id_empleado' },
      { name: 'proveedores', localId: 'id_proveedor', cleverId: 'id_proveedor' },
      { name: 'ventas', localId: 'id_venta', cleverId: 'id_venta' },
      { name: 'compras', localId: 'id_compra', cleverId: 'id_compra' }
    ];
    
    for (const table of tables) {
      console.log(`\n📊 Sincronizando tabla: ${table.name}`);
      console.log('─'.repeat(50));
      
      // Obtener datos locales
      const localData = await new Promise((resolve, reject) => {
        localConnection.query(`SELECT * FROM ${table.name}`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      
      console.log(`📁 Datos locales encontrados: ${localData.length} registros`);
      
      if (localData.length > 0) {
        // Limpiar tabla en Clever Cloud
        await new Promise((resolve, reject) => {
          cleverConnection.query(`DELETE FROM ${table.name}`, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        console.log(`🗑️  Tabla ${table.name} limpiada en Clever Cloud`);
        
        // Insertar datos locales en Clever Cloud
        let inserted = 0;
        for (const row of localData) {
          try {
            // Adaptar los datos según la estructura de Clever Cloud
            let adaptedRow = { ...row };
            
            // Adaptaciones específicas por tabla
            if (table.name === 'productos') {
              adaptedRow.precio = row.precio_unitario;
              adaptedRow.descripcion = row.categoria;
              delete adaptedRow.precio_unitario;
              delete adaptedRow.unidad_medida;
              delete adaptedRow.categoria;
            }
            
            if (table.name === 'empleados') {
              adaptedRow.puesto = row.puesto;
              delete adaptedRow.fecha_contratacion;
              delete adaptedRow.estatus;
            }
            
            if (table.name === 'proveedores') {
              adaptedRow.contacto = row.producto_suministrado;
              adaptedRow.direccion = row.frecuencia_entrega;
              delete adaptedRow.producto_suministrado;
              delete adaptedRow.frecuencia_entrega;
            }
            
            if (table.name === 'ventas') {
              adaptedRow.total = row.total;
              adaptedRow.fecha_venta = row.fecha_venta;
              delete adaptedRow.metodo_pago;
              delete adaptedRow.id_empleado;
            }
            
            if (table.name === 'compras') {
              adaptedRow.costo_total = row.total_compra;
              adaptedRow.fecha_compra = row.fecha_compra;
              adaptedRow.producto = 'Producto general';
              adaptedRow.cantidad = 1;
              delete adaptedRow.total_compra;
            }
            
            const columns = Object.keys(adaptedRow).join(', ');
            const values = Object.values(adaptedRow).map(val => 
              val === null ? 'NULL' : `'${String(val).replace(/'/g, "''")}'`
            ).join(', ');
            
            await new Promise((resolve, reject) => {
              cleverConnection.query(
                `INSERT INTO ${table.name} (${columns}) VALUES (${values})`,
                (err) => {
                  if (err) reject(err);
                  else {
                    inserted++;
                    resolve();
                  }
                }
              );
            });
          } catch (error) {
            console.log(`⚠️  Error al insertar registro en ${table.name}:`, error.message);
          }
        }
        
        console.log(`✅ ${inserted} registros insertados en ${table.name}`);
      }
    }
    
    console.log('\n🎉 ¡Sincronización completada!');
    console.log('Ahora la API mostrará tus datos originales.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    localConnection.end();
    cleverConnection.end();
  }
}

syncData(); 