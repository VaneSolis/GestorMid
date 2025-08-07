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
      <td>${cliente.id}</td>
      <td>${cliente.nombre}</td>
      <td>${cliente.telefono || '-'}</td>
      <td>${cliente.email || '-'}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editCliente(${cliente.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteCliente(${cliente.id})">
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
            `<option value="${producto.id}">${producto.nombre}</option>`
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
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.stock || '0'} ${producto.unidad_medida || ''}</td>
      <td>${producto.unidad_medida || '-'}</td>
      <td>${producto.categoria || '-'}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editProducto(${producto.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteProducto(${producto.id})">
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
        unidad_medida: formData.unidad_medida,
        categoria: formData.categoria
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
        unidad_medida: formData.unidad_medida,
        categoria: formData.categoria
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
  try {
    const response = await fetch(`/api/productos/${id}`);
    const data = await response.json();
    
    if (data.success && data.data) {
      const producto = data.data;
      showProductEditForm(producto);
    } else {
      showAlert('Error al obtener datos del producto', 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
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
      <td>${venta.id}</td>
      <td>${venta.cliente_nombre || 'Cliente no registrado'}</td>
      <td>${venta.empleado_nombre || 'Empleado no asignado'}</td>
      <td>${venta.productos || 'Sin productos'}</td>
      <td>$${venta.total}</td>
      <td>${new Date(venta.fecha).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewVenta(${venta.id})">
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
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay empleados registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = empleados.map(empleado => `
    <tr>
      <td>${empleado.id}</td>
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
        <button class="btn btn-sm btn-primary" onclick="editEmpleado(${empleado.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteEmpleado(${empleado.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ========================================
// FUNCIONES DE EDICIÓN - EMPLEADOS
// ========================================

// Editar empleado
async function editEmpleado(id) {
  try {
    const response = await fetch(`/api/empleados/${id}`);
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      const empleado = data.data[0];
      showEmpleadoEditForm(empleado);
    } else {
      showAlert('Error al obtener datos del empleado', 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
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
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Empleado actualizado correctamente', 'success');
      loadEmpleados();
      hideEmpleadoForm();
    } else {
      showAlert('Error al actualizar empleado: ' + data.message, 'danger');
    }
  } catch (error) {
    showAlert('Error de conexión: ' + error.message, 'danger');
  }
}

// Eliminar empleado
async function deleteEmpleado(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
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
      <td>${proveedor.id}</td>
      <td>${proveedor.nombre}</td>
      <td>${proveedor.producto_suministrado || '-'}</td>
      <td>${proveedor.telefono || '-'}</td>
      <td>${proveedor.frecuencia_entrega || '-'}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editProveedor(${proveedor.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteProveedor(${proveedor.id})">
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
      <td>${compra.id}</td>
      <td>${compra.proveedor_nombre || 'Proveedor no registrado'}</td>
      <td>${compra.productos || 'Sin productos'}</td>
      <td>$${compra.total}</td>
      <td>${new Date(compra.fecha).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewCompra(${compra.id})">
          <i class="fas fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ========================================
// FUNCIONES UTILITARIAS
// ========================================

// Mostrar alerta
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Insertar al inicio del contenedor principal
  const container = document.querySelector('.container');
  container.insertBefore(alertDiv, container.firstChild);
  
  // Auto-dismiss después de 5 segundos
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Cargar datos cuando se cambia de módulo
function loadModuleData(moduleName) {
  switch(moduleName) {
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

// Búsqueda de clientes
function searchClientes() {
  const searchTerm = document.getElementById('searchCliente').value.toLowerCase();
  const filteredClientes = allClientes.filter(cliente => {
    const id = (cliente.id || '').toString().toLowerCase();
    const nombre = (cliente.nombre || '').toString().toLowerCase();
    
    return id.includes(searchTerm) ||
           nombre.includes(searchTerm);
  });
  displayClientes(filteredClientes);
}

// Búsqueda de productos
function searchProductos() {
  const searchTerm = document.getElementById('searchProducto').value.toLowerCase();
  const filteredProductos = allProductos.filter(producto => {
    const nombre = (producto.nombre || '').toString().toLowerCase();
    const categoria = (producto.categoria || '').toString().toLowerCase();
    const unidad_medida = (producto.unidad_medida || '').toString().toLowerCase();
    const stock = (producto.stock || '').toString().toLowerCase();
    
    return nombre.includes(searchTerm) ||
           categoria.includes(searchTerm) ||
           unidad_medida.includes(searchTerm) ||
           stock.includes(searchTerm);
  });
  displayProductos(filteredProductos);
}

// Búsqueda de ventas
function searchVentas() {
  const searchTerm = document.getElementById('searchVenta').value.toLowerCase();
  const filteredVentas = allVentas.filter(venta => {
    const id = (venta.id || '').toString().toLowerCase();
    const cliente_nombre = (venta.cliente_nombre || '').toString().toLowerCase();
    const empleado_nombre = (venta.empleado_nombre || '').toString().toLowerCase();
    const productos = (venta.productos || '').toString().toLowerCase();
    const total = (venta.total || '').toString().toLowerCase();
    
    return id.includes(searchTerm) ||
           cliente_nombre.includes(searchTerm) ||
           empleado_nombre.includes(searchTerm) ||
           productos.includes(searchTerm) ||
           total.includes(searchTerm);
  });
  displayVentas(filteredVentas);
}

// Búsqueda de empleados
function searchEmpleados() {
  const searchTerm = document.getElementById('searchEmpleado').value.toLowerCase();
  const filteredEmpleados = allEmpleados.filter(empleado => {
    const id = (empleado.id || '').toString().toLowerCase();
    const nombre = (empleado.nombre || '').toString().toLowerCase();
    
    return id.includes(searchTerm) ||
           nombre.includes(searchTerm);
  });
  displayEmpleados(filteredEmpleados);
}

// Búsqueda de proveedores
function searchProveedores() {
  const searchTerm = document.getElementById('searchProveedor').value.toLowerCase();
  const filteredProveedores = allProveedores.filter(proveedor => {
    const id = (proveedor.id || '').toString().toLowerCase();
    const nombre = (proveedor.nombre || '').toString().toLowerCase();
    const producto_suministrado = (proveedor.producto_suministrado || '').toString().toLowerCase();
    
    return id.includes(searchTerm) ||
           nombre.includes(searchTerm) ||
           producto_suministrado.includes(searchTerm);
  });
  displayProveedores(filteredProveedores);
}

// Búsqueda de compras
function searchCompras() {
  const searchTerm = document.getElementById('searchCompra').value.toLowerCase();
  const filteredCompras = allCompras.filter(compra => {
    const id = (compra.id || '').toString().toLowerCase();
    const proveedor_nombre = (compra.proveedor_nombre || '').toString().toLowerCase();
    const productos = (compra.productos || '').toString().toLowerCase();
    const total = (compra.total || '').toString().toLowerCase();
    
    return id.includes(searchTerm) ||
           proveedor_nombre.includes(searchTerm) ||
           productos.includes(searchTerm) ||
           total.includes(searchTerm);
  });
  displayCompras(filteredCompras);
}

// Inicializar buscadores
function initializeSearchListeners() {
  // Buscador de clientes
  const searchCliente = document.getElementById('searchCliente');
  if (searchCliente) {
    searchCliente.addEventListener('input', searchClientes);
  }
  
  // Buscador de productos
  const searchProducto = document.getElementById('searchProducto');
  if (searchProducto) {
    searchProducto.addEventListener('input', searchProductos);
  }
  
  // Buscador de ventas
  const searchVenta = document.getElementById('searchVenta');
  if (searchVenta) {
    searchVenta.addEventListener('input', searchVentas);
  }
  
  // Buscador de empleados
  const searchEmpleado = document.getElementById('searchEmpleado');
  if (searchEmpleado) {
    searchEmpleado.addEventListener('input', searchEmpleados);
  }
  
  // Buscador de proveedores
  const searchProveedor = document.getElementById('searchProveedor');
  if (searchProveedor) {
    searchProveedor.addEventListener('input', searchProveedores);
  }
  
  // Buscador de compras
  const searchCompra = document.getElementById('searchCompra');
  if (searchCompra) {
    searchCompra.addEventListener('input', searchCompras);
  }
} 