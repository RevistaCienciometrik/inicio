// -------------- js/download_tracker.js ---------------------
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces que descargan un PDF o que tienen la extensión .pdf y se abren en una nueva pestaña.
    const downloadLinks = document.querySelectorAll('a[download], a[target="_blank"][href$=".pdf"], a[data-volume-id]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href') || '';
            let countKey;
            let metricId;
            
            // Clasificación de descargas basada en la URL.
            if (href.includes('Revista') || href.includes('REVISTA')) { // Corrección: incluir mayúsculas
                countKey = 'total_revista_downloads';
                metricId = 'total-revista-downloads-sidebar';
            } else if (href.includes('inclusion')) {
                countKey = 'total_inclusion_downloads';
                metricId = 'inclusi-downloads-sidebar';
            } else if (href.includes('servitización') || href.includes('servitizacion')) { 
                countKey = 'total_servitizacion_downloads';
                metricId = 'servitizacion-downloads-sidebar';
            }
            
            // Si es un enlace de repositorio, no lo contamos como descarga interna.
            if (!countKey) {
                return;
            }
            
            // Aumenta el contador en localStorage.
            let currentCount = parseInt(localStorage.getItem(countKey) || '0');
            currentCount++;
            localStorage.setItem(countKey, currentCount);
            
            // Intenta actualizar el panel de métricas si ya está cargado.
            const metricPanel = document.querySelector('metricas-panel');
            if (metricPanel && metricPanel.shadowRoot) {
                metricPanel.updateMetric(metricId, currentCount);
            }
            
            // Mantiene el funcionamiento de los contadores individuales
            const volumeId = link.getAttribute('data-volume-id');
            if (volumeId) {
                const individualKey = `downloads-${volumeId}`;
                let individualCount = parseInt(localStorage.getItem(individualKey) || '0');
                individualCount++;
                localStorage.setItem(individualKey, individualCount);
                
                const individualCounter = document.getElementById(individualKey);
                if (individualCounter) {
                    individualCounter.textContent = individualCount;
                }
            }
        });
    });
});