const header2 = $('#_header');
const mainBanner = $('.home-banner.main-banner');
mainBanner.css('top', '-' + header2.outerHeight(true) + 'px');

$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});




