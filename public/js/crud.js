// ========================================
// FUNCIONES CRUD - CLIENTES
// ========================================

// Cargar clientes
async function loadClientes() {
  try {
    const response = await fetch('/api/clientes');
    const data = await response.json();
    
    if (data.success) {
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
      displayProductos(data.data);
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
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay productos registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = productos.map(producto => `
    <tr>
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.stock}</td>
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
// FUNCIONES CRUD - VENTAS
// ========================================

// Cargar ventas
async function loadVentas() {
  try {
    const response = await fetch('/api/ventas');
    const data = await response.json();
    
    if (data.success) {
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
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay ventas registradas</td></tr>';
    return;
  }
  
  tbody.innerHTML = ventas.map(venta => `
    <tr>
      <td>${venta.id}</td>
      <td>${venta.cliente_nombre || 'Cliente no registrado'}</td>
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
// FUNCIONES CRUD - PROVEEDORES
// ========================================

// Cargar proveedores
async function loadProveedores() {
  try {
    const response = await fetch('/api/proveedores');
    const data = await response.json();
    
    if (data.success) {
      displayProveedores(data.data);
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
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay proveedores registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = proveedores.map(proveedor => `
    <tr>
      <td>${proveedor.id}</td>
      <td>${proveedor.nombre}</td>
      <td>${proveedor.contacto || '-'}</td>
      <td>${proveedor.telefono || '-'}</td>
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