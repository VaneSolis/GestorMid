const { pool } = require('./config/database');

async function verificacionFinal() {
  try {
    console.log('🎯 VERIFICACIÓN FINAL DEL SISTEMA\n');
    
    const modulos = [
      { nombre: 'Clientes', sp: 'sp_mostrar_clientes' },
      { nombre: 'Productos', sp: 'sp_mostrar_productos' },
      { nombre: 'Ventas', sp: 'sp_mostrar_ventas' },
      { nombre: 'Compras', sp: 'sp_mostrar_compras' },
      { nombre: 'Empleados', sp: 'sp_mostrar_empleados' },
      { nombre: 'Proveedores', sp: 'sp_mostrar_proveedores' }
    ];
    
    let modulosCorrectos = 0;
    let totalModulos = modulos.length;
    
    for (const modulo of modulos) {
      try {
        console.log(`📊 Verificando ${modulo.nombre}...`);
        const [resultado] = await pool.execute(`CALL ${modulo.sp}()`);
        
        if (resultado[0] && resultado[0].length > 0) {
          console.log(`   ✅ ${modulo.nombre}: ${resultado[0].length} registros`);
          
          // Mostrar ejemplo del primer registro
          const ejemplo = resultado[0][0];
          const campos = Object.keys(ejemplo).slice(0, 3); // Mostrar solo los primeros 3 campos
          const valores = campos.map(campo => `${campo}: ${ejemplo[campo]}`).join(', ');
          console.log(`   📋 Ejemplo: ${valores}`);
          
          modulosCorrectos++;
        } else {
          console.log(`   ⚠️  ${modulo.nombre}: Sin datos`);
        }
        
      } catch (error) {
        console.log(`   ❌ ${modulo.nombre}: Error - ${error.message}`);
      }
      
      console.log('');
    }
    
    console.log('📊 RESUMEN:');
    console.log(`✅ Módulos funcionando: ${modulosCorrectos}/${totalModulos}`);
    
    if (modulosCorrectos === totalModulos) {
      console.log('\n🎉 ¡TODOS LOS MÓDULOS ESTÁN FUNCIONANDO CORRECTAMENTE!');
      console.log('\n🚀 INSTRUCCIONES PARA EL USUARIO:');
      console.log('1. Abre tu navegador');
      console.log('2. Ve a: http://localhost:3000');
      console.log('3. Haz clic en cualquier módulo para ver los datos');
      console.log('4. Los datos ya no deberían estar desfasados');
      console.log('5. Usa los formularios para agregar nuevos registros');
      console.log('6. Usa los botones de editar/eliminar en las tablas');
    } else {
      console.log('\n⚠️  Algunos módulos tienen problemas. Revisa los errores arriba.');
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  } finally {
    await pool.end();
  }
}

verificacionFinal(); 