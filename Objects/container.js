class MiPanel extends HTMLElement {
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
  
          /* Estilos específicos para el panel (puedes ajustarlos) */
          .container {
            display: flex;
            gap: 20px; /* Space between sidebar and main content */
            padding: 20px;
          }
  
          .sidebar {
            width: 250px;
            background-color: #f9f9f9;
            border-right: 1px solid #ddd;
            padding: 20px;
            position: sticky; /* Sticky sidebar */
            top: 80px; /* Adjust as needed for header height */
            height: calc(100vh - 80px); /* Full viewport height minus header */
            overflow-y: auto; /* Scroll if content overflows */
            box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1); /* Sutil sombra */
          }
  
          .sidebar h3 {
            margin-bottom: 15px;
            color: #003057;
            border-bottom: 2px solid #003057; /* Línea más visible */
            padding-bottom: 5px;
          }
  
          .sidebar nav ul {
            list-style: none;
            padding: 0;
          }
  
          .sidebar nav ul li {
            margin-bottom: 10px;
          }
  
          .sidebar nav ul li a {
            display: block;
            color: #333;
            text-decoration: none;
            padding: 10px 15px;
            border-radius: 5px;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
  
          .sidebar nav ul li a:hover,
          .sidebar nav ul li a:focus {
            background-color: #003057; /* Color principal */
            color: white;
            outline: none; /* Evita el borde azul por defecto */
          }
  
          .sidebar nav ul li a i {
            margin-right: 10px;
            color: #555; /* Iconos un poco más claros */
          }
  
          .sidebar nav ul li a:hover i,
          .sidebar nav ul li a:focus i {
            color: white; /* Iconos blancos al hacer hover */
          }
        </style>
        <div class="container">
          <aside class="sidebar">
            <h3>Panel de Navegación</h3>
            <nav>
              <ul>
                <li>
                  <i class="fas fa-home"></i>
                  <a href="#inicio">Inicio</a>
                </li>
                <li><a href="#historia">Historia de la Revista</a></li>
                <li><a href="#linea-tiempo">Línea de Tiempo</a></li>
                <li><a href="#enfoque">Enfoque</a></li>
                <li><a href="#autores">Información para Autores</a></li>
                <li><a href="#postulacion-aprendiz">Postulación Aprendices</a></li>
              </ul>
            </nav>
          </aside>
          <slot></slot>
        </div>
      `;
    }
  }
  
  customElements.define('mi-panel', MiPanel);