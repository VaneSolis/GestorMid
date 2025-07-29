// Variables globales
let currentModule = null;
let databaseInfo = null;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación iniciada');
    checkConnection();
    loadDatabaseInfo();
});

// Función para verificar la conexión a la BD
async function checkConnection() {
    try {
        const response = await fetch('/api/test-connection');
        const data = await response.json();
        
        const statusElement = document.getElementById('connectionStatus');
        
        if (data.success) {
            statusElement.innerHTML = `
                <div class="alert alert-success mb-0">
                    <i class="fas fa-check-circle me-2"></i>
                    ${data.message}
                </div>
            `;
        } else {
            statusElement.innerHTML = `
                <div class="alert alert-danger mb-0">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    ${data.message}
                </div>
            `;
        }
    } catch (error) {
        const statusElement = document.getElementById('connectionStatus');
        statusElement.innerHTML = `
            <div class="alert alert-danger mb-0">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error de conexión: ${error.message}
            </div>
        `;
    }
}

// Función para cargar información de la BD
async function loadDatabaseInfo() {
    try {
        const response = await fetch('/api/database-info');
        const data = await response.json();
        
        const infoElement = document.getElementById('databaseInfo');
        
        if (data.success) {
            databaseInfo = data;
            const tableCount = data.tables.length;
            
            infoElement.innerHTML = `
                <div class="alert alert-info mb-0">
                    <i class="fas fa-info-circle me-2"></i>
                    ${tableCount} tabla${tableCount !== 1 ? 's' : ''} encontrada${tableCount !== 1 ? 's' : ''}
                </div>
            `;
            
            // Mostrar información detallada en consola
            console.log('📊 Información de la base de datos:', data);
        } else {
            infoElement.innerHTML = `
                <div class="alert alert-warning mb-0">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    ${data.message}
                </div>
            `;
        }
    } catch (error) {
        const infoElement = document.getElementById('databaseInfo');
        infoElement.innerHTML = `
            <div class="alert alert-danger mb-0">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error al cargar información: ${error.message}
            </div>
        `;
    }
}

// Función para cargar módulos
function loadModule(moduleName) {
    currentModule = moduleName;
    console.log(`📦 Cargando módulo: ${moduleName}`);
    
    // Ocultar módulos y mostrar área de contenido
    document.querySelector('.row.g-4').style.display = 'none';
    document.getElementById('contentArea').style.display = 'block';
    
    // Cargar contenido del módulo
    loadModuleContent(moduleName);
    
    // Cargar datos del módulo
    loadModuleData(moduleName);
}

// Función para cargar contenido específico del módulo
function loadModuleContent(moduleName) {
    const contentArea = document.getElementById('contentArea');
    
    switch(moduleName) {
        case 'clientes':
            contentArea.innerHTML = createClientesModule();
            break;
        case 'productos':
            contentArea.innerHTML = createProductosModule();
            break;
        case 'ventas':
            contentArea.innerHTML = createVentasModule();
            break;
        case 'compras':
            contentArea.innerHTML = createComprasModule();
            break;
        case 'empleados':
            contentArea.innerHTML = createEmpleadosModule();
            break;
        case 'proveedores':
            contentArea.innerHTML = createProveedoresModule();
            break;
        case 'reportes':
            contentArea.innerHTML = createReportesModule();
            break;
        case 'configuracion':
            contentArea.innerHTML = createConfiguracionModule();
            break;
        default:
            contentArea.innerHTML = '<div class="alert alert-warning">Módulo no implementado</div>';
    }
    
    // Agregar botón de regreso
    addBackButton();
}

// Función para agregar botón de regreso
function addBackButton() {
    const contentArea = document.getElementById('contentArea');
    const backButton = document.createElement('div');
    backButton.className = 'mb-3';
    backButton.innerHTML = `
        <button class="btn btn-outline-light" onclick="goBack()">
            <i class="fas fa-arrow-left me-2"></i>
            Volver al Inicio
        </button>
    `;
    contentArea.insertBefore(backButton, contentArea.firstChild);
}

// Función para regresar al inicio
function goBack() {
    document.querySelector('.row.g-4').style.display = 'flex';
    document.getElementById('contentArea').style.display = 'none';
    currentModule = null;
}

