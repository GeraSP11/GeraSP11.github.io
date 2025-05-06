$(function () {
    // Navbar: cambio de apariencia al hacer scroll
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Menú móvil: cerrar al hacer clic en un enlace
    $('.nav-link').on('click', function () {
        const $menuToggle = $('#navbarNav');
        const bsCollapse = new bootstrap.Collapse($menuToggle[0], { toggle: false });

        if ($menuToggle.hasClass('show')) {
            bsCollapse.toggle();
        }
    });

    // Carruseles de proyectos
    $('.project-card').each(function () {
        const $card = $(this);
        const carousel = $card.find('.carousel')[0];

        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 2500,
            pause: 'false',
            wrap: true
        });

        carouselInstance.pause();

        $card.on('mouseenter', function () {
            carouselInstance.cycle();
            $card.addClass('highlighted');
        });

        $card.on('mouseleave', function () {
            carouselInstance.pause();
            $card.removeClass('highlighted');
        });
    });

    // Tooltips
    $('[data-bs-toggle="tooltip"]').each(function () {
        new bootstrap.Tooltip(this);
    });

    // Hover en skill cards
    $('.skill-card').hover(
        function () {
            $(this).addClass('skill-hover');
        },
        function () {
            $(this).removeClass('skill-hover');
        }
    );

    // Año actual en el footer
    $('#year').text(new Date().getFullYear());

    // Formulario de contacto con emailJS
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        const $button = $('#submitButton');
        const $status = $('#formStatus');

        $button.prop('disabled', true).text("Enviando...");

        emailjs.sendForm("service_71mogvg", "template_y7842rf", this)
            .then(function (response) {
                $status.text("✅ Mensaje enviado con éxito.");
                $('#contactForm')[0].reset();
            }, function (error) {
                console.error(error);
                $status.text("❌ Error al enviar el mensaje. Intenta más tarde.");
            })
            .finally(() => {
                $button.prop('disabled', false).html('Enviar Mensaje <i class="fas fa-paper-plane ms-2"></i>');
            });
    });
});
