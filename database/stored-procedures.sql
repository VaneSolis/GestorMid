-- ========================================
-- PROCEDIMIENTOS ALMACENADOS - CLIENTES
-- ========================================

-- Mostrar todos los clientes
DELIMITER //
CREATE PROCEDURE sp_mostrar_clientes()
BEGIN
    SELECT * FROM clientes ORDER BY nombre;
END //
DELIMITER ;

-- Insertar cliente
DELIMITER //
CREATE PROCEDURE sp_insertar_cliente(
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_direccion TEXT
)
BEGIN
    INSERT INTO clientes (nombre, telefono, email, direccion) 
    VALUES (p_nombre, p_telefono, p_email, p_direccion);
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Actualizar cliente
DELIMITER //
CREATE PROCEDURE sp_actualizar_cliente(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_direccion TEXT
)
BEGIN
    UPDATE clientes 
    SET nombre = p_nombre, telefono = p_telefono, email = p_email, direccion = p_direccion
    WHERE id = p_id;
END //
DELIMITER ;

-- Eliminar cliente
DELIMITER //
CREATE PROCEDURE sp_eliminar_cliente(IN p_id INT)
BEGIN
    DELETE FROM clientes WHERE id = p_id;
END //
DELIMITER ;

-- Obtener cliente por ID
DELIMITER //
CREATE PROCEDURE sp_obtener_cliente(IN p_id INT)
BEGIN
    SELECT * FROM clientes WHERE id = p_id;
END //
DELIMITER ;

-- ========================================
-- PROCEDIMIENTOS ALMACENADOS - PRODUCTOS
-- ========================================

-- Mostrar todos los productos
DELIMITER //
CREATE PROCEDURE sp_mostrar_productos()
BEGIN
    SELECT * FROM productos ORDER BY nombre;
END //
DELIMITER ;

-- Insertar producto
DELIMITER //
CREATE PROCEDURE sp_insertar_producto(
    IN p_nombre VARCHAR(100),
    IN p_precio DECIMAL(10,2),
    IN p_stock INT,
    IN p_descripcion TEXT
)
BEGIN
    INSERT INTO productos (nombre, precio, stock, descripcion) 
    VALUES (p_nombre, p_precio, p_stock, p_descripcion);
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Actualizar producto
DELIMITER //
CREATE PROCEDURE sp_actualizar_producto(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_precio DECIMAL(10,2),
    IN p_stock INT,
    IN p_descripcion TEXT
)
BEGIN
    UPDATE productos 
    SET nombre = p_nombre, precio = p_precio, stock = p_stock, descripcion = p_descripcion
    WHERE id = p_id;
END //
DELIMITER ;

-- Eliminar producto
DELIMITER //
CREATE PROCEDURE sp_eliminar_producto(IN p_id INT)
BEGIN
    DELETE FROM productos WHERE id = p_id;
END //
DELIMITER ;

-- Obtener producto por ID
DELIMITER //
CREATE PROCEDURE sp_obtener_producto(IN p_id INT)
BEGIN
    SELECT * FROM productos WHERE id = p_id;
END //
DELIMITER ;

-- ========================================
-- PROCEDIMIENTOS ALMACENADOS - VENTAS
-- ========================================

-- Mostrar todas las ventas
DELIMITER //
CREATE PROCEDURE sp_mostrar_ventas()
BEGIN
    SELECT v.*, c.nombre as cliente_nombre 
    FROM ventas v 
    LEFT JOIN clientes c ON v.cliente_id = c.id 
    ORDER BY v.fecha DESC;
END //
DELIMITER ;

-- Insertar venta
DELIMITER //
CREATE PROCEDURE sp_insertar_venta(
    IN p_cliente_id INT,
    IN p_total DECIMAL(10,2),
    IN p_fecha DATE
)
BEGIN
    INSERT INTO ventas (cliente_id, total, fecha) 
    VALUES (p_cliente_id, p_total, p_fecha);
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Insertar detalle de venta
DELIMITER //
CREATE PROCEDURE sp_insertar_detalle_venta(
    IN p_venta_id INT,
    IN p_producto_id INT,
    IN p_cantidad INT,
    IN p_precio_unitario DECIMAL(10,2)
)
BEGIN
    INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario) 
    VALUES (p_venta_id, p_producto_id, p_cantidad, p_precio_unitario);
    
    -- Actualizar stock del producto
    UPDATE productos 
    SET stock = stock - p_cantidad 
    WHERE id = p_producto_id;
END //
DELIMITER ;

-- Obtener venta por ID
DELIMITER //
CREATE PROCEDURE sp_obtener_venta(IN p_id INT)
BEGIN
    SELECT v.*, c.nombre as cliente_nombre 
    FROM ventas v 
    LEFT JOIN clientes c ON v.cliente_id = c.id 
    WHERE v.id = p_id;
END //
DELIMITER ;

-- ========================================
-- PROCEDIMIENTOS ALMACENADOS - EMPLEADOS
-- ========================================

-- Mostrar todos los empleados
DELIMITER //
CREATE PROCEDURE sp_mostrar_empleados()
BEGIN
    SELECT * FROM empleados ORDER BY nombre;
END //
DELIMITER ;

