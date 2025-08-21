// Función para verificar si el usuario está autenticado
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const sessionExpiry = sessionStorage.getItem('sessionExpiry');
    
    if (isLoggedIn !== 'true' || !sessionExpiry || new Date().getTime() > sessionExpiry) {
        // Si no está autenticado o la sesión expiró, redirigir al login
        logout();
        return false;
    }
    return true;
}

// Función para cerrar sesión
function logout() {
    // Eliminar todos los datos de sesión
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('sessionExpiry'); // Es buena práctica también eliminar la fecha de expiración
    
    // Redirigir al login con la nueva URL
    window.location.href = 'https://revistacienciometrik.github.io/inicio/login/login.html';
}

// Función para obtener el rol del usuario actual
function getUserRole() {
    return sessionStorage.getItem('userRole');
}

// Función para obtener el email del usuario actual
function getUserEmail() {
    return sessionStorage.getItem('userEmail');
}

// Se ejecuta una vez que el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el enlace dentro del li del menú con el ID 'logout-btnn'
    const logoutLink = document.querySelector('#logout-btnn a');
    
    // Verifica si el enlace existe para evitar errores
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la navegación por defecto del enlace
            logout(); // Llama a la función de cierre de sesión
        });
    }
});