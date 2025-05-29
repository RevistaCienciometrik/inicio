class MiHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Encapsula los estilos y el DOM
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos del header */
                header {
                    background-color: #F9F9F9; /* Blanco hueso para el fondo principal del header [cite: 1] */
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                /* Header Top Bar */
                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #081D36; /* Azul oscuro de la paleta [cite: 5] */
                    color: white;
                    padding: 10px 20px;
                }

                .header-top .logo-container {
                    display: flex;
                    align-items: center;
                }

                .header-top img.logo {
                    height: 40px;
                    margin-right: 15px;
                }

                .header-top nav.menu {
                    display: flex;
                    align-items: center;
                }

                .header-top nav.menu a {
                    color: white; /* Texto blanco [cite: 6] */
                    text-decoration: none;
                    margin: 0 15px;
                    font-weight: bold;
                    font-size: 0.9em;
                    transition: color 0.3s ease; /* Efecto de transición para el color */
                }

                .header-top nav.menu a:hover {
                    color: #00D6D0; /* Turquesa brillante al pasar el ratón [cite: 6] */
                    text-decoration: none; /* Mantener sin subrayado */
                }

                /* Opcional: Si el user-info se sigue usando, aquí sus estilos con los colores de la paleta */
                .user-info {
                    display: flex;
                    align-items: center;
                }

                .user-info .notification-icon {
                    margin-right: 10px;
                    cursor: pointer;
                }

                .user-info .profile-dropdown {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }

                .user-info .profile-dropdown .profile-name {
                    margin-right: 5px;
                }

                .user-info .profile-dropdown .profile-initials {
                    background-color: #9CA8B3; /* Gris neutro de la paleta [cite: 1] */
                    color: white;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .banner {
                    background-color: #39854A; /* ¡Nuevo Verde claro brillante para el banner! [cite: 4] */
                    padding: 0.5px 20px;
                    color: #FFFFFF; /* Blanco puro para el texto del banner [cite: 4] */
                }

                .banner h1 {
                    font-size: 1.3em;
                    margin-bottom: 3px;
                }

                .banner p {
                    font-size: 0.9em;
                    line-height: 0.5;
                }
            </style>

            <header>
                <div class="header-top">
                    <div class="logo-container">
                    <br><br>
                        <img src="/Images/LOGOS PNG-Cienciométrik/Logo SENA blanco.png" alt="Logo SENA" class="logo" / >
                        
                        <img src="Images/LOGOS PNG-Cienciométrik/Logo cienciometrik blanco.png" alt="Logo Revista" class="logo" />
                    </div>
                    <nav class="menu">
                        <a href="index.html">Inicio</a>
                        <a href="quienes_somos.html">Quienes somos</a>
                        <a href="publicaciones.html">Publicaciones</a>
                        <a href="autores.html">Autores</a>
                        <a href="contactanos.html">Contáctanos</a>
                        <a href="login/login.html">Zona Administrativa</a>
                    </nav>
                </div>
                <div class="banner">
                    <br>
                    <p>Publicación semestral del Servicio Nacional de Aprendizaje SENA, Centro de Comercio, Regional Antioquia, adscrita al Sistema de Investigación, Desarrollo Tecnológico e Innovación SENNOVA. </p>
                    <p>ISSN: 2981-5533</p>
                    <p>¡Bienvenidos!</p>
                    <br>
                </div>
            </header>
        `;
    }
}

// Define el custom element una sola vez
customElements.define('mi-header', MiHeader);