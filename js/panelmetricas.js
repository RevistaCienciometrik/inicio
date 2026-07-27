// js/panelmetricas.js - Edicion mejorada 
class MetricasPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Verificar si Firebase está disponible
        if (typeof firebase === 'undefined') {
            console.error("Firebase SDK no está cargado.");
            this.render();
            return;
        }
        
        // Configuración para Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAuRQC65O5zlkNbcnp1srZkQpjmD82TVco",
            authDomain: "cienciometrik-3c8e7.firebaseapp.com",
            projectId: "cienciometrik-3c8e7",
            storageBucket: "cienciometrik-3c8e7.firebasestorage.app",
            messagingSenderId: "60232446009",
            appId: "1:60232446009:web:1ce1cbb0437018d62f9de8"
        };
        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        this.db = firebase.firestore();
        this.metricsRef = this.db.collection('metrics').doc('global_metrics');
        
        this.render();
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@500;700&display=swap');

                /* --- PANEL VIP MEJORADO --- */
               .metrics-panel-container {
                    width: 260px;
                    background: #ffffff; /* Fondo blanco puro */
                    border: 1px solid rgba(0, 48, 87, 0.1); /* Borde sutil corporativo */
                    border-radius: 16px;
                    padding: 25px 20px;
                    box-shadow: 0 10px 30px rgba(0, 48, 87, 0.08); /* Sombra suave */
                    color: #333333; /* Texto oscuro */
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                    max-height: 85vh;
                    overflow-y: auto;
                    z-index: 100;
                    margin-left: 20px;
                    transition: all 0.4s ease;
                    border-top: 5px solid #39A900; /* Detalle Verde SENA arriba */
                }
                
                .metrics-panel-container:hover {
                    box-shadow: 0 15px 40px rgba(0, 48, 87, 0.12);
                    border-color: rgba(57, 169, 0, 0.3);
                }

                .metrics-panel-container::-webkit-scrollbar { width: 6px; }
                .metrics-panel-container::-webkit-scrollbar-track { background: #f0f4f8; border-radius: 10px; }
                .metrics-panel-container::-webkit-scrollbar-thumb { background: #39A900; border-radius: 10px; }

                /* HEADER DEL PANEL */
                .panel-header {
                    text-align: center;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }

                h3 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.3rem;
                    color: #003057; /* Azul oscuro corporativo */
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                /* ITEMS DE MÉTRICA */
                .metric-item {
                    background: #f8f9fa; /* Gris muy clarito */
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    border-radius: 12px;
                    padding: 15px;
                    margin-bottom: 15px;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .metric-item::before {
                    content: '';
                    position: absolute;
                    top: 0; 
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background: #008394; /* Cyan oscuro */
                    transition: all 0.3s ease;
                }

                .metric-item:hover {
                    transform: translateX(5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                }

                .metric-item:hover::before { 
                    background: #39A900; /* Verde SENA */
                }

                h4 {
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                    color: #666666;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin: 0 0 8px 0;
                    text-transform: uppercase;
                }

                .metric-value {
                    font-family: 'Rajdhani', sans-serif;
                    color: #003057; /* Azul corporativo */
                    font-size: 2.2rem; 
                    font-weight: 700;
                    margin: 0;
                    line-height: 1;
                }

                #web-visits {
                    color: #39A900; /* Verde SENA para destacar visitas */
                }

                /* BOTONES DE NAVEGACIÓN */
                .nav-group {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-top: 25px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(0,0,0,0.05);
                }

                .btn-cyber {
                    background: #ffffff;
                    color: #666666;
                    border: 1px solid #cccccc;
                    padding: 10px;
                    border-radius: 6px;
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                    font-size: 0.75rem;
                    font-weight: bold;
                    cursor: pointer;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                }

                .btn-cyber:hover {
                    color: #ffffff;
                    border-color: #003057;
                    background: #003057;
                }

                .btn-danger {
                    grid-column: span 2;
                }
                
                .btn-danger:hover {
                    background: #e74c3c;
                    border-color: #e74c3c;
                    color: #fff;
                }

                /* RESPONSIVE */
                @media (max-width: 992px) {
                    .metrics-panel-container {
                        width: 100%;
                        margin-left: 0;
                        margin-bottom: 30px;
                        position: relative;
                        top: 0;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 15px;
                    }
                    .panel-header, .nav-group { grid-column: 1 / -1; }
                }
            </style>
            
            <div class="metrics-panel-container">
                <div class="panel-header">
                    <h3>DATA DASHBOARD</h3>
                </div>
                
                <div class="metric-item">
                    <h4>Visitas a la Web</h4>
                    <p class="metric-value" id="web-visits">...</p>
                </div>
                <div class="metric-item">
                    <h4>Descargas Revistas</h4>
                    <p class="metric-value" id="total-revista-downloads-sidebar">0</p>
                </div>
                <div class="metric-item">
                    <h4>Descargas Libros</h4>
                    <p class="metric-value" id="total-libros-downloads-sidebar">0</p>
                </div>
                <div class="metric-item">
                    <h4>Cartillas Digitales</h4>
                    <p class="metric-value" id="total-cartillas-downloads-sidebar">0</p>
                </div>
                <div class="metric-item">
                    <h4>Informes</h4>
                    <p class="metric-value" id="total-informes-downloads-sidebar">0</p>
                </div>
                
                <div class="nav-group">
                    <button class="btn-cyber" id="btn-inicio">Subir</button>
                    <button class="btn-cyber" id="btn-fin">Bajar</button>
                    <button class="btn-cyber btn-danger" id="btn-reset">Reiniciar Sistema</button>
                </div>
            </div>
        `;
        
        if (typeof firebase !== 'undefined') {
            this.loadMetrics();
            this.setupNavigationButtons();
            this.setupDownloadTracking();
            this.setupRealtimeUpdates();
        }
    }
    
    // ... [El resto de la lógica JavaScript se mantiene exactamente igual] ...
    async loadMetrics() {
        try {
            const doc = await this.metricsRef.get();
            if (doc.exists) {
                const data = doc.data();
                this.updateMetric('web-visits', data.webVisits || 0);
                this.updateMetric('total-revista-downloads-sidebar', data.totalRevistaDownloads || 0);
                this.updateMetric('total-libros-downloads-sidebar', data.totalLibrosDownloads || 0);
                this.updateMetric('total-cartillas-downloads-sidebar', data.totalCartillasDownloads || 0);
                this.updateMetric('total-informes-downloads-sidebar', data.totalInformesDownloads || 0);
            }
        } catch (error) { console.error("Error:", error); }
    }
    
    setupRealtimeUpdates() {
        this.metricsRef.onSnapshot(doc => {
            if (doc.exists) {
                const data = doc.data();
                this.updateMetric('web-visits', data.webVisits || 0);
                this.updateMetric('total-revista-downloads-sidebar', data.totalRevistaDownloads || 0);
                this.updateMetric('total-libros-downloads-sidebar', data.totalLibrosDownloads || 0);
                this.updateMetric('total-cartillas-downloads-sidebar', data.totalCartillasDownloads || 0);
                this.updateMetric('total-informes-downloads-sidebar', data.totalInformesDownloads || 0);
            }
        });
    }
    
    setupNavigationButtons() {
        this.shadowRoot.getElementById('btn-inicio')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        this.shadowRoot.getElementById('btn-fin')?.addEventListener('click', () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
        this.shadowRoot.getElementById('btn-reset')?.addEventListener('click', () => this.resetAllCounters());
    }
    
    setupDownloadTracking() {
        const setupTracking = () => {
            document.querySelectorAll('a[data-volume-id]').forEach(link => {
                link.removeEventListener('click', this.handleDownloadClick);
                link.addEventListener('click', this.handleDownloadClick.bind(this));
            });
        };
        document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', setupTracking) : setupTracking();
    }
    
    async handleDownloadClick(event) {
        const volumeId = event.currentTarget.getAttribute('data-volume-id');
        if (!volumeId) return;
        
        let field = volumeId.startsWith('volumen-') || volumeId.startsWith('sena-volumen-') ? 'totalRevistaDownloads' :
                    volumeId.startsWith('libro-') ? 'totalLibrosDownloads' :
                    volumeId.startsWith('cartilla-') ? 'totalCartillasDownloads' :
                    volumeId.startsWith('informe-') ? 'totalInformesDownloads' : '';
                    
        if (field) {
            try {
                await this.db.runTransaction(async (t) => {
                    const doc = await t.get(this.metricsRef);
                    const val = doc.exists ? (doc.data()[field] || 0) : 0;
                    t.update(this.metricsRef, { [field]: val + 1 });
                });
            } catch (error) { console.error("Error:", error); }
        }
    }
    
    updateMetric(id, count) {
        const el = this.shadowRoot.getElementById(id);
        if (el) {
            // Efecto contador digital
            let start = parseInt(el.innerText) || 0;
            if(start === count) return;
            
            // Color de transición (Cyan oscuro) para que se vea sobre el fondo blanco
            el.style.color = '#008394'; 
            
            setTimeout(() => {
                el.innerText = count.toLocaleString();
                // Si es "visitas a la web" lo pinta Verde SENA, el resto va en Azul Corporativo oscuro
                el.style.color = id === 'web-visits' ? '#39A900' : '#003057';
            }, 150);
        }
    }
    
    async resetAllCounters() {
        if (confirm('¿SYSTEM OVERRIDE: Reiniciar métricas?')) {
            await this.metricsRef.update({ webVisits: 0, totalRevistaDownloads: 0, totalLibrosDownloads: 0, totalCartillasDownloads: 0, totalInformesDownloads: 0 });
        }
    }
}
customElements.define('metricas-panel', MetricasPanel);