class MiHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
        this.setActiveLink(); // Llamamos a la nueva función al crear el menú
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos del header */
                header {
                    background-color: #ffffff;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    width: 100%;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                }

                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 30px;
                    flex-wrap: wrap;
                    max-width: 1500px;
                    margin: 0 auto;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                }

                .header-top img.logo {
                    height: 45px; 
                    margin-right: 20px;
                    flex-shrink: 0;
                    transition: transform 0.3s ease;
                }

                .header-top img.logo:hover {
                    transform: scale(1.05);
                }

                .header-top nav.menu {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                }

                /* --- MENÚ VIP --- */
                .header-top nav.menu a {
                    color: #003057; 
                    text-decoration: none;
                    margin: 5px 10px;
                    padding: 8px 15px;
                    font-weight: 700;
                    font-size: 0.95em;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                    position: relative;
                    border-radius: 6px;
                    font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
                }

                /* Efecto de línea animada debajo del menú */
                .header-top nav.menu a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 3px;
                    background: #39A900; 
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                    border-radius: 2px;
                }

                /* --- ESTADO ACTIVO Y HOVER --- */
                /* Cuando pasas el ratón o cuando es la página actual (.active) */
                .header-top nav.menu a:hover,
                .header-top nav.menu a.active {
                    color: #39A900;
                    background: rgba(57, 169, 0, 0.05); 
                }

                .header-top nav.menu a:hover::after,
                .header-top nav.menu a.active::after {
                    width: 70%;
                }

                /* --- Botón de Hamburguesa para Móviles --- */
                .hamburger {
                    display: none;
                    cursor: pointer;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 30px;
                    height: 25px;
                    background: transparent;
                    border: none;
                    padding: 0;
                    z-index: 1001;
                }

                .hamburger .bar {
                    width: 100%;
                    height: 3px;
                    background-color: #003057;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }

                .hamburger.open .bar:nth-child(1) { transform: translateY(11px) rotate(45deg); }
                .hamburger.open .bar:nth-child(2) { opacity: 0; }
                .hamburger.open .bar:nth-child(3) { transform: translateY(-11px) rotate(-45deg); }

                /* --- Media Queries --- */
                @media (max-width: 900px) {
                    .header-top {
                        padding: 15px 20px;
                    }
                    .header-top nav.menu a {
                        margin: 5px;
                        padding: 8px 10px;
                        font-size: 0.85em;
                    }
                }

                @media (max-width: 768px) {
                    .header-top nav.menu {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background-color: #ffffff;
                        padding: 15px 0;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                        border-top: 3px solid #39A900;
                    }
                    .header-top nav.menu.open { display: flex; }
                    .header-top nav.menu a {
                        margin: 5px 0;
                        text-align: center;
                        width: 90%;
                        font-size: 1.1em;
                    }
                    .hamburger { display: flex; }
                }
            </style>

            <header>
                <div class="header-top">
                    <div class="logo-container">
                        <img src="logo.png" alt="Logo Revista" class="logo" onerror="this.src='Objects/LogosPNG-2/logo_negro.png'" />
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
        this.shadowRoot.querySelector('.hamburger').addEventListener('click', () => {
            this.toggleMenu();
        });

        this.shadowRoot.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { 
                    this.toggleMenu(false); 
                }
            });
        });
    }

    // --- NUEVA FUNCIÓN PARA DETECTAR EN QUÉ PÁGINA ESTAMOS ---
    setActiveLink() {
        // Obtenemos la URL actual limpia (sin parámetros de búsqueda o identificadores #)
        const currentLocation = window.location.href.split('?')[0].split('#')[0]; 
        const links = this.shadowRoot.querySelectorAll('.menu a');
        
        links.forEach(link => {
            const linkHref = link.href;
            
            // Si la ruta absoluta del enlace coincide con la URL actual
            if (linkHref === currentLocation) {
                link.classList.add('active');
            } 
            // Maneja el caso especial de la raíz (cuando el servidor abre index.html por defecto)
            else if (currentLocation.endsWith('/') && link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
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

customElements.define('mi-header', MiHeader);