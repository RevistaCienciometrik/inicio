class MiHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Encapsula los estilos y el DOM
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos del header */
                header {
                    background-color: #F9F9F9; /* Blanco hueso para el fondo principal del header */
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    width: 100%; /* Asegura que el header ocupe todo el ancho */
                }

                /* Header Top Bar */
                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #081D36; /* Azul oscuro de la paleta */
                    color: white;
                    padding: 10px 20px;
                    flex-wrap: wrap;
                }

                .header-top .logo-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0;
                }

                .header-top img.logo {
                    height: 40px;
                    margin-right: 15px;
                    flex-shrink: 0;
                }

                .header-top nav.menu {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                }

                .header-top nav.menu a {
                    color: white;
                    text-decoration: none;
                    margin: 5px 15px;
                    font-weight: bold;
                    font-size: 0.9em;
                    transition: color 0.3s ease;
                    white-space: nowrap;
                }

                .header-top nav.menu a:hover {
                    color: #00D6D0;
                    text-decoration: none;
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
                    background-color: #9CA8B3;
                    color: white;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .banner {
                    background-color: #39854A;
                    padding: 10px 20px;
                    color: #FFFFFF;
                    text-align: center;
                }

                .banner h1 {
                    font-size: 1.5em;
                    margin-bottom: 5px;
                }

                .banner p {
                    font-size: 1em;
                    line-height: 1.4;
                    margin-bottom: 5px;
                }

                /* --- Estilos del Botón de Hamburguesa --- */
                .hamburger {
                    display: none; /* Oculto por defecto en escritorio */
                    cursor: pointer;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 30px;
                    height: 25px;
                    background: transparent;
                    border: none;
                    padding: 0;
                    z-index: 1001; /* Asegúrate de que esté por encima del menú */
                }

                .hamburger .bar {
                    width: 100%;
                    height: 3px;
                    background-color: white;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }

                /* Animación del botón de hamburguesa */
                .hamburger.open .bar:nth-child(1) {
                    transform: translateY(11px) rotate(45deg);
                }

                .hamburger.open .bar:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.open .bar:nth-child(3) {
                    transform: translateY(-11px) rotate(-45deg);
                }


                /* --- Media Queries --- */

                /* Para Tablets y Móviles (ancho máximo de 768px) */
                @media (max-width: 768px) {
                    .header-top {
                        flex-direction: row; /* Mantener en fila el logo y el botón */
                        justify-content: space-between; /* Espacio entre logo y botón */
                        align-items: center;
                        padding: 15px 10px;
                    }

                    .header-top .logo-container {
                        margin-bottom: 0; /* Resetear margin */
                    }

                    .header-top img.logo {
                        height: 35px;
                        margin-right: 10px;
                    }

                    .header-top nav.menu {
                        display: none; /* Oculta el menú por defecto en pantallas pequeñas */
                        flex-direction: column;
                        position: absolute;
                        top: 60px; /* Ajusta según la altura de tu header-top */
                        left: 0;
                        width: 100%;
                        background-color: #081D36; /* Mismo color de fondo que el header-top */
                        padding: 10px 0;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                        z-index: 999; /* Debajo del botón de hamburguesa */
                    }

                    .header-top nav.menu.open {
                        display: flex; /* Muestra el menú cuando tiene la clase 'open' */
                    }

                    .header-top nav.menu a {
                        margin: 10px 0; /* Más espacio vertical para los enlaces apilados */
                        text-align: center;
                        width: 100%;
                    }

                    .hamburger {
                        display: flex; /* Muestra el botón de hamburguesa */
                    }

                    .banner {
                        padding: 15px 15px;
                    }

                    .banner h1 {
                        font-size: 1.3em;
                    }

                    .banner p {
                        font-size: 0.9em;
                        line-height: 1.3;
                    }
                }

                /* Para Celulares (ancho máximo de 480px) - Ajustes adicionales si es necesario */
                @media (max-width: 480px) {
                    .header-top {
                        padding: 10px 5px;
                    }

                    .header-top .logo-container {
                        flex-direction: row; /* Mantener logos en fila si son solo dos */
                        margin-bottom: 0;
                    }

                    .header-top img.logo {
                        height: 30px;
                        margin: 0 5px; /* Espacio entre logos */
                    }
                    
                    .header-top nav.menu a {
                        font-size: 0.85em; /* Un poco más pequeño */
                    }

                    .banner {
                        padding: 10px 10px;
                    }

                    .banner h1 {
                        font-size: 1.1em;
                    }

                    .banner p {
                        font-size: 0.8em;
                        line-height: 1.2;
                    }
                }
            </style>

            <header>
                <div class="header-top">
                    <div class="logo-container">
                        <img src="Objects/LogosPNG-2/logo_blanco.png" alt="Logo Revista" class="logo" />
                        <img src="Objects/logos_png/sena_blanco.png" alt="Logo SENA" class="logo" />
                    </div>
                    <button class="hamburger" aria-label="Abrir menú de navegación">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                    <nav class="menu">
                        <a href="index.html">Inicio</a>
                        <a href="quienes_somos.html">¿Quiénes somos?</a>
                        <a href="publicaciones.html">Publicaciones</a>
                        <a href="autores.html">Autores</a>
                        <a href="contactanos.html">Contáctanos</a>
                        <a href="login/login.html">Zona Administrativa</a>
                    </nav>
                </div>

            </header>
        `;
    }

    setupEventListeners() {
        // Asegúrate de que el DOM ya ha sido renderizado en el shadow DOM
        this.shadowRoot.querySelector('.hamburger').addEventListener('click', () => {
            this.toggleMenu();
        });

        // Opcional: Cerrar el menú si se hace clic fuera de él (solo para móviles/tablets)
        // Esto es un poco más complejo con Shadow DOM, pero se puede añadir si es necesario.
        // Por ahora, se cierra al hacer clic en un enlace o en el botón de hamburguesa.
        this.shadowRoot.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerrar el menú si está abierto (para evitar parpadeo en desktop)
                if (window.innerWidth <= 768) { // Cierra solo en tamaños móviles/tablet
                    this.toggleMenu(false); // Forzar el cierre
                }
            });
        });
    }

    toggleMenu(forceClose = undefined) {
        const menu = this.shadowRoot.querySelector('.menu');
        const hamburger = this.shadowRoot.querySelector('.hamburger');

        if (forceClose !== undefined) {
            if (forceClose) {
                menu.classList.add('open');
                hamburger.classList.add('open');
            } else {
                menu.classList.remove('open');
                hamburger.classList.remove('open');
            }
        } else {
            menu.classList.toggle('open');
            hamburger.classList.toggle('open');
        }
    }
}

// Define el custom element una sola vez
customElements.define('mi-header', MiHeader);