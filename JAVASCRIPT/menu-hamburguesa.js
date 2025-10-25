document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu'); 

    menuToggle.addEventListener('click', function() {
        
        menuToggle.classList.toggle('active');
        
        mobileMenu.classList.toggle('open');
        
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
});