-- Insertar empleado
DELIMITER //
CREATE PROCEDURE sp_insertar_empleado(
    IN p_nombre VARCHAR(100),
    IN p_cargo VARCHAR(50),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_salario DECIMAL(10,2)
)
BEGIN
    INSERT INTO empleados (nombre, cargo, telefono, email, salario) 
    VALUES (p_nombre, p_cargo, p_telefono, p_email, p_salario);
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Actualizar empleado
DELIMITER //
CREATE PROCEDURE sp_actualizar_empleado(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_cargo VARCHAR(50),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_salario DECIMAL(10,2)
)
BEGIN
    UPDATE empleados 
    SET nombre = p_nombre, cargo = p_cargo, telefono = p_telefono, email = p_email, salario = p_salario
    WHERE id = p_id;
END //
DELIMITER ;

-- Eliminar empleado
DELIMITER //
CREATE PROCEDURE sp_eliminar_empleado(IN p_id INT)
BEGIN
    DELETE FROM empleados WHERE id = p_id;
END //
DELIMITER ;

-- ========================================
-- PROCEDIMIENTOS ALMACENADOS - PROVEEDORES
-- ========================================

-- Mostrar todos los proveedores
DELIMITER //
CREATE PROCEDURE sp_mostrar_proveedores()
BEGIN
    SELECT * FROM proveedores ORDER BY nombre;
END //
DELIMITER ;

-- Insertar proveedor
DELIMITER //
CREATE PROCEDURE sp_insertar_proveedor(
    IN p_nombre VARCHAR(100),
    IN p_contacto VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_direccion TEXT
)
BEGIN
    INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) 
    VALUES (p_nombre, p_contacto, p_telefono, p_email, p_direccion);
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Actualizar proveedor
DELIMITER //
CREATE PROCEDURE sp_actualizar_proveedor(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_contacto VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_direccion TEXT
)
BEGIN
    UPDATE proveedores 
    SET nombre = p_nombre, contacto = p_contacto, telefono = p_telefono, email = p_email, direccion = p_direccion
    WHERE id = p_id;
END //
DELIMITER ;

-- Eliminar proveedor
DELIMITER //
CREATE PROCEDURE sp_eliminar_proveedor(IN p_id INT)
BEGIN
    DELETE FROM proveedores WHERE id = p_id;
END //
DELIMITER ;

-- ========================================
-- PROCEDIMIENTOS ALMACENADOS - COMPRAS
-- ========================================

-- Mostrar todas las compras
DELIMITER //
CREATE PROCEDURE sp_mostrar_compras()
BEGIN
    SELECT c.*, p.nombre as proveedor_nombre 
    FROM compras c 
    LEFT JOIN proveedores p ON c.proveedor_id = p.id 
    ORDER BY c.fecha DESC;
END //
DELIMITER ;

-- Insertar compra
DELIMITER //
CREATE PROCEDURE sp_insertar_compra(
    IN p_proveedor_id INT,
    IN p_total DECIMAL(10,2),
    IN p_fecha DATE
)
BEGIN
    INSERT INTO compras (proveedor_id, total, fecha) 
    VALUES (p_proveedor_id, p_total, p_fecha);
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Insertar detalle de compra
DELIMITER //
CREATE PROCEDURE sp_insertar_detalle_compra(
    IN p_compra_id INT,
    IN p_producto_id INT,
    IN p_cantidad INT,
    IN p_precio_unitario DECIMAL(10,2)
)
BEGIN
    INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario) 
    VALUES (p_compra_id, p_producto_id, p_cantidad, p_precio_unitario);
    
    -- Actualizar stock del producto
    UPDATE productos 
    SET stock = stock + p_cantidad 
    WHERE id = p_producto_id;
END //
DELIMITER ;

-- ========================================
-- PROCEDIMIENTOS ALMACENADOS - REPORTES
-- ========================================

-- Reporte de ventas por fecha
DELIMITER //
CREATE PROCEDURE sp_reporte_ventas_fecha(
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE
)
BEGIN
    SELECT 
        v.id,
        v.fecha,
        c.nombre as cliente,
        v.total,
        COUNT(dv.id) as productos_vendidos
    FROM ventas v
    LEFT JOIN clientes c ON v.cliente_id = c.id
    LEFT JOIN detalle_venta dv ON v.id = dv.venta_id
    WHERE v.fecha BETWEEN p_fecha_inicio AND p_fecha_fin
    GROUP BY v.id, v.fecha, c.nombre, v.total
    ORDER BY v.fecha DESC;
END //
DELIMITER ;

-- Reporte de inventario
DELIMITER //
CREATE PROCEDURE sp_reporte_inventario()
BEGIN
    SELECT 
        p.id,
        p.nombre,
        p.precio,
        p.stock,
        p.descripcion,
        CASE 
            WHEN p.stock <= 10 THEN 'CRÍTICO'
            WHEN p.stock <= 50 THEN 'BAJO'
            ELSE 'NORMAL'
        END as estado_stock
    FROM productos p
    ORDER BY p.stock ASC;
END //
DELIMITER ;

-- Reporte de productos más vendidos
DELIMITER //
CREATE PROCEDURE sp_productos_mas_vendidos(IN p_limite INT)
BEGIN
    SELECT 
        p.nombre,
        p.precio,
        SUM(dv.cantidad) as total_vendido,
        SUM(dv.cantidad * dv.precio_unitario) as total_ventas
    FROM productos p
    LEFT JOIN detalle_venta dv ON p.id = dv.producto_id
    GROUP BY p.id, p.nombre, p.precio
    ORDER BY total_vendido DESC
    LIMIT p_limite;
END //
DELIMITER ; 