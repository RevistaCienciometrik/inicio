// JS/contentLoader.js

document.addEventListener('DOMContentLoaded', () => {
    // Intenta obtener el contenido guardado en localStorage
    const editableContent = JSON.parse(localStorage.getItem('cienciometrikContent'));

    if (editableContent) {
        // --- Sección de Inicio (Banner y Primer Contenido) ---
        // Título de Bienvenida
        if (editableContent.adminTituloInicio) {
            const element = document.getElementById('titulo_inicio');
            if (element) element.textContent = editableContent.adminTituloInicio;
        }
        // Párrafo de Bienvenida
        if (editableContent.adminParrafoInicio) {
            const element = document.getElementById('párrafo_inicio');
            if (element) element.textContent = editableContent.adminParrafoInicio;
        }
        // URL del Video de Bienvenida
        if (editableContent.adminVideoIndexSrc) {
            const element = document.getElementById('video_index');
            if (element) element.src = editableContent.adminVideoIndexSrc;
        }
        // Texto del botón "Último volúmen"
        if (editableContent.adminVolumenRevistaText) {
            const element = document.getElementById('volumen_revista');
            if (element) element.textContent = editableContent.adminVolumenRevistaText;
        }
        // Href del botón "Último volúmen"
        if (editableContent.adminVolumenRevistaHref) {
            const element = document.getElementById('volumen_revista');
            if (element) element.href = editableContent.adminVolumenRevistaHref;
        }
        // Src de la imagen animada del banner
        if (editableContent.adminAnimatedImageSrc) {
            const element = document.getElementById('img_moving'); // ¡Cuidado con los IDs con espacios!
            if (element) element.src = editableContent.adminAnimatedImageSrc;
        }
        // Src de la imagen de portada
        if (editableContent.adminPortadaImagenSrc) {
            const element = document.getElementById('portada_imagen');
            if (element) element.src = editableContent.adminPortadaImagenSrc;
        }

        // --- Sección de Historia ---
        // Título de Historia
        if (editableContent.adminTituloHistoria) {
            const element = document.getElementById('titulo_historia');
            if (element) element.textContent = editableContent.adminTituloHistoria;
        }
        // Párrafo de Historia
        if (editableContent.adminParrafoHistoria) {
            const element = document.getElementById('párrafo_historia');
            if (element) element.textContent = editableContent.adminParrafoHistoria;
        }
        // Título de Convocatorias
        if (editableContent.adminConvocatoriasTitulo) {
            const element = document.getElementById('convocatorias');
            if (element) element.textContent = editableContent.adminConvocatoriasTitulo;
        }
        // Contenido de la lista de Convocatorias (se reemplaza el HTML completo)
        if (editableContent.adminConvocatoriasCont) {
            const element = document.getElementById('convocatorias_cont');
            if (element) element.innerHTML = editableContent.adminConvocatoriasCont;
        }

        // --- Sección de Línea de Tiempo ---
        // Aquí no hay título con ID, solo la UL tiene ID (lo ideal sería que el H2 también tuviera ID)
        // Puedes agregar un ID al H2 si quieres que sea editable
        // Si no hay un ID específico para el H2, podrías editarlo por su contenido o por su relación con el ul,
        // pero es menos robusto. Para este ejemplo, lo dejaremos sin edición si no tiene ID.

        // Contenido de la lista de Línea de Tiempo (se reemplaza el HTML completo)
        if (editableContent.adminLineaTiempoList) {
            const element = document.querySelector('#linea-tiempo ul'); // Selector por la sección y la UL
            if (element) element.innerHTML = editableContent.adminLineaTiempoList;
        }

        // --- Sección de Enfoque ---
        // Título de Enfoque
        if (editableContent.adminTituloEnfoque) {
            const element = document.getElementById('titulo_enfoque');
            if (element) element.textContent = editableContent.adminTituloEnfoque;
        }
        // Párrafo de Enfoque
        if (editableContent.adminParrafoEnfoque) {
            const element = document.getElementById('parrafo_enfoque');
            if (element) element.textContent = editableContent.adminParrafoEnfoque;
        }
        // Título de Líneas de la revista
        if (editableContent.adminPLineasEnfoque) {
            const element = document.getElementById('p_enfoque');
            if (element) element.textContent = editableContent.adminPLineasEnfoque;
        }
        // Contenido de la lista de Líneas de la revista (se reemplaza el HTML completo)
        if (editableContent.adminLinesListEnfoque) {
            // Asumiendo que la UL dentro de #enfoque es la que quieres editar.
            // Es buena idea darle un ID único si hay más ULs en esa sección.
            const element = document.querySelector('#enfoque ul');
            if (element) element.innerHTML = editableContent.adminLinesListEnfoque;
        }

        // --- Panel de Navegación (Sidebar) ---
        // Aquí solo se cambia el texto del H3 del sidebar
        if (editableContent.adminNavPanelTitle) {
            const element = document.querySelector('#nav_panel h3'); // Selecciona el h3 dentro del aside con ID nav_panel
            if (element) element.textContent = editableContent.adminNavPanelTitle;
        }
        // Para los enlaces de navegación, si quieres editarlos, necesitarías IDs individuales para cada <a>
        // o un enfoque que maneje la UL completa (como en las listas de contenido).
        // Por ahora, se asume que los enlaces del panel de navegación son estáticos o se gestionan de otra manera.
    }
});