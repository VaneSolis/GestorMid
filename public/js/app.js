// Variables globales
let currentModule = null;
let databaseInfo = null;

// Agregar estilos personalizados para mantener consistencia de colores
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary {
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
        .btn-primary:hover {
            background-color: #1e7e34 !important;
            border-color: #1e7e34 !important;
        }
        .btn-secondary {
            background-color: #ffc107 !important;
            border-color: #ffc107 !important;
            color: #333 !important;
        }
        .btn-secondary:hover {
            background-color: #ffeb3b !important;
            border-color: #ffeb3b !important;
            color: #333 !important;
        }
        .alert-success {
            background-color: #d4edda !important;
            border-color: #c3e6cb !important;
            color: #155724 !important;
        }
        .alert-danger {
            background-color: #f8d7da !important;
            border-color: #f5c6cb !important;
            color: #721c24 !important;
        }
        .alert-info {
            background-color: #d1ecf1 !important;
            border-color: #bee5eb !important;
            color: #0c5460 !important;
        }
        .alert-warning {
            background-color: #fff3cd !important;
            border-color: #ffeaa7 !important;
            color: #856404 !important;
        }
        .text-primary {
            color: #28a745 !important;
        }
        .text-success {
            color: #28a745 !important;
        }
        .text-warning {
            color: #ffc107 !important;
        }
        .text-info {
            color: #1e7e34 !important;
        }
        .text-secondary {
            color: #ffc107 !important;
        }
        .text-danger {
            color: #1e7e34 !important;
        }
        .text-dark {
            color: #1e7e34 !important;
        }
        .text-muted {
            color: #28a745 !important;
        }
        .card-header {
            background-color: #28a745 !important;
            color: white !important;
        }
        .table thead th {
            background-color: #28a745 !important;
            color: white !important;
            border-color: #1e7e34 !important;
        }
        .modal-header {
            background-color: #28a745 !important;
            color: white !important;
        }
        .modal-header .btn-close {
            filter: invert(1);
        }
        .autocomplete-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-top: none;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .autocomplete-item {
            padding: 8px 12px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        }
        .autocomplete-item:hover {
            background-color: #f8f9fa;
        }
        .autocomplete-item:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación iniciada');
    addCustomStyles();
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
    
    // Inicializar buscadores después de cargar el contenido
    setTimeout(() => {
        initializeSearchListeners();
    }, 100);
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
                            <input type="text" class="form-control" placeholder="Buscar cliente..." id="searchCliente">
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
                            <input type="text" class="form-control" placeholder="Buscar producto..." id="searchProducto">
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
                                <th>Unidad</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="productosTable">
                            <tr>
                                <td colspan="7" class="text-center">
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
                                <th>Empleado</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="ventasTable">
                            <tr>
                                <td colspan="7" class="text-center">
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
                                <th>Puesto</th>
                                <th>Fecha Contratación</th>
                                <th>Salario</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="empleadosTable">
                            <tr>
                                <td colspan="7" class="text-center">
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
                                <th>Producto Suministrado</th>
                                <th>Teléfono</th>
                                <th>Frecuencia</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="proveedoresTable">
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
                                <input type="number" class="form-control" name="stock" step="0.01" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Unidad de Medida *</label>
                                <input type="text" class="form-control" name="unidad_medida" placeholder="ej: kg, litro, bolsa" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Categoría *</label>
                                <input type="text" class="form-control" name="categoria" placeholder="ej: Tortillas, Bebidas, Botanas" required>
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

function showProductEditForm(producto) {
    const modal = `
        <div class="modal fade" id="productoModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Producto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="productoForm">
                            <input type="hidden" name="id" value="${producto.id}">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" value="${producto.nombre}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Precio *</label>
                                <input type="number" class="form-control" name="precio" step="0.01" value="${producto.precio}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Stock *</label>
                                <input type="number" class="form-control" name="stock" step="0.01" value="${producto.stock || 0}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Unidad de Medida *</label>
                                <input type="text" class="form-control" name="unidad_medida" placeholder="ej: kg, litro, bolsa" value="${producto.unidad_medida}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Categoría *</label>
                                <input type="text" class="form-control" name="categoria" placeholder="ej: Tortillas, Bebidas, Botanas" value="${producto.categoria}" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveProductoEdit()">Actualizar</button>
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
    // Cargar proveedores y productos para los selectores
    loadProveedores();
    loadProductos();
    
    const modal = `
        <div class="modal fade" id="compraModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nueva Compra</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="compraForm">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3" style="position: relative;">
                                        <label class="form-label">Proveedor *</label>
                                        <input type="text" class="form-control" id="proveedorInput" placeholder="Escribir nombre del proveedor" required>
                                        <input type="hidden" name="proveedor_id" id="proveedor_id_hidden">
                                        <div id="proveedorAutocomplete" class="autocomplete-list" style="display: none;"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Fecha *</label>
                                        <input type="date" class="form-control" name="fecha" required>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Producto</label>
                                        <select class="form-control" id="productoSelect">
                                            <option value="">Seleccionar producto</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="mb-3">
                                        <label class="form-label">Cantidad</label>
                                        <input type="number" class="form-control" id="cantidadInput" min="1" value="1">
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="mb-3">
                                        <label class="form-label">Precio Unit.</label>
                                        <input type="number" class="form-control" id="precioInput" step="0.01" min="0">
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="mb-3">
                                        <label class="form-label">Subtotal</label>
                                        <input type="text" class="form-control" id="subtotalInput" readonly>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="mb-3">
                                        <label class="form-label">&nbsp;</label>
                                        <button type="button" class="btn btn-success w-100" onclick="addProductoToCompra()">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <h6>Productos de la Compra</h6>
                                <div id="productosCompra" class="border rounded p-3" style="min-height: 100px;">
                                    <p class="text-muted text-center">No hay productos agregados</p>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Total de la Compra</label>
                                        <input type="text" class="form-control" id="totalCompra" readonly value="0.00">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveCompra()">Guardar Compra</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('compraModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar modal
    const modalElement = new bootstrap.Modal(document.getElementById('compraModal'));
    modalElement.show();
    
    // Configurar fecha actual
    document.querySelector('input[name="fecha"]').value = new Date().toISOString().split('T')[0];
    
    // Configurar eventos para calcular subtotal
    document.getElementById('cantidadInput').addEventListener('input', calcularSubtotal);
    document.getElementById('precioInput').addEventListener('input', calcularSubtotal);
    
    // Configurar evento para cargar precio del producto
    document.getElementById('productoSelect').addEventListener('change', cargarPrecioProducto);
    
    // Configurar autocomplete para proveedores
    setupProveedorAutocomplete();
    
    // Inicializar variables globales para la compra
    window.productosCompra = [];
    window.totalCompra = 0;
}

function showEmpleadoForm() {
    const modal = `
        <div class="modal fade" id="empleadoModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo Empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="empleadoForm">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Puesto *</label>
                                <input type="text" class="form-control" name="puesto" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Fecha de Contratación *</label>
                                <input type="date" class="form-control" name="fecha_contratacion" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Salario *</label>
                                <input type="number" class="form-control" name="salario" step="0.01" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Estatus *</label>
                                <select class="form-control" name="estatus" required>
                                    <option value="">Seleccionar estatus</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Vacaciones">Vacaciones</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveEmpleado()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('empleadoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar modal
    const modalElement = new bootstrap.Modal(document.getElementById('empleadoModal'));
    modalElement.show();
}

function showEmpleadoEditForm(empleado) {
    const modal = `
        <div class="modal fade" id="empleadoModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="empleadoForm">
                            <input type="hidden" name="id" value="${empleado.id}">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" value="${empleado.nombre}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Puesto *</label>
                                <input type="text" class="form-control" name="puesto" value="${empleado.puesto}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Fecha de Contratación *</label>
                                <input type="date" class="form-control" name="fecha_contratacion" value="${empleado.fecha_contratacion ? new Date(empleado.fecha_contratacion).toISOString().split('T')[0] : ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Salario *</label>
                                <input type="number" class="form-control" name="salario" step="0.01" value="${empleado.salario}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Estatus *</label>
                                <select class="form-control" name="estatus" required>
                                    <option value="">Seleccionar estatus</option>
                                    <option value="Activo" ${empleado.estatus === 'Activo' ? 'selected' : ''}>Activo</option>
                                    <option value="Inactivo" ${empleado.estatus === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
                                    <option value="Vacaciones" ${empleado.estatus === 'Vacaciones' ? 'selected' : ''}>Vacaciones</option>
                                    <option value="Baja" ${empleado.estatus === 'Baja' ? 'selected' : ''}>Baja</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveEmpleadoEdit()">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('empleadoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar modal
    const modalElement = new bootstrap.Modal(document.getElementById('empleadoModal'));
    modalElement.show();
}

function showProveedorForm() {
    const modal = `
        <div class="modal fade" id="proveedorModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo Proveedor</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="proveedorForm">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Teléfono *</label>
                                <input type="tel" class="form-control" name="telefono" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Producto Suministrado *</label>
                                <input type="text" class="form-control" name="producto_suministrado" placeholder="ej: Masa de maíz, Harina, Bolsas" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Frecuencia de Entrega *</label>
                                <select class="form-control" name="frecuencia_entrega" required>
                                    <option value="">Seleccionar frecuencia</option>
                                    <option value="Diario">Diario</option>
                                    <option value="Semanal">Semanal</option>
                                    <option value="Quincenal">Quincenal</option>
                                    <option value="Mensual">Mensual</option>
                                    <option value="Ocasional">Ocasional</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveProveedor()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('proveedorModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar modal
    const modalElement = new bootstrap.Modal(document.getElementById('proveedorModal'));
    modalElement.show();
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

// Función para editar cliente
async function editCliente(id) {
    try {
        // Buscar el cliente en los datos cargados
        const cliente = allClientes.find(c => c.id == id);
        if (!cliente) {
            showAlert('Cliente no encontrado', 'danger');
            return;
        }
        
        showClienteEditForm(cliente);
    } catch (error) {
        showAlert('Error al cargar datos del cliente: ' + error.message, 'danger');
    }
}

// Función para mostrar formulario de edición de cliente
function showClienteEditForm(cliente) {
    const modal = `
        <div class="modal fade" id="clienteModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Cliente</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="clienteForm">
                            <input type="hidden" name="id" value="${cliente.id}">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" value="${cliente.nombre || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Teléfono</label>
                                <input type="tel" class="form-control" name="telefono" value="${cliente.telefono || ''}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" value="${cliente.email || ''}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Dirección</label>
                                <textarea class="form-control" name="direccion" rows="3">${cliente.direccion || ''}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveClienteEdit()">Actualizar</button>
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

// Función para guardar edición de cliente
async function saveClienteEdit() {
    const form = document.getElementById('clienteForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    const data = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        direccion: formData.get('direccion')
    };
    
    try {
        const response = await fetch(`/api/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Cliente actualizado correctamente', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('clienteModal'));
            modal.hide();
            form.reset();
            loadClientes();
        } else {
            showAlert('Error al actualizar cliente: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
}

// Función para eliminar cliente
async function deleteCliente(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/clientes/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Cliente eliminado correctamente', 'success');
            loadClientes();
        } else {
            showAlert('Error al eliminar cliente: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
}

async function saveProducto() {
    const form = document.getElementById('productoForm');
    const formData = new FormData(form);
    
    const data = {
        nombre: formData.get('nombre'),
        precio: parseFloat(formData.get('precio')),
        stock: parseFloat(formData.get('stock')),
        unidad_medida: formData.get('unidad_medida'),
        categoria: formData.get('categoria')
    };
    
    const success = await insertProducto(data);
    if (success) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
        modal.hide();
        form.reset();
    }
}

async function saveEmpleado() {
    const form = document.getElementById('empleadoForm');
    const formData = new FormData(form);
    
    const data = {
        nombre: formData.get('nombre'),
        puesto: formData.get('puesto'),
        fecha_contratacion: formData.get('fecha_contratacion'),
        salario: parseFloat(formData.get('salario')),
        estatus: formData.get('estatus')
    };
    
    try {
        const response = await fetch('/api/empleados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Empleado agregado correctamente', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('empleadoModal'));
            modal.hide();
            form.reset();
            loadEmpleados();
        } else {
            showAlert('Error al agregar empleado: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
}

async function saveEmpleadoEdit() {
    const form = document.getElementById('empleadoForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    // Obtener la fecha y formatearla correctamente
    const fechaInput = formData.get('fecha_contratacion');
    let fechaFormateada = fechaInput;
    
    // Si la fecha viene en formato ISO, convertirla a YYYY-MM-DD
    if (fechaInput && fechaInput.includes('T')) {
        const fecha = new Date(fechaInput);
        fechaFormateada = fecha.toISOString().split('T')[0];
    }
    
    const data = {
        nombre: formData.get('nombre'),
        puesto: formData.get('puesto'),
        fecha_contratacion: fechaFormateada,
        salario: parseFloat(formData.get('salario')),
        estatus: formData.get('estatus')
    };
    
    try {
        const response = await fetch(`/api/empleados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Empleado actualizado correctamente', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('empleadoModal'));
            modal.hide();
            form.reset();
            loadEmpleados();
        } else {
            showAlert('Error al actualizar empleado: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
}

async function saveProductoEdit() {
    const form = document.getElementById('productoForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    const data = {
        nombre: formData.get('nombre'),
        precio: parseFloat(formData.get('precio')),
        stock: parseFloat(formData.get('stock')),
        unidad_medida: formData.get('unidad_medida'),
        categoria: formData.get('categoria')
    };
    
    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Producto actualizado correctamente', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
            modal.hide();
            form.reset();
            loadProductos();
        } else {
            showAlert('Error al actualizar producto: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
}

async function saveProveedor() {
    const form = document.getElementById('proveedorForm');
    const formData = new FormData(form);
    
    const data = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        producto_suministrado: formData.get('producto_suministrado'),
        frecuencia_entrega: formData.get('frecuencia_entrega')
    };
    
    try {
        const response = await fetch('/api/proveedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Proveedor agregado correctamente', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('proveedorModal'));
            modal.hide();
            form.reset();
            loadProveedores();
        } else {
            showAlert('Error al agregar proveedor: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
}

// Función para editar proveedor
async function editProveedor(id) {
    try {
        // Buscar el proveedor en los datos cargados
        const proveedor = allProveedores.find(p => p.id == id);
        if (!proveedor) {
            showAlert('Proveedor no encontrado', 'danger');
            return;
        }
        
        showProveedorEditForm(proveedor);
    } catch (error) {
        showAlert('Error al cargar datos del proveedor: ' + error.message, 'danger');
    }
}

// Función para mostrar formulario de edición de proveedor
function showProveedorEditForm(proveedor) {
    const modal = `
        <div class="modal fade" id="proveedorModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Proveedor</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="proveedorForm">
                            <input type="hidden" name="id" value="${proveedor.id}">
                            <div class="mb-3">
                                <label class="form-label">Nombre *</label>
                                <input type="text" class="form-control" name="nombre" value="${proveedor.nombre || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Teléfono *</label>
                                <input type="tel" class="form-control" name="telefono" value="${proveedor.telefono || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Producto Suministrado *</label>
                                <input type="text" class="form-control" name="producto_suministrado" value="${proveedor.producto_suministrado || ''}" placeholder="ej: Masa de maíz, Harina, Bolsas" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Frecuencia de Entrega *</label>
                                <select class="form-control" name="frecuencia_entrega" required>
                                    <option value="">Seleccionar frecuencia</option>
                                    <option value="Diario" ${proveedor.frecuencia_entrega === 'Diario' ? 'selected' : ''}>Diario</option>
                                    <option value="Semanal" ${proveedor.frecuencia_entrega === 'Semanal' ? 'selected' : ''}>Semanal</option>
                                    <option value="Quincenal" ${proveedor.frecuencia_entrega === 'Quincenal' ? 'selected' : ''}>Quincenal</option>
                                    <option value="Mensual" ${proveedor.frecuencia_entrega === 'Mensual' ? 'selected' : ''}>Mensual</option>
                                    <option value="Ocasional" ${proveedor.frecuencia_entrega === 'Ocasional' ? 'selected' : ''}>Ocasional</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveProveedorEdit()">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('proveedorModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Mostrar modal
    const modalElement = new bootstrap.Modal(document.getElementById('proveedorModal'));
    modalElement.show();
}

// Función para guardar edición de proveedor
async function saveProveedorEdit() {
    const form = document.getElementById('proveedorForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    const data = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        producto_suministrado: formData.get('producto_suministrado'),
        frecuencia_entrega: formData.get('frecuencia_entrega')
    };
    
    try {
        const response = await fetch(`/api/proveedores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Proveedor actualizado correctamente', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('proveedorModal'));
            modal.hide();
            form.reset();
            loadProveedores();
        } else {
            showAlert('Error al actualizar proveedor: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
}

// Función para eliminar proveedor
async function deleteProveedor(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/proveedores/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Proveedor eliminado correctamente', 'success');
            loadProveedores();
        } else {
            showAlert('Error al eliminar proveedor: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
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

// ========================================
// FUNCIONES AUXILIARES PARA COMPRAS
// ========================================

// Función para calcular subtotal
function calcularSubtotal() {
    const cantidad = parseFloat(document.getElementById('cantidadInput').value) || 0;
    const precio = parseFloat(document.getElementById('precioInput').value) || 0;
    const subtotal = cantidad * precio;
    document.getElementById('subtotalInput').value = subtotal.toFixed(2);
}

// Función para cargar precio del producto seleccionado
function cargarPrecioProducto() {
    const productoSelect = document.getElementById('productoSelect');
    const precioInput = document.getElementById('precioInput');
    const productoId = productoSelect.value;
    
    if (productoId && window.allProductos) {
        const producto = window.allProductos.find(p => p.id == productoId);
        if (producto) {
            precioInput.value = producto.precio;
            calcularSubtotal();
        }
    }
}

// Función para agregar producto a la compra
function addProductoToCompra() {
    const productoSelect = document.getElementById('productoSelect');
    const cantidadInput = document.getElementById('cantidadInput');
    const precioInput = document.getElementById('precioInput');
    const subtotalInput = document.getElementById('subtotalInput');
    
    const productoId = productoSelect.value;
    const cantidad = parseFloat(cantidadInput.value);
    const precio = parseFloat(precioInput.value);
    const subtotal = parseFloat(subtotalInput.value);
    
    if (!productoId) {
        showAlert('Selecciona un producto', 'warning');
        return;
    }
    
    if (!cantidad || cantidad <= 0) {
        showAlert('Ingresa una cantidad válida', 'warning');
        return;
    }
    
    if (!precio || precio <= 0) {
        showAlert('Ingresa un precio válido', 'warning');
        return;
    }
    
    // Buscar información del producto
    const producto = window.allProductos.find(p => p.id == productoId);
    if (!producto) {
        showAlert('Producto no encontrado', 'danger');
        return;
    }
    
    // Verificar si el producto ya está en la lista
    const existingIndex = window.productosCompra.findIndex(p => p.producto_id == productoId);
    if (existingIndex >= 0) {
        // Actualizar cantidad existente
        window.productosCompra[existingIndex].cantidad += cantidad;
        window.productosCompra[existingIndex].subtotal = window.productosCompra[existingIndex].cantidad * precio;
    } else {
        // Agregar nuevo producto
        window.productosCompra.push({
            producto_id: productoId,
            nombre: producto.nombre,
            cantidad: cantidad,
            precio_unitario: precio,
            subtotal: subtotal
        });
    }
    
    // Actualizar total
    window.totalCompra = window.productosCompra.reduce((sum, p) => sum + p.subtotal, 0);
    
    // Actualizar interfaz
    actualizarListaProductosCompra();
    actualizarTotalCompra();
    
    // Limpiar campos
    productoSelect.value = '';
    cantidadInput.value = '1';
    precioInput.value = '';
    subtotalInput.value = '';
}

// Función para actualizar lista de productos en la compra
function actualizarListaProductosCompra() {
    const container = document.getElementById('productosCompra');
    
    if (window.productosCompra.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No hay productos agregados</p>';
        return;
    }
    
    const html = window.productosCompra.map((producto, index) => `
        <div class="row align-items-center mb-2">
            <div class="col-md-4">
                <strong>${producto.nombre}</strong>
            </div>
            <div class="col-md-2">
                ${producto.cantidad}
            </div>
            <div class="col-md-2">
                $${producto.precio_unitario.toFixed(2)}
            </div>
            <div class="col-md-2">
                $${producto.subtotal.toFixed(2)}
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger btn-sm" onclick="removeProductoFromCompra(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Función para remover producto de la compra
function removeProductoFromCompra(index) {
    window.productosCompra.splice(index, 1);
    window.totalCompra = window.productosCompra.reduce((sum, p) => sum + p.subtotal, 0);
    actualizarListaProductosCompra();
    actualizarTotalCompra();
}

// Función para actualizar total de la compra
function actualizarTotalCompra() {
    document.getElementById('totalCompra').value = window.totalCompra.toFixed(2);
}

// Función para guardar compra
// Función para configurar autocomplete de proveedores
function setupProveedorAutocomplete() {
    const proveedorInput = document.getElementById('proveedorInput');
    const proveedorAutocomplete = document.getElementById('proveedorAutocomplete');
    const proveedorIdHidden = document.getElementById('proveedor_id_hidden');
    
    if (!proveedorInput) return;
    
    proveedorInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            proveedorAutocomplete.style.display = 'none';
            return;
        }
        
        const filteredProveedores = allProveedores.filter(proveedor => 
            proveedor.nombre.toLowerCase().includes(searchTerm)
        );
        
        if (filteredProveedores.length > 0) {
            proveedorAutocomplete.innerHTML = filteredProveedores.map(proveedor => 
                `<div class="autocomplete-item" data-id="${proveedor.id}" data-name="${proveedor.nombre}">
                    ${proveedor.nombre}
                </div>`
            ).join('');
            proveedorAutocomplete.style.display = 'block';
        } else {
            proveedorAutocomplete.style.display = 'none';
        }
    });
    
    // Manejar clic en elementos del autocomplete
    proveedorAutocomplete.addEventListener('click', function(e) {
        if (e.target.classList.contains('autocomplete-item')) {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            
            proveedorInput.value = name;
            proveedorIdHidden.value = id;
            proveedorAutocomplete.style.display = 'none';
        }
    });
    
    // Ocultar autocomplete al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!proveedorInput.contains(e.target) && !proveedorAutocomplete.contains(e.target)) {
            proveedorAutocomplete.style.display = 'none';
        }
    });
}

async function saveCompra() {
    const form = document.getElementById('compraForm');
    const formData = new FormData(form);
    
    const proveedor_id = formData.get('proveedor_id');
    const fecha = formData.get('fecha');
    
    if (!proveedor_id) {
        showAlert('Selecciona un proveedor', 'warning');
        return;
    }
    
    if (!fecha) {
        showAlert('Selecciona una fecha', 'warning');
        return;
    }
    
    if (window.productosCompra.length === 0) {
        showAlert('Agrega al menos un producto a la compra', 'warning');
        return;
    }
    
    const data = {
        proveedor_id: parseInt(proveedor_id),
        total: window.totalCompra,
        fecha: fecha,
        productos: window.productosCompra
    };
    
    try {
        const response = await fetch('/api/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Compra registrada correctamente', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('compraModal'));
            modal.hide();
            form.reset();
            window.productosCompra = [];
            window.totalCompra = 0;
            loadCompras();
        } else {
            showAlert('Error al registrar compra: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error de conexión: ' + error.message, 'danger');
    }
} 