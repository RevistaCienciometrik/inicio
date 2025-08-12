// js/panelmetricas.js
class MetricasPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* --- ESTILOS PARA EL PANEL DE MÉTRICAS --- */
                .metrics-panel-container {
                    width: 220px;
                    background-color: rgba(20, 40, 80, 0.7); /* Azul oscuro más profundo */
                    border: 4px solid #2c5aa0; /* Azul elegante sin verdoso */
                    color: whitesmoke;
                    padding: 15px 12px;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(44, 90, 160, 0.3);
                    flex-shrink: 0;
                    position: sticky;
                    top: calc(var(--header-height, 0px) + -80px);
                    height: fit-content;
                    z-index: 10;
                    transform: translateZ(0);
                    backdrop-filter: blur(5px);
                }
                .metrics-panel-container h3 {
                    text-align: center;
                    margin-bottom: 15px;
                    color: whitesmoke;
                    font-size: 1.4em;
                    font-weight: 600;
                    position: relative;
                    padding-bottom: 8px;
                }
                .metrics-panel-container h3::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 2px;
                    background-color: #5d8fd9; /* Azul claro elegante */
                    border-radius: 2px;
                }
                .metric-item {
                    background-color: rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    padding: 6px 8px;
                    margin-bottom: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(93, 143, 217, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid rgba(93, 143, 217, 0.2);
                }
                .metric-item:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4), inset 0 0 8px rgba(93, 143, 217, 0.2);
                    border-color: rgba(93, 143, 217, 0.4);
                }
                .metric-item h4 {
                    color: #5d8fd9; /* Azul claro elegante */
                    margin-bottom: 3px;
                    font-size: 0.95em;
                    font-weight: 600;
                }
                .metric-item .metric-value {
                    color: #fff;
                    font-size: 1.2em;
                    font-weight: 700;
                    text-align: center;
                    margin-top: 2px;
                }
                @media screen and (max-width: 768px) {
                    .metrics-panel-container {
                        width: 100%;
                        position: static;
                        margin-bottom: 20px;
                        order: -1;
                    }
                }
                .navigation-buttons {
                    margin-top: 15px;
                    padding-top: 12px;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .nav-button {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: whitesmoke;
                    padding: 8px 10px;
                    border: 1px solid rgba(93, 143, 217, 0.3);
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.95em;
                    font-weight: 500;
                    text-align: center;
                    transition: background-color 0.3s ease, transform 0.2s ease, border-color 0.3s ease;
                }
                .nav-button:hover {
                    background-color: rgba(93, 143, 217, 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
                    border-color: #5d8fd9;
                }
                .nav-button:active {
                    transform: translateY(0);
                }
                .reset-button {
                    background-color: rgba(180, 60, 60, 0.7);
                    border-color: rgba(180, 60, 60, 0.5);
                    margin-top: 5px;
                }
                .reset-button:hover {
                    background-color: rgba(200, 70, 70, 0.8);
                    border-color: rgba(200, 70, 70, 0.6);
                }
            </style>
            <div class="metrics-panel-container" id="nav_panel">
                <h3>Ciencio/métricas</h3>
                
                <div class="navigation-buttons">
                    <button class="nav-button" id="btn-fin">Top Down</button>
                    <br>
                </div>
                <div class="metric-item">
                    <h4>Visitas a la Web:</h4>
                    <p class="metric-value" id="web-visits">Cargando...</p>
                </div>
                
                <div class="metric-item">
                    <h4>Descargas de Revistas:</h4>
                    <p class="metric-value" id="total-revista-downloads-sidebar">0</p>
                </div>
                <div class="metric-item">
                    <h4>Descargas Cartillas Inclusión:</h4>
                    <p class="metric-value" id="inclusi-downloads-sidebar">0</p>
                </div>
                <div class="metric-item">
                    <h4>Descargas Cartillas Servitización:</h4>
                    <p class="metric-value" id="servitizacion-downloads-sidebar">0</p>
                </div>
                <div class="metric-item">
                    <h4>Tiempo de Carga:</h4>
                    <p class="metric-value" id="loading-time">Cargando...</p>
                </div>
                <div class="navigation-buttons">
                    <button class="nav-button" id="btn-inicio">Top Up</button>
                    <button class="nav-button reset-button" id="btn-reset">Reiniciar Contadores</button>
                </div>
            </div>
        `;
        this.loadMetrics();
        this.setupNavigationButtons();
    }
    loadMetrics() {
        const webVisitsElement = this.shadowRoot.getElementById('web-visits');
        if (webVisitsElement) {
            const visits = parseInt(localStorage.getItem('web_visits') || '0');
            webVisitsElement.textContent = visits.toLocaleString();
        }
        const loadingTimeElement = this.shadowRoot.getElementById('loading-time');
        if (loadingTimeElement) {
            requestAnimationFrame(() => {
                const [entry] = performance.getEntriesByType("navigation");
                if (entry) {
                    const loadTime = (entry.loadEventEnd - entry.startTime) / 1000;
                    loadingTimeElement.textContent = `${loadTime.toFixed(2)}s`;
                } else {
                    loadingTimeElement.textContent = 'N/A';
                }
            });
        }
        const totalRevistaDownloads = parseInt(localStorage.getItem('total_revista_downloads') || '0');
        this.updateMetric('total-revista-downloads-sidebar', totalRevistaDownloads);
        const totalInclusionDownloads = parseInt(localStorage.getItem('total_inclusion_downloads') || '0');
        this.updateMetric('inclusi-downloads-sidebar', totalInclusionDownloads);
        const totalServitizacionDownloads = parseInt(localStorage.getItem('total_servitizacion_downloads') || '0');
        this.updateMetric('servitizacion-downloads-sidebar', totalServitizacionDownloads);
    }
    setupNavigationButtons() {
        const btnInicio = this.shadowRoot.getElementById('btn-inicio');
        const btnFin = this.shadowRoot.getElementById('btn-fin');
        const btnReset = this.shadowRoot.getElementById('btn-reset');
        
        if (btnInicio) {
            btnInicio.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        if (btnFin) {
            btnFin.addEventListener('click', () => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
        }
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                this.resetAllCounters();
            });
        }
    }
    
    // Método para permitir que otros scripts actualicen las métricas
    updateMetric(id, count) {
        const metricElement = this.shadowRoot.getElementById(id);
        if (metricElement) {
            metricElement.textContent = count.toLocaleString();
        }
    }
    
    // Método para resetear el contador de visitas desde el código
    resetWebVisits() {
        localStorage.setItem('web_visits', '0');
        this.updateMetric('web-visits', 0);
        console.log("Contador de visitas a la web reseteado a 0.");
    }
    
    // Método para reiniciar todos los contadores
    resetAllCounters() {
        // Confirmar antes de reiniciar
        if (confirm('¿Estás seguro de que quieres reiniciar todos los contadores? Esta acción no se puede deshacer.')) {
            // Reiniciar contador de visitas
            localStorage.setItem('web_visits', '0');
            this.updateMetric('web-visits', 0);
            
            // Reiniciar contadores de descargas
            localStorage.setItem('total_revista_downloads', '0');
            this.updateMetric('total-revista-downloads-sidebar', 0);
            
            localStorage.setItem('total_inclusion_downloads', '0');
            this.updateMetric('inclusi-downloads-sidebar', 0);
            
            localStorage.setItem('total_servitizacion_downloads', '0');
            this.updateMetric('servitizacion-downloads-sidebar', 0);
            
            // Reiniciar contadores individuales
            const downloadCounters = document.querySelectorAll('.download-count');
            downloadCounters.forEach(counter => {
                const volumeId = counter.id.replace('downloads-', '');
                localStorage.setItem(`downloads-${volumeId}`, '0');
                counter.textContent = '0';
            });
            
            console.log("Todos los contadores han sido reiniciados a 0.");
            
            // Opcional: mostrar una notificación
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
            notification.style.color = 'white';
            notification.style.padding = '15px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            notification.style.zIndex = '1000';
            notification.textContent = 'Todos los contadores han sido reiniciados.';
            document.body.appendChild(notification);
            
            // Eliminar la notificación después de 3 segundos
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        }
    }
}
customElements.define('metricas-panel', MetricasPanel);