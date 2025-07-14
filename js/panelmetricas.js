// js/panelmetricas.js

class MetricasPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Usamos Shadow DOM para encapsular estilos
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Importa los estilos de metricas.css directamente en el Shadow DOM */
                @import url("../CSS/metricas.css"); 

                /* Estilos específicos para los botones de navegación dentro del panel de métricas */
                .navigation-buttons {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .nav-button {
                    background-color: rgba(255, 255, 255, 0.15);
                    color: whitesmoke;
                    padding: 12px 15px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1.1em;
                    font-weight: 500;
                    text-align: center;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .nav-button:hover {
                    background-color: #3FCED4; /* Color turquesa al pasar el ratón */
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }

                .nav-button:active {
                    transform: translateY(0);
                }

                /* Asegúrate de que no haya un .sidebar con estas mismas propiedades, o que este las sobrescriba */
            </style>
            <div class="metrics-panel-container" id="nav_panel">
                <h3>Métricas</h3>
                <div class="navigation-buttons">
                    <button class="nav-button" id="btn-fin">Down</button>
                    <br>
                </div>

                <div class="metric-item">
                    <h4>Visitas a la Web:</h4>
                    <p class="metric-value" id="web-visits">Cargando...</p>
                </div>

                <div class="metric-item">
                    <h4>Tiempo de Carga:</h4>
                    <p class="metric-value" id="loading-time">Cargando...</p>
                </div>
                
                <div class="metric-item">
                    <h4>Descargas Último Volumen:</h4>
                    <p class="metric-value" id="downloads-sena-volumen-3-sidebar">0</p>
                </div>

                <div class="navigation-buttons">
                    <button class="nav-button" id="btn-inicio">Up</button>
                </div>
            </div>
        `;
        this.loadMetrics(); // Llama a la función para cargar los datos de las métricas
        this.setupNavigationButtons(); // ¡NUEVO! Configura los botones de navegación
    }

    loadMetrics() {
        // --- Métrica: Visitas a la Web (usando localStorage) ---
        const webVisitsElement = this.shadowRoot.getElementById('web-visits');
        if (webVisitsElement) {
            let visits = parseInt(localStorage.getItem('web_visits') || '0');
            visits++; // Incrementa el contador por cada carga de página
            localStorage.setItem('web_visits', visits);
            webVisitsElement.textContent = visits.toLocaleString(); // Formatea el número para mejor lectura (ej. 1,234,567)
        }

        // --- Métrica: Tiempo de Carga (usando Performance API) ---
        const loadingTimeElement = this.shadowRoot.getElementById('loading-time');
        if (loadingTimeElement) {
            requestAnimationFrame(() => {
                const [entry] = performance.getEntriesByType("navigation");
                if (entry) {
                    const loadTime = (entry.loadEventEnd - entry.startTime) / 1000; // Tiempo en segundos
                    loadingTimeElement.textContent = `${loadTime.toFixed(2)}s`; // Muestra con 2 decimales
                } else {
                    loadingTimeElement.textContent = 'N/A'; // Si no se puede obtener el tiempo
                }
            });
        }

        // --- Métrica: Descargas Último Volumen (leyendo de localStorage, se actualizará al descargar) ---
        const downloadsElement = this.shadowRoot.getElementById('downloads-sena-volumen-3-sidebar');
        if (downloadsElement) {
            const currentDownloads = localStorage.getItem('sena-volumen-3-downloads') || '0';
            downloadsElement.textContent = currentDownloads;
        }
    }

    // Método para configurar los botones de navegación
    setupNavigationButtons() {
        const btnInicio = this.shadowRoot.getElementById('btn-inicio');
        const btnFin = this.shadowRoot.getElementById('btn-fin');

        if (btnInicio) {
            btnInicio.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazamiento suave al top
            });
        }

        if (btnFin) {
            btnFin.addEventListener('click', () => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Desplazamiento suave al final
            });
        }
    }

    // Método para permitir que otros scripts actualicen las métricas (ej. download_tracker.js)
    updateDownloadCount(count) {
        const downloadsElement = this.shadowRoot.getElementById('downloads-sena-volumen-3-sidebar');
        if (downloadsElement) {
            downloadsElement.textContent = count;
        }
    }
}

// Define el nuevo elemento HTML personalizado
customElements.define('metricas-panel', MetricasPanel);