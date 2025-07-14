// Objects/download_tracker.js (ejemplo simplificado)
document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('volumen_revista'); // Tu botón de descarga

    if (downloadButton) {
        const volumeId = downloadButton.dataset.volumeId; // Obtener el ID del volumen del data-attribute

        downloadButton.addEventListener('click', () => {
            let currentDownloads = parseInt(localStorage.getItem(`${volumeId}-downloads`) || '0');
            currentDownloads++;
            localStorage.setItem(`${volumeId}-downloads`, currentDownloads);

            // Opcional: Si el panel de métricas ya está cargado, intenta actualizarlo
            // Esto es solo si necesitas una actualización dinámica sin recargar la página.
            // Si no, el panel se actualizará la próxima vez que cargue la página
            // porque lee de localStorage al inicializarse.
            const metricPanel = document.querySelector('metricas-panel');
            if (metricPanel && metricPanel.shadowRoot) {
                const downloadsSidebar = metricPanel.shadowRoot.getElementById('downloads-sena-volumen-3-sidebar');
                if (downloadsSidebar) {
                    downloadsSidebar.textContent = currentDownloads;
                }
            }
        });
    }
});