class MiFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Importa tus estilos generales */
          @import url('styles.css');
  
          /* Estilos específicos para el footer (si los hubiera) */
          footer {
            text-align: center;
            padding: 20px;
            background-color: #e0e0e0;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
        <footer>
          <p>&copy; 2025 Revista Cienciometrik. Todos los derechos reservados.</p>
        </footer>
        
        
      `;
    }
  }
  
  customElements.define('mi-footer', MiFooter);