// js/panelmetricas.js - FIREBASE VIP EDITION
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

                /* --- PANEL VIP GLASSMORPHISM --- */
                .metrics-panel-container {
                    width: 250px;
                    background: rgba(10, 15, 30, 0.75); /* Azul profundo semitransparente */
                    backdrop-filter: blur(12px); /* Efecto de vidrio */
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(63, 206, 212, 0.3); /* Borde sutil cyan */
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 
                                inset 0 0 15px rgba(63, 206, 212, 0.1); /* Brillo interior */
                    color: #fff;
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                    max-height: 85vh;
                    overflow-y: auto;
                    z-index: 100;
                    margin-left: 20px;
                    transition: all 0.4s ease;
                }
                
                .metrics-panel-container:hover {
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 
                                inset 0 0 25px rgba(63, 206, 212, 0.3);
                    border-color: rgba(63, 206, 212, 0.8);
                }

                .metrics-panel-container::-webkit-scrollbar { width: 4px; }
                .metrics-panel-container::-webkit-scrollbar-track { background: transparent; }
                .metrics-panel-container::-webkit-scrollbar-thumb { background: #3FCED4; border-radius: 4px; }

                /* HEADER DEL PANEL */
                .panel-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                h3 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.2rem;
                    color: #3FCED4;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    text-shadow: 0 0 8px rgba(63, 206, 212, 0.5);
                }

                /* ITEMS DE MÉTRICA */
                .metric-item {
                    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px;
                    padding: 12px;
                    margin-bottom: 12px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .metric-item::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 3px;
                    height: 100%;
                    background: #3FCED4;
                    box-shadow: 0 0 10px #3FCED4;
                    opacity: 0.5;
                    transition: opacity 0.3s ease;
                }

                .metric-item:hover {
                    transform: translateX(5px);
                    background: rgba(63, 206, 212, 0.05);
                }

                .metric-item:hover::before { opacity: 1; }

                h4 {
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                    color: #A0AAB2;
                    font-size: 0.85rem;
                    margin: 0 0 5px 0;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .metric-value {
                    font-family: 'Rajdhani', sans-serif;
                    color: #FFFFFF;
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin: 0;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }

                /* NÚMERO RESALTADO */
                #web-visits {
                    color: #00FF88; /* Verde neón para visitas */
                    text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
                }

                /* BOTONES DE NAVEGACIÓN */
                .nav-group {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .btn-cyber {
                    background: transparent;
                    color: #A0AAB2;
                    border: 1px solid rgba(160, 170, 178, 0.3);
                    padding: 8px;
                    border-radius: 6px;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 0.7rem;
                    cursor: pointer;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                }

                .btn-cyber:hover {
                    color: #3FCED4;
                    border-color: #3FCED4;
                    background: rgba(63, 206, 212, 0.1);
                    box-shadow: 0 0 10px rgba(63, 206, 212, 0.3);
                }

                .btn-danger {
                    grid-column: span 2;
                    border-color: rgba(255, 71, 87, 0.3);
                    color: #ff4757;
                }
                .btn-danger:hover {
                    background: rgba(255, 71, 87, 0.1);
                    border-color: #ff4757;
                    box-shadow: 0 0 10px rgba(255, 71, 87, 0.3);
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
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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
                    <button class="btn-cyber" id="btn-inicio">Top Up</button>
                    <button class="btn-cyber" id="btn-fin">Down</button>
                    <button class="btn-cyber btn-danger" id="btn-reset">System Reset</button>
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
    
    // ... [El resto de la lógica JavaScript de tu archivo original se mantiene igual]
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
            el.style.color = '#3FCED4';
            setTimeout(() => {
                el.innerText = count.toLocaleString();
                el.style.color = id === 'web-visits' ? '#00FF88' : '#FFFFFF';
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