// Funciones para crear contenido de módulos
function createClientesModule() {
    return `
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h4><i class="fas fa-users me-2"></i>Gestión de Clientes</h4>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <button class="btn btn-success" onclick="showClientForm()">
                            <i class="fas fa-plus me-2"></i>Nuevo Cliente
                        </button>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Buscar cliente..." id="searchClient">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="clientesTable">
                            <tr>
                                <td colspan="5" class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function createProductosModule() {
    return `
        <div class="card">
            <div class="card-header bg-success text-white">
                <h4><i class="fas fa-box me-2"></i>Gestión de Productos</h4>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <button class="btn btn-success" onclick="showProductForm()">
                            <i class="fas fa-plus me-2"></i>Nuevo Producto
                        </button>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Buscar producto..." id="searchProduct">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="productosTable">
                            <tr>
                                <td colspan="5" class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function createVentasModule() {
    return `
        <div class="card">
            <div class="card-header bg-warning text-dark">
                <h4><i class="fas fa-shopping-cart me-2"></i>Gestión de Ventas</h4>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <button class="btn btn-success" onclick="showVentaForm()">
                            <i class="fas fa-plus me-2"></i>Nueva Venta
                        </button>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Buscar venta..." id="searchVenta">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="ventasTable">
                            <tr>
                                <td colspan="6" class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function createComprasModule() {
    return `
        <div class="card">
            <div class="card-header bg-info text-white">
                <h4><i class="fas fa-truck me-2"></i>Gestión de Compras</h4>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <button class="btn btn-success" onclick="showCompraForm()">
                            <i class="fas fa-plus me-2"></i>Nueva Compra
                        </button>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Buscar compra..." id="searchCompra">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Proveedor</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="comprasTable">
                            <tr>
                                <td colspan="6" class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function createEmpleadosModule() {
    return `
        <div class="card">
            <div class="card-header bg-secondary text-white">
                <h4><i class="fas fa-user-tie me-2"></i>Gestión de Empleados</h4>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <button class="btn btn-success" onclick="showEmpleadoForm()">
                            <i class="fas fa-plus me-2"></i>Nuevo Empleado
                        </button>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Buscar empleado..." id="searchEmpleado">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cargo</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="empleadosTable">
                            <tr>
                                <td colspan="5" class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function createProveedoresModule() {
    return `
        <div class="card">
            <div class="card-header bg-danger text-white">
                <h4><i class="fas fa-handshake me-2"></i>Gestión de Proveedores</h4>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <button class="btn btn-success" onclick="showProveedorForm()">
                            <i class="fas fa-plus me-2"></i>Nuevo Proveedor
                        </button>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Buscar proveedor..." id="searchProveedor">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Contacto</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="proveedoresTable">
                            <tr>
                                <td colspan="5" class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function createReportesModule() {
    return `
        <div class="card">
            <div class="card-header bg-dark text-white">
                <h4><i class="fas fa-chart-bar me-2"></i>Reportes y Análisis</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <i class="fas fa-chart-line fa-3x text-primary mb-3"></i>
                                <h5>Ventas del Día</h5>
                                <button class="btn btn-primary" onclick="generarReporteVentas()">
                                    Generar Reporte
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <i class="fas fa-chart-pie fa-3x text-success mb-3"></i>
                                <h5>Inventario</h5>
                                <button class="btn btn-success" onclick="generarReporteInventario()">
                                    Generar Reporte
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <i class="fas fa-chart-area fa-3x text-warning mb-3"></i>
                                <h5>Compras</h5>
                                <button class="btn btn-warning" onclick="generarReporteCompras()">
                                    Generar Reporte
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createConfiguracionModule() {
    return `
        <div class="card">
            <div class="card-header bg-muted text-dark">
                <h4><i class="fas fa-cog me-2"></i>Configuración del Sistema</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h5>Configuración de Base de Datos</h5>
                        <div class="mb-3">
                            <label class="form-label">Host:</label>
                            <input type="text" class="form-control" value="127.0.0.1" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Puerto:</label>
                            <input type="text" class="form-control" value="3306" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Usuario:</label>
                            <input type="text" class="form-control" value="root" readonly>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h5>Información del Sistema</h5>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <strong>Versión:</strong> 1.0.0
                            </li>
                            <li class="list-group-item">
                                <strong>Desarrollado por:</strong> Sistema de Gestión
                            </li>
                            <li class="list-group-item">
                                <strong>Fecha:</strong> ${new Date().toLocaleDateString()}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Funciones para formularios
function showClientForm() {
    const modal = `
        <div class="modal fade" id="clienteModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo Cliente</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="clienteForm">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Teléfono</label>
                                <input type="tel" class="form-control" name="telefono">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" name="email">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Dirección</label>
                                <textarea class="form-control" name="direccion" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveCliente()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('clienteModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar modal
    const modalElement = new bootstrap.Modal(document.getElementById('clienteModal'));
    modalElement.show();
}

function showProductForm() {
    const modal = `
        <div class="modal fade" id="productoModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo Producto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="productoForm">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Precio *</label>
                                <input type="number" class="form-control" name="precio" step="0.01" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Stock *</label>
                                <input type="number" class="form-control" name="stock" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Descripción</label>
                                <textarea class="form-control" name="descripcion" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveProducto()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('productoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar modal
    const modalElement = new bootstrap.Modal(document.getElementById('productoModal'));
    modalElement.show();
}

function showVentaForm() {
    alert('Formulario de venta - En desarrollo');
}

function showCompraForm() {
    alert('Formulario de compra - En desarrollo');
}

function showEmpleadoForm() {
    alert('Formulario de empleado - En desarrollo');
}

function showProveedorForm() {
    alert('Formulario de proveedor - En desarrollo');
}

// Funciones para guardar datos
async function saveCliente() {
    const form = document.getElementById('clienteForm');
    const formData = new FormData(form);
    
    const data = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        direccion: formData.get('direccion')
    };
    
    const success = await insertCliente(data);
    if (success) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('clienteModal'));
        modal.hide();
        form.reset();
    }
}

async function saveProducto() {
    const form = document.getElementById('productoForm');
    const formData = new FormData(form);
    
    const data = {
        nombre: formData.get('nombre'),
        precio: parseFloat(formData.get('precio')),
        stock: parseInt(formData.get('stock')),
        descripcion: formData.get('descripcion')
    };
    
    const success = await insertProducto(data);
    if (success) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
        modal.hide();
        form.reset();
    }
}

function generarReporteVentas() {
    alert('Reporte de ventas - En desarrollo');
}

function generarReporteInventario() {
    alert('Reporte de inventario - En desarrollo');
}

function generarReporteCompras() {
    alert('Reporte de compras - En desarrollo');
} 