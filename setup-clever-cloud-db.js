const mysql = require('mysql2/promise');

// Configuración de Clever Cloud
const dbConfig = {
  host: 'bmbomdrvxfmjayg1ob1t-mysql.services.clever-cloud.com',
  user: 'u38jfxey6ydxpquj',
  password: 'G6OrgeuvwYB5CgquynZQ',
  database: 'bmbomdrvxfmjayg1ob1t',
  port: 3306
};

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔌 Conectando a Clever Cloud...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión exitosa a Clever Cloud');
    
    // Crear tablas
    console.log('📋 Creando tablas...');
    
    const tables = [
      `CREATE TABLE IF NOT EXISTS clientes (
        id_cliente INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100),
        telefono VARCHAR(20),
        email VARCHAR(100),
        direccion TEXT
      )`,
      
      `CREATE TABLE IF NOT EXISTS productos (
        id_producto INT PRIMARY KEY AUTO_INCREMENT,
        nombre_producto VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        stock INT DEFAULT 0,
        descripcion TEXT
      )`,
      
      `CREATE TABLE IF NOT EXISTS ventas (
        id_venta INT PRIMARY KEY AUTO_INCREMENT,
        id_cliente INT,
        total DECIMAL(10,2) NOT NULL,
        fecha_venta DATE,
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
      )`,
      
      `CREATE TABLE IF NOT EXISTS detalle_venta (
        id_detalle INT PRIMARY KEY AUTO_INCREMENT,
        id_venta INT,
        id_producto INT,
        cantidad INT,
        precio_unitario DECIMAL(10,2),
        FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
      )`,
      
      `CREATE TABLE IF NOT EXISTS empleados (
        id_empleado INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        puesto VARCHAR(50),
        salario DECIMAL(10,2)
      )`,
      
      `CREATE TABLE IF NOT EXISTS proveedores (
        id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        contacto VARCHAR(100),
        telefono VARCHAR(20),
        email VARCHAR(100),
        direccion TEXT
      )`,
      
      `CREATE TABLE IF NOT EXISTS compras (
        id_compra INT PRIMARY KEY AUTO_INCREMENT,
        id_proveedor INT,
        producto VARCHAR(100),
        cantidad DECIMAL(10,2),
        costo_total DECIMAL(10,2),
        fecha_compra DATE,
        FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
      )`
    ];
    
    for (const table of tables) {
      await connection.execute(table);
      console.log('✅ Tabla creada/verificada');
    }
    
    // Insertar datos de ejemplo
    console.log('📝 Insertando datos de ejemplo...');
    
    const sampleData = [
      `INSERT IGNORE INTO clientes (nombre, apellido, telefono) VALUES 
       ('María', 'García', '555-0101'),
       ('Juan', 'López', '555-0102'),
       ('Ana', 'Martínez', '555-0103')`,
      
      `INSERT IGNORE INTO productos (nombre_producto, precio, stock) VALUES 
       ('Tortilla de Maíz', 15.00, 100),
       ('Tortilla de Harina', 18.00, 80),
       ('Tostadas', 25.00, 50)`,
      
      `INSERT IGNORE INTO empleados (nombre, puesto, salario) VALUES 
       ('Carlos', 'Vendedor', 8000.00),
       ('Sofía', 'Cajera', 7500.00)`,
      
      `INSERT IGNORE INTO proveedores (nombre, contacto, telefono) VALUES 
       ('Distribuidora Central', 'Roberto', '555-0201'),
       ('Harinas del Norte', 'Patricia', '555-0202')`
    ];
    
    for (const data of sampleData) {
      await connection.execute(data);
      console.log('✅ Datos de ejemplo insertados');
    }
    
    console.log('🎉 Base de datos configurada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase(); 