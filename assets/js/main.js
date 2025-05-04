// Función de cambio de apariencia en la navbar al hacer scroll
function handleNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Función para cerrar el menú móvil al hacer clic en un enlace
function closeMobileMenuOnClick() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });
}

// Función de configuración de carruseles de proyectos
function initProjectCarousels() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const carousel = card.querySelector('.carousel');

        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 2500,
            pause: 'false',
            wrap: true
        });

        // Pausar al principio
        carouselInstance.pause();

        // Activar carrusel al pasar el ratón
        card.addEventListener('mouseenter', function () {
            carouselInstance.cycle();
            card.classList.add('highlighted');
        });

        // Pausar carrusel al salir el ratón
        card.addEventListener('mouseleave', function () {
            carouselInstance.pause();
            card.classList.remove('highlighted');
        });
    });
}

// Función para inicializar los tooltips de las habilidades
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Función para el hover en las skill cards
function handleSkillCardHover() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('skill-hover');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('skill-hover');
        });
    });
}

// Función para mostrar el año actual en el copyright
function updateYearInFooter() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Función para el envío de correo electrónico desde el formulario de contacto
function initContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const button = document.getElementById("submitButton");
        const status = document.getElementById("formStatus");

        button.disabled = true;
        button.innerText = "Enviando...";

        emailjs.sendForm("service_71mogvg", "template_y7842rf", this)
            .then(function (response) {
                status.innerText = "✅ Mensaje enviado con éxito.";
                document.getElementById("contactForm").reset();
            }, function (error) {
                console.error(error);
                status.innerText = "❌ Error al enviar el mensaje. Intenta más tarde.";
            })
            .finally(() => {
                button.disabled = false;
                button.innerHTML = 'Enviar Mensaje <i class="fas fa-paper-plane ms-2"></i>';
            });
    });
}

// Inicialización de todas las funciones
document.addEventListener('DOMContentLoaded', function () {
    // Navbar
    window.addEventListener('scroll', handleNavbarOnScroll);

    // Menú móvil
    closeMobileMenuOnClick();

    // Carruseles de proyectos
    initProjectCarousels();

    // Tooltips
    initTooltips();

    // Skill card hover
    handleSkillCardHover();

    // Actualización del año en el footer
    updateYearInFooter();

    // Formulario de contacto
    initContactForm();
});
