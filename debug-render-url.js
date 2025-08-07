const https = require('https');

// Lista de posibles URLs de Render
const possibleUrls = [
  'https://gestor-tortilleria.onrender.com',
  'https://gestor-tortilleria-xxxx.onrender.com',
  'https://app-gestormid.onrender.com',
  'https://gestor-mid.onrender.com'
];

function makeRequest(url, path = '') {
  return new Promise((resolve, reject) => {
    const fullUrl = url + path;
    const urlObj = new URL(fullUrl);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      timeout: 10000
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          statusText: res.statusMessage,
          data: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.end();
  });
}

async function testUrl(url) {
  try {
    console.log(`\n🔍 Probando: ${url}`);
    
    // Probar la ruta principal
    const mainResponse = await makeRequest(url);
    console.log(`   Main page: ${mainResponse.status} ${mainResponse.statusText}`);
    
    // Probar test-connection
    const testResponse = await makeRequest(url, '/api/test-connection');
    console.log(`   Test connection: ${testResponse.status} ${testResponse.statusText}`);
    
    if (testResponse.status === 200) {
      console.log(`   ✅ Funciona! Respuesta:`, testResponse.data.substring(0, 200) + '...');
      return true;
    } else {
      console.log(`   ❌ No funciona`);
      return false;
    }
  } catch (error) {
    console.log(`   💥 Error: ${error.message}`);
    return false;
  }
}

async function findWorkingUrl() {
  console.log('🔍 BUSCANDO LA URL CORRECTA DE RENDER');
  console.log('=====================================');
  
  for (const url of possibleUrls) {
    const works = await testUrl(url);
    if (works) {
      console.log(`\n🎯 ¡ENCONTRADA! URL que funciona: ${url}`);
      return url;
    }
  }
  
  console.log('\n❌ No se encontró ninguna URL que funcione');
  console.log('\n📋 INSTRUCCIONES:');
  console.log('1. Ve a tu dashboard de Render');
  console.log('2. Selecciona tu aplicación');
  console.log('3. Copia la URL que aparece en la parte superior');
  console.log('4. Actualiza el script con esa URL');
  
  return null;
}

findWorkingUrl(); 