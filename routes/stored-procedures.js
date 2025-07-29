const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// ========================================
// PROCEDIMIENTOS ALMACENADOS - CLIENTES
// ========================================

// Mostrar todos los clientes
router.get('/clientes', async (req, res) => {
  try {
    const [rows] = await pool.execute('CALL sp_mostrar_clientes()');
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Insertar cliente
router.post('/clientes', async (req, res) => {
  try {
    const { nombre, telefono, email, direccion } = req.body;
    const [result] = await pool.execute('CALL sp_insertar_cliente(?, ?, ?, ?)', 
      [nombre, telefono, email, direccion]);
    res.json({ success: true, message: 'Cliente agregado correctamente', id: result[0][0].id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Actualizar cliente
router.put('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email, direccion } = req.body;
    await pool.execute('CALL sp_actualizar_cliente(?, ?, ?, ?, ?)', 
      [id, nombre, telefono, email, direccion]);
    res.json({ success: true, message: 'Cliente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Eliminar cliente
router.delete('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('CALL sp_eliminar_cliente(?)', [id]);
    res.json({ success: true, message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Obtener cliente por ID
router.get('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('CALL sp_obtener_cliente(?)', [id]);
    if (rows[0].length > 0) {
      res.json({ success: true, data: rows[0][0] });
    } else {
      res.status(404).json({ success: false, message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// PROCEDIMIENTOS ALMACENADOS - PRODUCTOS
// ========================================

// Mostrar todos los productos
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.execute('CALL sp_mostrar_productos()');
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Insertar producto
router.post('/productos', async (req, res) => {
  try {
    const { nombre, precio, stock, descripcion } = req.body;
    const [result] = await pool.execute('CALL sp_insertar_producto(?, ?, ?, ?)', 
      [nombre, precio, stock, descripcion]);
    res.json({ success: true, message: 'Producto agregado correctamente', id: result[0][0].id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Actualizar producto
router.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, descripcion } = req.body;
    await pool.execute('CALL sp_actualizar_producto(?, ?, ?, ?, ?)', 
      [id, nombre, precio, stock, descripcion]);
    res.json({ success: true, message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Eliminar producto
router.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('CALL sp_eliminar_producto(?)', [id]);
    res.json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Obtener producto por ID
router.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('CALL sp_obtener_producto(?)', [id]);
    if (rows[0].length > 0) {
      res.json({ success: true, data: rows[0][0] });
    } else {
      res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// PROCEDIMIENTOS ALMACENADOS - VENTAS
// ========================================

// Mostrar todas las ventas
router.get('/ventas', async (req, res) => {
  try {
    const [rows] = await pool.execute('CALL sp_mostrar_ventas()');
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Insertar venta
router.post('/ventas', async (req, res) => {
  try {
    const { cliente_id, total, fecha, productos } = req.body;
    const [result] = await pool.execute('CALL sp_insertar_venta(?, ?, ?)', 
      [cliente_id, total, fecha]);
    
    const venta_id = result[0][0].id;
    
    // Insertar detalles de venta
    for (const producto of productos) {
      await pool.execute('CALL sp_insertar_detalle_venta(?, ?, ?, ?)', 
        [venta_id, producto.producto_id, producto.cantidad, producto.precio_unitario]);
    }
    
    res.json({ success: true, message: 'Venta registrada correctamente', id: venta_id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Obtener venta por ID
router.get('/ventas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('CALL sp_obtener_venta(?)', [id]);
    if (rows[0].length > 0) {
      res.json({ success: true, data: rows[0][0] });
    } else {
      res.status(404).json({ success: false, message: 'Venta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// PROCEDIMIENTOS ALMACENADOS - EMPLEADOS
// ========================================

// Mostrar todos los empleados
router.get('/empleados', async (req, res) => {
  try {
    const [rows] = await pool.execute('CALL sp_mostrar_empleados()');
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Insertar empleado
router.post('/empleados', async (req, res) => {
  try {
    const { nombre, puesto, fecha_contratacion, salario, estatus } = req.body;
    const [result] = await pool.execute('CALL sp_insertar_empleado(?, ?, ?, ?, ?)', 
      [nombre, puesto, fecha_contratacion, salario, estatus]);
    res.json({ success: true, message: 'Empleado agregado correctamente', id: result[0][0].id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Actualizar empleado
router.put('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, puesto, fecha_contratacion, salario, estatus } = req.body;
    await pool.execute('CALL sp_actualizar_empleado(?, ?, ?, ?, ?, ?)', 
      [id, nombre, puesto, fecha_contratacion, salario, estatus]);
    res.json({ success: true, message: 'Empleado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Eliminar empleado
router.delete('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('CALL sp_eliminar_empleado(?)', [id]);
    res.json({ success: true, message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// PROCEDIMIENTOS ALMACENADOS - PROVEEDORES
// ========================================

// Mostrar todos los proveedores
router.get('/proveedores', async (req, res) => {
  try {
    const [rows] = await pool.execute('CALL sp_mostrar_proveedores()');
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Insertar proveedor
router.post('/proveedores', async (req, res) => {
  try {
    const { nombre, contacto, telefono, email, direccion } = req.body;
    const [result] = await pool.execute('CALL sp_insertar_proveedor(?, ?, ?, ?, ?)', 
      [nombre, contacto, telefono, email, direccion]);
    res.json({ success: true, message: 'Proveedor agregado correctamente', id: result[0][0].id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Actualizar proveedor
router.put('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, contacto, telefono, email, direccion } = req.body;
    await pool.execute('CALL sp_actualizar_proveedor(?, ?, ?, ?, ?, ?)', 
      [id, nombre, contacto, telefono, email, direccion]);
    res.json({ success: true, message: 'Proveedor actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Eliminar proveedor
router.delete('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('CALL sp_eliminar_proveedor(?)', [id]);
    res.json({ success: true, message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// PROCEDIMIENTOS ALMACENADOS - COMPRAS
// ========================================

// Mostrar todas las compras
router.get('/compras', async (req, res) => {
  try {
    const [rows] = await pool.execute('CALL sp_mostrar_compras()');
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Insertar compra
router.post('/compras', async (req, res) => {
  try {
    const { proveedor_id, total, fecha, productos } = req.body;
    const [result] = await pool.execute('CALL sp_insertar_compra(?, ?, ?)', 
      [proveedor_id, total, fecha]);
    
    const compra_id = result[0][0].id;
    
    // Insertar detalles de compra
    for (const producto of productos) {
      await pool.execute('CALL sp_insertar_detalle_compra(?, ?, ?, ?)', 
        [compra_id, producto.producto_id, producto.cantidad, producto.precio_unitario]);
    }
    
    res.json({ success: true, message: 'Compra registrada correctamente', id: compra_id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router; 