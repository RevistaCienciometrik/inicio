document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Definiendo los usuarios y sus respectivas páginas de destino y roles
    const users = {
        "admin@sena.edu.co:admin123": {
            page: "../admin_cemter/admin.html",
            role: "admin"
        }, 
        "autor@sena.edu.co:autor123": {
            page: "../admin_cemter/autor_panel.html",
            role: "autor"
        },              
        "revisor@sena.edu.co:revisor123": {
            page: "../admin_cemter/revisor.html",
            role: "revisor"
        },
        "editorweb@sena.edu.co:editor123": {
            page: "../admin_cemter/admin_edit_index.html",
            role: "editor"
        }   
    };
    
    // Event listener para el formulario de login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el envío del formulario por defecto
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const credentials = `${email}:${password}`; // Combinando email y contraseña para la búsqueda
        
        if (users[credentials]) { // Verifica si las credenciales existen en el objeto users
            const userData = users[credentials];
            
            // Guardar información de sesión en sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userRole', userData.role);
            sessionStorage.setItem('userEmail', email);
            
            // Establecer tiempo de expiración de la sesión (2 horas)
            const sessionExpiry = new Date().getTime() + (2 * 60 * 60 * 1000);
            sessionStorage.setItem('sessionExpiry', sessionExpiry);
            
            // Redirige a la página correspondiente
            window.location.href = userData.page;
        } else {
            alert('Credenciales incorrectas. Por favor, intente de nuevo.');
        }
    });
});