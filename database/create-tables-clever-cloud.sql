-- ========================================
-- CREAR TABLAS PARA CLEVER CLOUD
-- ========================================

-- Crear tabla clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla productos
CREATE TABLE IF NOT EXISTS productos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla empleados
CREATE TABLE IF NOT EXISTS empleados (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  cargo VARCHAR(50),
  telefono VARCHAR(20),
  email VARCHAR(100),
  salario DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla proveedores
CREATE TABLE IF NOT EXISTS proveedores (
  id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  producto_suministrado VARCHAR(100),
  frecuencia_entrega VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla ventas
CREATE TABLE IF NOT EXISTS ventas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT,
  total DECIMAL(10,2) NOT NULL,
  fecha DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);

-- Crear tabla detalle_venta
CREATE TABLE IF NOT EXISTS detalle_venta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  venta_id INT,
  producto_id INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL
);

-- Crear tabla compras
CREATE TABLE IF NOT EXISTS compras (
  id INT PRIMARY KEY AUTO_INCREMENT,
  proveedor_id INT,
  total DECIMAL(10,2) NOT NULL,
  fecha DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id_proveedor) ON DELETE SET NULL
);

-- Crear tabla detalle_compra
CREATE TABLE IF NOT EXISTS detalle_compra (
  id INT PRIMARY KEY AUTO_INCREMENT,
  compra_id INT,
  producto_id INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL
);

-- Insertar datos de ejemplo
INSERT INTO clientes (nombre, telefono, email, direccion) VALUES
('Juan Pérez', '555-0101', 'juan@email.com', 'Calle Principal 123'),
('María García', '555-0102', 'maria@email.com', 'Avenida Central 456'),
('Carlos López', '555-0103', 'carlos@email.com', 'Plaza Mayor 789');

INSERT INTO productos (nombre, precio, stock, descripcion) VALUES
('Tortillas de Maíz', 15.00, 100, 'Tortillas frescas de maíz'),
('Tortillas de Harina', 18.00, 80, 'Tortillas de harina de trigo'),
('Tostadas', 25.00, 50, 'Tostadas crujientes'),
('Quesadillas', 30.00, 30, 'Quesadillas con queso');

INSERT INTO empleados (nombre, cargo, telefono, email, salario) VALUES
('Ana Martínez', 'Gerente', '555-0201', 'ana@tortilleria.com', 8000.00),
('Luis Rodríguez', 'Vendedor', '555-0202', 'luis@tortilleria.com', 5000.00),
('Sofia Herrera', 'Cajera', '555-0203', 'sofia@tortilleria.com', 4500.00);

INSERT INTO proveedores (nombre, telefono, producto_suministrado, frecuencia_entrega) VALUES
('Distribuidora de Maíz', '555-0301', 'Maíz para tortillas', 'Diaria'),
('Harinas del Norte', '555-0302', 'Harina de trigo', 'Semanal'),
('Lácteos Frescos', '555-0303', 'Queso para quesadillas', 'Diaria');

-- Verificar que las tablas se crearon correctamente
SELECT 'Tablas creadas exitosamente' as mensaje; 