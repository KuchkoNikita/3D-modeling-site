'use strict';

const toggleMenu = () => { 
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu')) {
            handlerMenu();
        } else if (target.classList.contains('close-btn')) {
            handlerMenu();
        } else if (menu.classList.value === 'active-menu' && target.tagName === 'A') {
            event.preventDefault();
            let blockID = target.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView( {
                behavior: 'smooth',
                block: 'center'
            });
            handlerMenu();
        } else if (!target.classList.contains('active-menu') && menu.classList.value === 'active-menu') {
            handlerMenu();
        }
    });
};

export default toggleMenu;