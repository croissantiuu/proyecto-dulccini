$(document).ready(function() {
    const header2 = $('#_header');
    const mainBanner = $('.home-banner.main-banner');
    const navList = $('.sections-nav-list');
    const mobileMenu = $('.menu-mobile');
    let i = 0;
    let i2 = 0;
    let isTyping = false;
    let isTyping2 = false;
    mainBanner.css('top', '-' + header2.outerHeight(true) + 'px');

    $("#take-order-form-btn").on('click', function(e) {
        e.preventDefault();
        const whatsAppUrl = "https://wa.link/t887dr";
        window.location = whatsAppUrl;

    });

    $('#videogame-link').on('click', function(e){
        e.preventDefault();
        const videogameUrl = "./app/game.html";
        window.location = videogameUrl;
    });

    $('a').click(function(event) {
        // event.preventDefault();
    
        let target = $(this.hash);
        if (target.length) {
            let scrollto = target.offset().top - $('#_header').outerHeight(true);
    
            $('html, body').animate({
                scrollTop: scrollto
            }, 800);
        }
    });
    

    if($(window).width() < 769) {
        $('#us-message').addClass('hide-us-information');
        navList.addClass('hide-element');
        mobileMenu.removeClass('hide-element');
        mobileMenu.on('click', function(e) {
            e.preventDefault();
            navList.toggleClass('megamenu-mobile-open');
            navList.toggleClass('hide-element');
        });
        $('.nav-list-link').on('click', function() {
            navList.removeClass('megamenu-mobile-open');
            navList.addClass('hide-element');
        });
        $('.us-message-btn').on('click', function(){
            $('#us-message').removeClass('hide-us-information');
        });
    } else {
        navList.removeClass('hide-element');
        mobileMenu.addClass('hide-element');
    }

    $(document).scroll(function(){
        const quote = document.querySelector('#us-message');
        const quote2 = document.querySelector('#us-message-2');
        let quotePosition = quote.getBoundingClientRect().top;
        let screenPosition = window.innerHeight / 1.5;
        let quote2Position = quote2.getBoundingClientRect().top;

        if(quotePosition < screenPosition && !isTyping) {
            isTyping = true;
            function typeWriter() {
                let txt =  '“En Dulccini, nuestra misión es endulzar la vida de nuestros clientes con el sabor auténtico y cálido del hogar. Nos esforzamos por crear postres caseros, elaborados con amor y dedicación, que evocan recuerdos dulces y crean nuevos momentos inolvidables. Nuestro compromiso es llevar la esencia de la tradición familiar a cada uno de nuestros productos, garantizando la calidad y el sabor que nos distingue.”' ;
                if (i < txt.length) {
                    quote.innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(typeWriter, 20);
                }
            }
            typeWriter();
        }
        
    });


});