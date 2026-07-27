class MiFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Estilos VIP para el Footer Corporativo */
          footer {
            background-color: #003057; /* Azul corporativo oscuro */
            color: #ffffff;
            text-align: center;
            padding: 35px 20px;
            margin-top: 50px;
            font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
            border-top: 5px solid #39A900; /* Borde Verde SENA */
            box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05); /* Sombra hacia arriba */
          }
          
          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .footer-text {
            font-size: 1rem;
            color: #e0e6ed;
            margin: 0;
            letter-spacing: 0.5px;
          }

          .footer-subtext {
            font-size: 0.85rem;
            color: #9ba4b5;
            margin: 0;
          }

          .bold-text {
            font-weight: 700;
            color: #3FCED4; /* Resalte Cyan para Cienciométrik */
          }
        </style>

        <footer>
          <div class="footer-content">
              <p class="footer-text">
                &copy; 2026 <span class="bold-text">Revista Cienciométrik</span>. Todos los derechos reservados.
              </p>
              <p class="footer-subtext">
                Sistema de Investigación, Desarrollo Tecnológico e Innovación — SENNOVA
              </p>
          </div>
        </footer>
      `;
    }
}
  
customElements.define('mi-footer', MiFooter);