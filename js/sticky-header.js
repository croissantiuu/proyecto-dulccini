const header = $('#_header');
const navigationBar = $('.sections-nav-list');
let scrollBefore = 0; 
let lastScrollTop = 0;
let isScrollingUp = false;
let slidingCount = 0; 
let logoNav = $('.logo-nav');

$(document).ready(function() {
    // navigationBar.css('top', header.outerHeight(true));
    if($(window).scrollTop() == 0) {
        navigationBar.addClass('nav-bar-hidden');
    } else {
        navigationBar.removeClass('nav-bar-hidden');
    }
});

$(document).scroll(function(){ 
    scroll = $(window).scrollTop(); 
    let scrollStatus = scrollBefore - scroll; 
    // Functions exclusive for home 
    if($(window).scrollTop() == 0) {
        navigationBar.addClass('nav-bar-hidden');
    } else {
        navigationBar.removeClass('nav-bar-hidden');
    }
    if (scrollStatus < 0 && scroll >= 120){ // scroll down 
        // Hide navigationBar 
        // navigationBar.addClass('nav-bar-scrolled');
    } else if (scrollStatus > 0) { // scroll up 
        // Show navigationBar 
        // navigationBar.removeClass('nav-bar-scrolled');
    } 
    if (scrollStatus < 0 && scroll >= 160){ // scroll down 
        // Page header with solid color white 
        header.addClass('header-scrolled'); 
        logoNav.addClass('logo-nav-scrolled');
    } else if (scrollStatus > 0 && scroll <= 160) { // scroll up 
        // Page header with transparent 
        header.removeClass('header-scrolled');
        logoNav.removeClass('logo-nav-scrolled'); 
    } 
    //Function exclusive Product view 
    scrollBefore = scroll; 
}); 

