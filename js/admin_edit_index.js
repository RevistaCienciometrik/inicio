// JS/admin_edit_index.js

document.addEventListener('DOMContentLoaded', () => {
    const saveAllButton = document.getElementById('saveAllChanges');
    const resetButton = document.getElementById('resetChanges');

    // Mapeo de IDs de los campos de formulario en admin_edit_index.html
    // a los IDs de los elementos en index.html y sus propiedades (textContent, innerHTML, src, href).
    // Usamos las claves de este objeto para almacenar y recuperar en localStorage.

    const editableElementsMap = {
        // --- Sección: Banner y Bienvenida ---
        'adminAnimatedImageSrc': { type: 'attribute', targetId: 'Imagen en movimiento de la revista', attr: 'src', defaultValue: 'images/PNG-Cienciometrik/cienciometrik.png' },
        'adminPortadaImagenSrc': { type: 'attribute', targetId: 'portada_imagen', attr: 'src', defaultValue: 'images/Portada.png' },
        'adminVolumenRevistaText': { type: 'text', targetId: 'volumen_revista', defaultValue: 'Último volúmen' },
        'adminVolumenRevistaHref': { type: 'attribute', targetId: 'volumen_revista', attr: 'href', defaultValue: 'Docs/Revista CienciometriK_Vol. 2 N°. 3 2024.pdf' },
        'adminTituloInicio': { type: 'text', targetId: 'titulo_inicio', defaultValue: 'Bienvenido a la Revista Cienciometrik' },
        'adminParrafoInicio': { type: 'text', targetId: 'párrafo_inicio', defaultValue: 'Un espacio para la difusión del conocimiento científico y tecnológico del Sistema SENNOVA.' },
        'adminVideoIndexSrc': { type: 'attribute', targetId: 'video_index', attr: 'src', defaultValue: 'vids/vid1.mp4' },

        // --- Sección: Historia de la Revista ---
        'adminTituloHistoria': { type: 'text', targetId: 'titulo_historia', defaultValue: 'Historia de la Revista' },
        'adminParrafoHistoria': { type: 'text', targetId: 'párrafo_historia', defaultValue: 'La Revista Cienciometrik es una publicación semestral del Servicio Nacional de Aprendizaje SENA, específicamente del Centro de Comercio, Regional Antioquia, adscrita al Sistema de Investigación, Desarrollo Tecnológico e Innovación SENNOVA.' },
        'adminConvocatoriasTitulo': { type: 'text', targetId: 'convocatorias', defaultValue: 'Convocatorias:' },
        'adminConvocatoriasCont': {
            type: 'html', targetId: 'convocatorias_cont', defaultValue: `                    <li><strong>Vol. 1 N°. 1 (Julio - Diciembre 2023):</strong> Convocatoria general para artículos de investigación.</li>
                    <li><strong>Vol. 2 N°. 2 (Enero - Junio 2024):</strong> Convocatoria general para artículos de investigación.</li>
                    <li><strong>Vol. 2 N°. 3 (Julio - Diciembre 2024):</strong> Convocatoria general para artículos de investigación.</li>
                    <li><strong>1er Simposio Nacional de Cienciometría (Julio - Diciembre 2024):</strong> Convocatoria especial para ponencias y trabajos relacionados con herramientas de cienciometría.</li>`
        },

        // --- Sección: Línea de Tiempo ---
        // Nota: El H2 de Línea de Tiempo en index.html no tiene ID. He añadido uno genérico en el map,
        // pero necesitarías añadir `id="titulo_linea_tiempo"` en el H2 de index.html para que esto funcione directamente.
        // Si no, se usará el selector CSS 'linea-tiempo h2' en contentLoader.js, lo cual es menos específico.
        'adminLineaTiempoTitulo': { type: 'text', targetId: 'linea-tiempo h2', defaultValue: 'Línea de Tiempo de la Revista', isSelector: true }, // isSelector: true para indicar que targetId es un selector CSS
        'adminLineaTiempoList': {
            type: 'html', targetId: '#linea-tiempo ul', defaultValue: `                    <li><strong>Julio - Diciembre 2023:</strong> Publicación del Vol. 1 N°. 1.</li>
                    <li><strong>Enero - Junio 2024:</strong> Publicación del Vol. 2 N°. 2.</li>
                    <li><strong>Julio - Diciembre 2024:</strong> Publicación del Vol. 2 N°. 3 y realización del 1er Simposio Nacional de Cienciometría.</li>`, isSelector: true
        },

        // --- Sección: Enfoque de la Revista ---
        'adminTituloEnfoque': { type: 'text', targetId: 'titulo_enfoque', defaultValue: 'Enfoque de la Revista' },
        'adminParrafoEnfoque': { type: 'text', targetId: 'parrafo_enfoque', defaultValue: 'La Revista Cienciometrik se enfoca en la difusión de investigaciones, desarrollos tecnológicos e innovaciones en diversas áreas del conocimiento, con un interés particular en la cienciometría como herramienta para el análisis y la mejora de la investigación.' },
        'adminPLineasEnfoque': { type: 'text', targetId: 'p_enfoque', defaultValue: 'Líneas que recibe la revista (ejemplos basados en los documentos):' },
        'adminLinesListEnfoque': {
            type: 'html', targetId: '#enfoque ul', defaultValue: `                    <li>Cienciometría y estudios métricos de la información.</li>
                    <li>Investigación pedagógica.</li>
                    <li>Desarrollo de habilidades blandas y competencias socioemocionales.</li>
                    <li>Gestión de la producción y optimización de procesos industriales.</li>
                    <li>Innovación y desarrollo tecnológico aplicado.</li>
                    <li>Economía verde, territorio y sustentabilidad.</li>
                    <li>Administración, comercio y servicios.</li>`, isSelector: true
        },

        // --- Sección: Panel de Navegación (Sidebar) ---
        'adminNavPanelTitle': { type: 'text', targetId: '#nav_panel h3', defaultValue: 'Panel de Navegación', isSelector: true }
    };

    // Función para cargar el contenido desde localStorage en los campos de administración
    function loadContentIntoAdmin() {
        const storedContent = JSON.parse(localStorage.getItem('cienciometrikContent'));

        for (const adminId in editableElementsMap) {
            const adminField = document.getElementById(adminId);
            if (adminField) {
                if (storedContent && storedContent[adminId] !== undefined) {
                    adminField.value = storedContent[adminId];
                } else {
                    // Si no hay contenido en localStorage para este campo, usa el valor por defecto
                    adminField.value = editableElementsMap[adminId].defaultValue || '';
                }
            }
        }
    }

    // Función para guardar el contenido de los campos de administración en localStorage
    function saveContentToLocalStorage() {
        const newContent = {};
        for (const adminId in editableElementsMap) {
            const adminField = document.getElementById(adminId);
            if (adminField) {
                newContent[adminId] = adminField.value;
            }
        }

        localStorage.setItem('cienciometrikContent', JSON.stringify(newContent));
        alert('Cambios guardados localmente. Recarga la página "index.html" para verlos.');

        // Opcional: Intentar refrescar la página index.html si está abierta en otra pestaña
        // (Esto es una heurística y no garantiza el funcionamiento en todos los escenarios)
        try {
            const indexWindow = window.open('../index.html', '_blank');
            if (indexWindow) {
                indexWindow.focus();
                // indexWindow.location.reload(true); // Descomentar para intentar forzar un refresh
            }
        } catch (e) {
            console.warn("No se pudo abrir o refrescar index.html directamente. Es posible que el navegador haya bloqueado la acción o la página ya esté abierta y no se pueda acceder. Por favor, recargue index.html manualmente.");
        }
    }

    // Función para restablecer el contenido a los valores originales (borrando localStorage)
    function resetContent() {
        if (confirm('¿Estás seguro de que quieres restablecer el contenido original? Esto borrará tus cambios guardados localmente y la página principal volverá a su estado inicial.')) {
            localStorage.removeItem('cienciometrikContent');
            alert('Contenido restablecido a los valores por defecto. Recarga esta página y la página principal para ver los cambios.');
            loadContentIntoAdmin(); // Vuelve a cargar los valores por defecto en la administración

            // Intenta refrescar index.html
            try {
                const indexWindow = window.open('../index.html', '_blank');
                if (indexWindow) {
                    indexWindow.focus();
                }
            } catch (e) {
                console.warn("No se pudo refrescar index.html.");
            }
        }
    }

    // Cargar el contenido cuando la página de administración se cargue
    loadContentIntoAdmin();

    // Asignar eventos a los botones
    if (saveAllButton) {
        saveAllButton.addEventListener('click', saveContentToLocalStorage);
    }
    if (resetButton) {
        resetButton.addEventListener('click', resetContent);
    }
});