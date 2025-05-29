document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    // La funcionalidad de "Olvidé la contraseña" se maneja directamente en login.html
    // por lo que esta línea ya no es necesaria aquí mientras no se programe una funcionalidad backend:
    // const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Definiendos los usuarios y sus respectivas páginas de destino
    // Quito la oción "invitado sena" porque la veo irrelevante:
    // "invitado@sena.edu.co:invitado123": "../index.html",  
    const users = {
        "admin@sena.edu.co:admin123": "../admin_cemter/admin.html", 
        "autor@sena.edu.co:autor123": "../admin_cemter/autor_panel.html",                   
        "revisor@sena.edu.co:revisor123": "../admin_cemter/revisor.html"    
    };

    // Event listener o evento de escucha/acción: para el formulario de login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el envío del formulario por defecto

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Opcional: La línea 'rememberMe' está comentada ya que no hay un elemento con ese ID en el HTML. 
        // const rememberMe = document.getElementById('rememberMe').checked; 

        console.log('Intento de inicio de sesión:');
        console.log('Email:', email);
        console.log('Contraseña:', password);
        // console.log('Recordarme:', rememberMe); // Se puede eliminar esta línea si no se usa rememberMe

        const credentials = `${email}:${password}`; // Combinando email y contraseña para la búsqueda

        if (users[credentials]) { // Verifica si las credenciales existen en el objeto users
            const redirectToPage = users[credentials];
            alert(`¡Inicio de sesión exitoso! Redirigiendo tu página ${redirectToPage}`);
            window.location.href = redirectToPage; // Redirige a la página correspondiente
        } else {
            alert('Credenciales incorrectas. Por favor, intente de nuevo.');
        }
    });
});