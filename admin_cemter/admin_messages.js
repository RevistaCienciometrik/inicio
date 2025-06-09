// admin_messages.js
import { getFirestore, collection, getDocs, orderBy, query, doc, deleteDoc, updateDoc, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Su configuración de Firebase (asegúrese de que esté presente y sea la correcta)
const firebaseConfig = {
    apiKey: "AIzaSyAuRQC65O5zlkNbcnp1srZkQpjmD82TVco",
    authDomain: "cienciometrik-3c8e7.firebaseapp.com",
    projectId: "cienciometrik-3c8e7",
    storageBucket: "cienciometrik-3c8e7.firebasestorage.app",
    messagingSenderId: "60232446009",
    appId: "1:60232446009:web:1ce1cbb0437018d62f9de8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar los mensajes de contacto
async function loadContactMessages(filter = 'all') {
    const tableBody = document.getElementById('contactMessagesTableBody');
    tableBody.innerHTML = '<tr><td colspan="9">Cargando mensajes...</td></tr>'; // 9 columnas ahora

    try {
        let q;
        if (filter === 'unread') {
            q = query(collection(db, "mensajesContacto"), where("leido", "==", false), orderBy("fecha", "desc"));
        } else if (filter === 'read') {
            q = query(collection(db, "mensajesContacto"), where("leido", "==", true), orderBy("fecha", "desc"));
        } else { // 'all'
            q = query(collection(db, "mensajesContacto"), orderBy("fecha", "desc"));
        }
        
        const querySnapshot = await getDocs(q);
        
        tableBody.innerHTML = ''; // Limpiar mensaje de carga

        if (querySnapshot.empty) {
            tableBody.innerHTML = '<tr><td colspan="9">No hay mensajes de contacto.</td></tr>';
            return;
        }

        querySnapshot.forEach((docFirebase) => { // Cambiado a docFirebase para evitar conflicto con doc de DOM
            const message = docFirebase.data();
            const row = tableBody.insertRow();
            
            // Añadir una clase 'unread' si el mensaje no ha sido leído
            if (!message.leido) {
                row.classList.add('unread-message');
            }

            row.insertCell().textContent = docFirebase.id; // ID del mensaje
            row.insertCell().textContent = message.nombre;
            row.insertCell().textContent = message.email;
            row.insertCell().textContent = message.tipoConsulta;
            row.insertCell().textContent = message.asunto;
            row.insertCell().textContent = message.mensaje;
            row.insertCell().textContent = message.fecha ? new Date(message.fecha.toDate()).toLocaleString() : 'N/A'; // Formatear fecha
            row.insertCell().textContent = message.leido ? 'Leído' : 'No Leído'; // Estado del mensaje

            // Celda de acciones
            const actionsCell = row.insertCell();
            actionsCell.classList.add('actions-cell'); // Añadir clase para estilos CSS

            // Botón Marcar como Leído/No Leído
            const toggleReadButton = document.createElement('button');
            toggleReadButton.classList.add('admin-button');
            toggleReadButton.classList.add(message.leido ? 'button-secondary' : 'button-primary');
            toggleReadButton.textContent = message.leido ? 'Marcar No Leído' : 'Marcar Leído';
            toggleReadButton.onclick = () => toggleMessageReadStatus(docFirebase.id, message.leido);
            actionsCell.appendChild(toggleReadButton);

            // Botón Eliminar
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('admin-button', 'button-danger');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => deleteMessage(docFirebase.id);
            actionsCell.appendChild(deleteButton);
        });

    } catch (error) {
        console.error("Error al cargar los mensajes de contacto: ", error);
        tableBody.innerHTML = '<tr><td colspan="9">Error al cargar los mensajes. Por favor, inténtelo de nuevo.</td></tr>';
    }
}

// Función para eliminar un mensaje
async function deleteMessage(messageId) {
    if (confirm('¿Está seguro de que desea eliminar este mensaje? Esta acción es irreversible.')) {
        try {
            await deleteDoc(doc(db, "mensajesContacto", messageId));
            alert('Mensaje eliminado correctamente.');
            loadContactMessages(document.getElementById('filterStatus').value); // Recargar la tabla con el filtro actual
        } catch (error) {
            console.error("Error al eliminar el mensaje: ", error);
            alert('Hubo un error al eliminar el mensaje. Por favor, inténtelo de nuevo.');
        }
    }
}

// Función para alternar el estado de lectura de un mensaje
async function toggleMessageReadStatus(messageId, currentStatus) {
    try {
        await updateDoc(doc(db, "mensajesContacto", messageId), {
            leido: !currentStatus // Cambia el estado actual
        });
        alert('Estado del mensaje actualizado correctamente.');
        loadContactMessages(document.getElementById('filterStatus').value); // Recargar la tabla con el filtro actual
    } catch (error) {
        console.error("Error al actualizar el estado del mensaje: ", error);
        alert('Hubo un error al actualizar el estado del mensaje. Por favor, inténtelo de nuevo.');
    }
}


// Event listeners para cargar mensajes y filtrar
document.addEventListener('DOMContentLoaded', () => {
    // Comprobar si la sección "mensajes-contacto-admin" es la activa al cargar la página
    const currentActiveSectionLink = document.querySelector('.sidebar-link.active');
    if (currentActiveSectionLink && currentActiveSectionLink.getAttribute('href') === '#mensajes-contacto-admin') {
        loadContactMessages();
    }

    // Escuchar clics en los enlaces de la barra lateral para cargar contenido
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Eliminar la clase 'active' de todos los enlaces y secciones
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));

            // Añadir la clase 'active' al enlace clickeado
            event.currentTarget.classList.add('active');

            // Mostrar la sección correspondiente
            const targetSectionId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }

            if (targetSectionId === 'mensajes-contacto-admin') {
                loadContactMessages(); // Cargar mensajes cuando se haga clic en "Mensajes de Contacto"
            }
        });
    });

    // Escuchar cambios en el filtro de estado
    const filterStatusSelect = document.getElementById('filterStatus');
    if (filterStatusSelect) {
        filterStatusSelect.addEventListener('change', (event) => {
            loadContactMessages(event.target.value);
        });
    }
});

// Hacer que loadContactMessages sea accesible si es necesario en otro lugar (por ejemplo, para la carga inicial)
window.loadContactMessages = loadContactMessages;