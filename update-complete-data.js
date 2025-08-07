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

console.log('🔄 ACTUALIZANDO DATOS COMPLETOS');
console.log('================================');

async function updateCompleteData() {
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
    
    // Actualizar productos con información completa
    console.log('\n📦 Actualizando productos...');
    const productUpdates = [
      {
        id: 1,
        precio_unitario: 15.50,
        unidad_medida: 'kg',
        categoria: 'Tortillas'
      },
      {
        id: 2,
        precio_unitario: 18.00,
        unidad_medida: 'bolsa 500g',
        categoria: 'Botanas'
      },
      {
        id: 3,
        precio_unitario: 12.00,
        unidad_medida: 'litro',
        categoria: 'Bebidas'
      },
      {
        id: 4,
        precio_unitario: 35.00,
        unidad_medida: '100g',
        categoria: 'Complementos'
      },
      {
        id: 5,
        precio_unitario: 45.00,
        unidad_medida: '250g',
        categoria: 'Complementos'
      }
    ];
    
    for (const update of productUpdates) {
      await new Promise((resolve, reject) => {
        connection.query(
          `UPDATE productos SET 
           precio_unitario = ?, 
           unidad_medida = ?, 
           categoria = ? 
           WHERE id_producto = ?`,
          [update.precio_unitario, update.unidad_medida, update.categoria, update.id],
          (err) => {
            if (err) {
              console.log(`⚠️  Error actualizando producto ${update.id}:`, err.message);
              reject(err);
            } else {
              console.log(`✅ Producto ${update.id} actualizado`);
              resolve();
            }
          }
        );
      });
    }
    
    // Actualizar empleados con información completa
    console.log('\n👨‍💼 Actualizando empleados...');
    const employeeUpdates = [
      {
        id: 1,
        fecha_contratacion: '2021-03-15',
        estatus: 'Activo'
      },
      {
        id: 2,
        fecha_contratacion: '2022-05-10',
        estatus: 'Activo'
      },
      {
        id: 3,
        fecha_contratacion: '2023-01-20',
        estatus: 'Activo'
      },
      {
        id: 4,
        fecha_contratacion: '2023-11-05',
        estatus: 'Activo'
      }
    ];
    
    for (const update of employeeUpdates) {
      await new Promise((resolve, reject) => {
        connection.query(
          `UPDATE empleados SET 
           fecha_contratacion = ?, 
           estatus = ? 
           WHERE id_empleado = ?`,
          [update.fecha_contratacion, update.estatus, update.id],
          (err) => {
            if (err) {
              console.log(`⚠️  Error actualizando empleado ${update.id}:`, err.message);
              reject(err);
            } else {
              console.log(`✅ Empleado ${update.id} actualizado`);
              resolve();
            }
          }
        );
      });
    }
    
    // Actualizar proveedores con información completa
    console.log('\n🏭 Actualizando proveedores...');
    const supplierUpdates = [
      {
        id: 1,
        producto_suministrado: 'Masa de maíz',
        frecuencia_entrega: 'Diario'
      },
      {
        id: 2,
        producto_suministrado: 'Refrescos y aguas',
        frecuencia_entrega: 'Quincenal'
      },
      {
        id: 3,
        producto_suministrado: 'Bolsas de plástico',
        frecuencia_entrega: 'Quincenal'
      },
      {
        id: 4,
        producto_suministrado: 'Harina para tortillas',
        frecuencia_entrega: 'Semanal'
      },
      {
        id: 5,
        producto_suministrado: 'Tostadas y totopos',
        frecuencia_entrega: 'Mensual'
      }
    ];
    
    for (const update of supplierUpdates) {
      await new Promise((resolve, reject) => {
        connection.query(
          `UPDATE proveedores SET 
           producto_suministrado = ?, 
           frecuencia_entrega = ? 
           WHERE id_proveedor = ?`,
          [update.producto_suministrado, update.frecuencia_entrega, update.id],
          (err) => {
            if (err) {
              console.log(`⚠️  Error actualizando proveedor ${update.id}:`, err.message);
              reject(err);
            } else {
              console.log(`✅ Proveedor ${update.id} actualizado`);
              resolve();
            }
          }
        );
      });
    }
    
    console.log('\n📊 Verificando datos actualizados...');
    
    // Verificar datos actualizados
    const tables = ['productos', 'empleados', 'proveedores'];
    
    for (const table of tables) {
      console.log(`\n📋 Datos de ${table}:`);
      console.log('─'.repeat(30));
      
      const data = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} LIMIT 3`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      
      data.forEach((row, i) => {
        console.log(`  ${i + 1}.`, JSON.stringify(row, null, 2));
      });
    }
    
    console.log('\n🎉 ¡Datos actualizados exitosamente!');
    console.log('Ahora las tablas tienen información completa.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    connection.end();
  }
}

updateCompleteData(); 