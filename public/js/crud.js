// ========================================
// VARIABLES GLOBALES
// ========================================
let allClientes = [];
let allProductos = [];
let allVentas = [];
let allEmpleados = [];
let allProveedores = [];
let allCompras = [];

// ========================================
// FUNCIONES CRUD - CLIENTES
// ========================================

// Cargar clientes
async function loadClientes() {
  try {
    const response = await fetch('/api/clientes');
    const data = await response.json();
    
    if (data.success) {
      allClientes = data.data; // Guardar datos originales
      displayClientes(data.data);
    } else {
      showAlert('Error al cargar clientes: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Mostrar clientes en tabla
function displayClientes(clientes) {
  const tbody = document.getElementById('clientesTable');
  
  if (clientes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay clientes registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = clientes.map(cliente => `
    <tr>
      <td>${cliente.id_cliente}</td>
      <td>${cliente.nombre} ${cliente.apellido || ''}</td>
      <td>${cliente.telefono || '-'}</td>
      <td>${cliente.email || '-'}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editCliente(${cliente.id_cliente})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteCliente(${cliente.id_cliente})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Insertar cliente
async function insertCliente(formData) {
  try {
    const response = await fetch('/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        email: formData.email,
        direccion: formData.direccion
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Cliente agregado correctamente', 'success');
      loadClientes();
      return true;
    } else {
      showAlert('Error al agregar cliente: ' + data.message, 'danger');
      return false;
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
    return false;
  }
}

// Actualizar cliente
async function updateCliente(id, formData) {
  try {
    const response = await fetch(`/api/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        email: formData.email,
        direccion: formData.direccion
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Cliente actualizado correctamente', 'success');
      loadClientes();
      return true;
    } else {
      showAlert('Error al actualizar cliente: ' + data.message, 'danger');
      return false;
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
    return false;
  }
}

// Eliminar cliente
async function deleteCliente(id) {
  if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/clientes/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Cliente eliminado correctamente', 'success');
      loadClientes();
    } else {
      showAlert('Error al eliminar cliente: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Obtener cliente por ID
async function getCliente(id) {
  try {
    const response = await fetch(`/api/clientes/${id}`);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      showAlert('Error al obtener cliente: ' + data.message, 'danger');
      return null;
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
    return null;
  }
}

// ========================================
// FUNCIONES CRUD - PRODUCTOS
// ========================================

// Cargar productos
async function loadProductos() {
  try {
    const response = await fetch('/api/productos');
    const data = await response.json();
    
    if (data.success) {
      allProductos = data.data; // Guardar datos originales
      displayProductos(data.data);
      
      // Llenar selector de productos en formulario de compras si existe
      const productoSelect = document.getElementById('productoSelect');
      if (productoSelect) {
        productoSelect.innerHTML = '<option value="">Seleccionar producto</option>' +
          data.data.map(producto => 
            `<option value="${producto.id_producto}">${producto.nombre_producto}</option>`
          ).join('');
      }
    } else {
      showAlert('Error al cargar productos: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Mostrar productos en tabla
function displayProductos(productos) {
  const tbody = document.getElementById('productosTable');
  
  if (productos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay productos registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = productos.map(producto => `
    <tr>
      <td>${producto.id_producto}</td>
      <td>${producto.nombre_producto}</td>
      <td>$${producto.precio_unitario || producto.precio}</td>
      <td>${producto.stock || '0'} ${producto.unidad_medida || ''}</td>
      <td>${producto.unidad_medida || '-'}</td>
      <td>${producto.categoria || '-'}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editProducto(${producto.id_producto})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteProducto(${producto.id_producto})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Insertar producto
async function insertProducto(formData) {
  try {
    const response = await fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        precio: formData.precio,
        stock: formData.stock,
        descripcion: formData.descripcion
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Producto agregado correctamente', 'success');
      loadProductos();
      return true;
    } else {
      showAlert('Error al agregar producto: ' + data.message, 'danger');
      return false;
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
    return false;
  }
}

// Actualizar producto
async function updateProducto(id, formData) {
  try {
    const response = await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        precio: formData.precio,
        stock: formData.stock,
        descripcion: formData.descripcion
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Producto actualizado correctamente', 'success');
      loadProductos();
      return true;
    } else {
      showAlert('Error al actualizar producto: ' + data.message, 'danger');
      return false;
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
    return false;
  }
}

// Eliminar producto
async function deleteProducto(id) {
  if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/productos/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Producto eliminado correctamente', 'success');
      loadProductos();
    } else {
      showAlert('Error al eliminar producto: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// ========================================
// FUNCIONES DE EDICIÓN - PRODUCTOS
// ========================================

// Editar producto
async function editProducto(id) {
  const producto = allProductos.find(p => p.id_producto === id);
  if (producto) {
    // Aquí puedes implementar la lógica para mostrar el formulario de edición
    console.log('Editando producto:', producto);
  }
}

// ========================================
// FUNCIONES CRUD - VENTAS
// ========================================

// Cargar ventas
async function loadVentas() {
  try {
    const response = await fetch('/api/ventas');
    const data = await response.json();
    
    if (data.success) {
      allVentas = data.data; // Guardar datos originales
      displayVentas(data.data);
    } else {
      showAlert('Error al cargar ventas: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Mostrar ventas en tabla
function displayVentas(ventas) {
  const tbody = document.getElementById('ventasTable');
  
  if (ventas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay ventas registradas</td></tr>';
    return;
  }
  
  tbody.innerHTML = ventas.map(venta => `
    <tr>
      <td>${venta.id_venta}</td>
      <td>${venta.cliente_nombre || 'Cliente no registrado'}</td>
      <td>${venta.empleado_nombre || 'Empleado no asignado'}</td>
      <td>${venta.productos || 'Sin productos'}</td>
      <td>$${venta.total}</td>
      <td>${new Date(venta.fecha_venta).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewVenta(${venta.id_venta})">
          <i class="fas fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ========================================
// FUNCIONES CRUD - EMPLEADOS
// ========================================

// Cargar empleados
async function loadEmpleados() {
  try {
    const response = await fetch('/api/empleados');
    const data = await response.json();
    
    if (data.success) {
      allEmpleados = data.data; // Guardar datos originales
      displayEmpleados(data.data);
    } else {
      showAlert('Error al cargar empleados: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Mostrar empleados en tabla
function displayEmpleados(empleados) {
  const tbody = document.getElementById('empleadosTable');
  
  if (empleados.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay empleados registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = empleados.map(empleado => `
    <tr>
      <td>${empleado.id_empleado}</td>
      <td>${empleado.nombre}</td>
      <td>${empleado.puesto}</td>
      <td>${empleado.fecha_contratacion ? new Date(empleado.fecha_contratacion).toLocaleDateString() : '-'}</td>
      <td>$${empleado.salario ? empleado.salario.toLocaleString() : '0'}</td>
      <td>
        <span class="badge bg-${empleado.estatus === 'Activo' ? 'success' : empleado.estatus === 'Inactivo' ? 'danger' : empleado.estatus === 'Vacaciones' ? 'warning' : 'secondary'}">
          ${empleado.estatus || 'N/A'}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editEmpleado(${empleado.id_empleado})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteEmpleado(${empleado.id_empleado})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Editar empleado
async function editEmpleado(id) {
  const empleado = allEmpleados.find(e => e.id_empleado === id);
  if (empleado) {
    // Aquí puedes implementar la lógica para mostrar el formulario de edición
    console.log('Editando empleado:', empleado);
  }
}

// Actualizar empleado
async function updateEmpleado(id, formData) {
  try {
    const response = await fetch(`/api/empleados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        puesto: formData.puesto,
        salario: formData.salario
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Empleado actualizado correctamente', 'success');
      loadEmpleados();
      return true;
    } else {
      showAlert('Error al actualizar empleado: ' + data.message, 'danger');
      return false;
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
    return false;
  }
}

// Eliminar empleado
async function deleteEmpleado(id) {
  if (!confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/empleados/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Empleado eliminado correctamente', 'success');
      loadEmpleados();
    } else {
      showAlert('Error al eliminar empleado: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// ========================================
// FUNCIONES CRUD - PROVEEDORES
// ========================================

// Cargar proveedores
async function loadProveedores() {
  try {
    const response = await fetch('/api/proveedores');
    const data = await response.json();
    
    if (data.success) {
      allProveedores = data.data; // Guardar datos originales
      displayProveedores(data.data);
      
      // Los proveedores se cargarán para autocomplete en el formulario de compras
    } else {
      showAlert('Error al cargar proveedores: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Mostrar proveedores en tabla
function displayProveedores(proveedores) {
  const tbody = document.getElementById('proveedoresTable');
  
  if (proveedores.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay proveedores registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = proveedores.map(proveedor => `
    <tr>
      <td>${proveedor.id_proveedor}</td>
      <td>${proveedor.nombre}</td>
      <td>${proveedor.producto_suministrado || '-'}</td>
      <td>${proveedor.telefono || '-'}</td>
      <td>${proveedor.frecuencia_entrega || '-'}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editProveedor(${proveedor.id_proveedor})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteProveedor(${proveedor.id_proveedor})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ========================================
// FUNCIONES CRUD - COMPRAS
// ========================================

// Cargar compras
async function loadCompras() {
  try {
    const response = await fetch('/api/compras');
    const data = await response.json();
    
    if (data.success) {
      allCompras = data.data; // Guardar datos originales
      displayCompras(data.data);
    } else {
      showAlert('Error al cargar compras: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Mostrar compras en tabla
function displayCompras(compras) {
  const tbody = document.getElementById('comprasTable');
  
  if (compras.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay compras registradas</td></tr>';
    return;
  }
  
  tbody.innerHTML = compras.map(compra => `
    <tr>
      <td>${compra.id_compra}</td>
      <td>${compra.proveedor_nombre || 'Proveedor no registrado'}</td>
      <td>${compra.productos || 'Sin productos'}</td>
      <td>$${compra.costo_total}</td>
      <td>${new Date(compra.fecha_compra).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewCompra(${compra.id_compra})">
          <i class="fas fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ========================================
// FUNCIONES UTILITARIAS
// ========================================

// Mostrar alertas
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const container = document.querySelector('.container');
  container.insertBefore(alertDiv, container.firstChild);
  
  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Cargar datos del módulo
function loadModuleData(moduleName) {
  switch (moduleName) {
    case 'clientes':
      loadClientes();
      break;
    case 'productos':
      loadProductos();
      break;
    case 'ventas':
      loadVentas();
      break;
    case 'empleados':
      loadEmpleados();
      break;
    case 'proveedores':
      loadProveedores();
      break;
    case 'compras':
      loadCompras();
      break;
  }
}

// ========================================
// FUNCIONES DE BÚSQUEDA
// ========================================

// Buscar clientes
function searchClientes() {
  const searchTerm = document.getElementById('searchCliente').value.toLowerCase();
  const filteredClientes = allClientes.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm) ||
    cliente.apellido?.toLowerCase().includes(searchTerm) ||
    cliente.telefono?.includes(searchTerm)
  );
  displayClientes(filteredClientes);
}

// Buscar productos
function searchProductos() {
  const searchTerm = document.getElementById('searchProducto').value.toLowerCase();
  const filteredProductos = allProductos.filter(producto => 
    producto.nombre_producto.toLowerCase().includes(searchTerm) ||
    producto.categoria?.toLowerCase().includes(searchTerm)
  );
  displayProductos(filteredProductos);
}

// Buscar ventas
function searchVentas() {
  const searchTerm = document.getElementById('searchVenta').value.toLowerCase();
  const filteredVentas = allVentas.filter(venta => 
    venta.cliente_nombre?.toLowerCase().includes(searchTerm) ||
    venta.total?.toString().includes(searchTerm)
  );
  displayVentas(filteredVentas);
}

// Buscar empleados
function searchEmpleados() {
  const searchTerm = document.getElementById('searchEmpleado').value.toLowerCase();
  const filteredEmpleados = allEmpleados.filter(empleado => 
    empleado.nombre.toLowerCase().includes(searchTerm) ||
    empleado.puesto.toLowerCase().includes(searchTerm)
  );
  displayEmpleados(filteredEmpleados);
}

// Buscar proveedores
function searchProveedores() {
  const searchTerm = document.getElementById('searchProveedor').value.toLowerCase();
  const filteredProveedores = allProveedores.filter(proveedor => 
    proveedor.nombre.toLowerCase().includes(searchTerm) ||
    proveedor.producto_suministrado?.toLowerCase().includes(searchTerm)
  );
  displayProveedores(filteredProveedores);
}

// Buscar compras
function searchCompras() {
  const searchTerm = document.getElementById('searchCompra').value.toLowerCase();
  const filteredCompras = allCompras.filter(compra => 
    compra.proveedor_nombre?.toLowerCase().includes(searchTerm) ||
    compra.costo_total?.toString().includes(searchTerm)
  );
  displayCompras(filteredCompras);
}

// ========================================
// INICIALIZACIÓN
// ========================================

// Inicializar listeners de búsqueda
function initializeSearchListeners() {
  // Clientes
  const searchCliente = document.getElementById('searchCliente');
  if (searchCliente) {
    searchCliente.addEventListener('input', searchClientes);
  }
  
  // Productos
  const searchProducto = document.getElementById('searchProducto');
  if (searchProducto) {
    searchProducto.addEventListener('input', searchProductos);
  }
  
  // Ventas
  const searchVenta = document.getElementById('searchVenta');
  if (searchVenta) {
    searchVenta.addEventListener('input', searchVentas);
  }
  
  // Empleados
  const searchEmpleado = document.getElementById('searchEmpleado');
  if (searchEmpleado) {
    searchEmpleado.addEventListener('input', searchEmpleados);
  }
  
  // Proveedores
  const searchProveedor = document.getElementById('searchProveedor');
  if (searchProveedor) {
    searchProveedor.addEventListener('input', searchProveedores);
  }
  
  // Compras
  const searchCompra = document.getElementById('searchCompra');
  if (searchCompra) {
    searchCompra.addEventListener('input', searchCompras);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initializeSearchListeners();
}); 