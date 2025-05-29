document.addEventListener('DOMContentLoaded', function() {
    const formularioPostulacion = document.getElementById('postulacion-aprendiz');
    const mensajePostulacion = document.getElementById('mensaje-postulacion');

    if (formularioPostulacion) {
        formularioPostulacion.addEventListener('submit', function(event) {
            event.preventDefault();
            // Aquí puedes añadir la lógica para enviar los datos del formulario
            // a un servidor o realizar alguna otra acción.
            // Por ahora, mostraremos un mensaje simulado.

            const nombre = document.getElementById('nombre').value;
            mensajePostulacion.textContent = `¡Gracias, ${nombre}! Tu postulación ha sido enviada.`;
            mensajePostulacion.className = 'mensaje exito';
            formularioPostulacion.reset();

            // Simulación de error (puedes comentar esto)
            // mensajePostulacion.textContent = 'Hubo un error al enviar la postulación.';
            // mensajePostulacion.className = 'mensaje error';
        });
    }

    // Smooth scrolling para los enlaces del menú y la barra lateral
    document.querySelectorAll('nav a[href^="#"], .sidebar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});