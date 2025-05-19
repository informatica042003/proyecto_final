document.addEventListener('DOMContentLoaded', function() {
    // Datos de las páginas web (puedes modificarlos según tus necesidades)
    const pages = [
  
        { name: "Practica 1", url: "https://informatica042003.github.io/practica1/" },
        { name: "Practica 2", url: "https://informatica042003.github.io/practica2/" },
        { name: "Practica 3", url: "https://informatica042003.github.io/practica3/" },
        { name: "Practica 4", url: "https://informatica042003.github.io/practica4/" },
        { name: "Practica 5", url: "https://informatica042003.github.io/practica5/" },
        { name: "Practica 6", url: "https://informatica042003.github.io/practica6/" },
        { name: "Practica 7", url: "https://informatica042003.github.io/practica7/" },
        { name: "Practica 8", url: "https://informatica042003.github.io/practica8/" },
        { name: "Practica 9", url: "https://informatica042003.github.io/practica9/" },
        { name: "Practica 10", url: "https://informatica042003.github.io/practica10/" },
        { name: "Practica 11", url: "https://informatica042003.github.io/practica11/" }
    ];

    const menu = document.getElementById('mainMenu');
    const contentFrame = document.getElementById('contentFrame');
    const pageUrlInput = document.getElementById('pageUrl');
    const loadPageBtn = document.getElementById('loadPage');
    const menuToggle = document.querySelector('.menu-toggle');

    // Generar el menú dinámico
    function generateMenu() {
        menu.innerHTML = '';
        
        pages.forEach(page => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = page.name;
            a.dataset.url = page.url;
            
            a.addEventListener('click', function(e) {
                e.preventDefault();
                loadPage(page.url);
                pageUrlInput.value = page.url;
                setActiveLink(this);
            });
            
            li.appendChild(a);
            menu.appendChild(li);
        });
    }

    // Cargar página en el iframe
    function loadPage(url) {
        try {
            contentFrame.src = url;
        } catch (error) {
            console.error('Error al cargar la página:', error);
            contentFrame.srcdoc = `<html><body><h1>Error al cargar la página</h1><p>${error.message}</p></body></html>`;
        }
    }

    // Establecer enlace activo
    function setActiveLink(activeLink) {
        const links = menu.querySelectorAll('a');
        links.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Manejar el botón de carga
    loadPageBtn.addEventListener('click', function() {
        const url = pageUrlInput.value.trim();
        if (url) {
            loadPage(url);
            
            // Marcar como activo si está en el menú
            const links = menu.querySelectorAll('a');
            let found = false;
            
            links.forEach(link => {
                if (link.dataset.url === url) {
                    setActiveLink(link);
                    found = true;
                }
            });
            
            if (!found) {
                const links = menu.querySelectorAll('a');
                links.forEach(link => link.classList.remove('active'));
            }
        }
    });

    // Permitir cargar con Enter
    pageUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadPageBtn.click();
        }
    });

    // Toggle del menú en móviles
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera en móviles
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !menu.contains(e.target) && e.target !== menuToggle) {
            menu.classList.remove('active');
        }
    });

    // Inicializar
    generateMenu();
    
    // Cargar la primera página por defecto
    if (pages.length > 0) {
        loadPage(pages[0].url);
        pageUrlInput.value = pages[0].url;
        setActiveLink(menu.querySelector('a'));
    }
});