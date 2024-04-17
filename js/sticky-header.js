const header = $('#_header');
let lastScrollTop = 0;

$(window).on('scroll', function() {
    let currentScrollTop = $(this).scrollTop(); // Obtenemos la nueva posición del scroll

    if (currentScrollTop > lastScrollTop && currentScrollTop > 200){
        header.addClass('header-scrolled');
    } else {
        if(currentScrollTop < 301) {
            header.removeClass('header-scrolled');
        }

    }

    header.on('mouseenter', function(){
        $(this).addClass('header-scrolled');
    });
    
    header.on('mouseleave', function(){
        if(currentScrollTop < 201) {
            $(this).removeClass('header-scrolled');
        }
    });
    
    lastScrollTop = currentScrollTop;
});

