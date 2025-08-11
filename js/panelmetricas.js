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
                /* --- SSTILOS PARA EL PANEL DE MÉTRICAS --- */
                .metrics-panel-container {
                    width: 280px;
                    background-color: rgba(30, 60, 110, 0.7); /* Fondo azul oscuro semi-transparente */
                    border: 4px solid #1f4270; /* Borde azul oscuro sólido */
                    color: whitesmoke;
                    padding: 30px 20px;
                    border-radius: 12px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
                    flex-shrink: 0;
                    position: sticky;
                    top: calc(var(--header-height, 0px) + -80px);
                    height: fit-content;
                    z-index: 10;
                    transform: translateZ(0);
                }
                .metrics-panel-container h3 {
                    text-align: center;
                    margin-bottom: 35px;
                    color: whitesmoke;
                    font-size: 1.8em;
                    font-weight: 600;
                    position: relative;
                    padding-bottom: 15px;
                }
                .metrics-panel-container h3::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 3px;
                    background-color: #3FCED4;
                    border-radius: 2px;
                }
                .metric-item {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .metric-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
                }
                .metric-item h4 {
                    color: #3FCED4;
                    margin-bottom: 8px;
                    font-size: 1.2em;
                    font-weight: 600;
                }
                .metric-item .metric-value {
                    color: #fff;
                    font-size: 1.6em;
                    font-weight: 700;
                    text-align: center;
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
                    background-color: #3FCED4;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }
                .nav-button:active {
                    transform: translateY(0);
                }
                .reset-button {
                    background-color: rgba(255, 87, 87, 0.7);
                    margin-top: 10px;
                }
                .reset-button:hover {
                    background-color: rgba(255, 87, 87, 0.9);
                }
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
                <div class="navigation-buttons">
                    <button class="nav-button" id="btn-inicio">Up</button>
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