document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener los conteos de descargas (simulados en localStorage)
    function getDownloadCounts() {
        const counts = localStorage.getItem('downloadCounts');
        return counts ? JSON.parse(counts) : {};
    }

    // Función para guardar los conteos de descargas en localStorage
    function saveDownloadCounts(counts) {
        localStorage.setItem('downloadCounts', JSON.stringify(counts));
    }

    // Función para actualizar la visualización de los conteos
    function updateDisplayCounts() {
        const currentCounts = getDownloadCounts();
        document.querySelectorAll('.download-count').forEach(span => {
            const volumeId = span.id.replace('downloads-', '');
            span.textContent = currentCounts[volumeId] || 0;
        });
    }

    // Inicializar y mostrar los conteos al cargar la página
    updateDisplayCounts();

    // Añadir event listeners a los botones de descarga
    document.querySelectorAll('.descarga-info a').forEach(link => {
        link.addEventListener('click', (event) => {
            const volumeId = event.currentTarget.dataset.volumeId;

            if (volumeId) {
                let currentCounts = getDownloadCounts();
                currentCounts[volumeId] = (currentCounts[volumeId] || 0) + 1;
                saveDownloadCounts(currentCounts);
                updateDisplayCounts(); // Actualizar la visualización inmediatamente
            }

            // Opcional: Si se quiere que el enlace NO redirija automáticamente para poder hacer una petición AJAX ( (Asynchronous JavaScript and XML) es una técnica que permite a las aplicaciones web enviar y recibir datos de un servidor de forma asíncrona, sin necesidad de recargar la página completa.) antes,
            // descomentar la siguiente línea y maneja la descarga con JavaScript.
            // event.preventDefault();
            // window.location.href = event.currentTarget.href; // Redirige manualmente después de actualizar el contador
        });
    });
});