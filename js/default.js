$(document).ready(function() {
    const header2 = $('#_header');
    const mainBanner = $('.home-banner.main-banner');
    const navList = $('.sections-nav-list');
    mainBanner.css('top', '-' + header2.outerHeight(true) + 'px');

    $('a').click(function(event) {
        event.preventDefault();
    
        let target = $(this.hash);
        if (target.length) {
            let scrollto = target.offset().top - $('#_header').outerHeight(true);
    
            $('html, body').animate({
                scrollTop: scrollto
            }, 800);
        }
    });
    

    if($(window).width() < 769) {
        navList.addClass('hide-element');
    } else {
        navList.removeClass('hide-element');
    }




});