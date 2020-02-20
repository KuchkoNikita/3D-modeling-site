window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Timer
    const countTimer = () => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        const gettingTomorrow = () => {
            let today = new Date();
            today.setDate(today.getDate()+1);
            let tomorrow = today.toLocaleString('en', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
            }); 
            return tomorrow;
        };
        
        const getTimeRemaining = () => {
            let dateStop = new Date(gettingTomorrow()).getTime();
            let dateNow = new Date().getTime();
            let timeRemaining = ( dateStop - dateNow ) / 1000;
            let seconds = Math.floor( timeRemaining % 60 );
            let minutes = Math.floor( ( timeRemaining / 60 ) % 60 );
            let hours = Math.floor( ( timeRemaining / 60 / 60 ) % 24 ); // 24
            
            return {timeRemaining, hours, minutes, seconds };
        };            
        
        const updateClock = () => {
            let timer = getTimeRemaining();

            timerHours.textContent = ( timer.hours < 10 ) ? '0' + timer.hours : timer.hours;
            timerMinutes.textContent = ( timer.minutes < 10 ) ? '0' + timer.minutes : timer.minutes;
            timerSeconds.textContent = ( timer.seconds < 10 ) ? '0' + timer.seconds : timer.seconds;
            
            if (timer.timeRemaining < 0) {
                clearInterval(id);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        let id = setInterval( updateClock, 1000 );
    };
    
    countTimer(); 

    // menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach( ( elem ) => elem.addEventListener( 'click', (event) =>{
            event.preventDefault();
            
            const blockID = elem.children[0].getAttribute('href').substr(1); 

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            handlerMenu();
        }));
    };
    toggleMenu();
    
    // scroll button
    const scrollAnimationButton = () => {
        const scrollBtn = document.querySelector('a');
        scrollBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            const blockID = scrollBtn.getAttribute('href').substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
    scrollAnimationButton();

    // popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup');
        const popUpBtn = document.querySelectorAll('.popup-btn');
        const popUpClose = document.querySelector('.popup-close');
        const popUpContent = popUp.querySelector('.popup-content');
        
        const popUpAnimation = () => { // Переделать
            let count = 0;
            popUpContent.style.left = '-10%';
            let id = setInterval( () => {
                popUpContent.style.left = count + '%';
                count++;
                if (count === 41) {
                    clearInterval(id);
                }
            }, 10);
        };

        popUpBtn.forEach( ( elem ) => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (screen.width > 768) {
                    popUpAnimation();
                }
            });
        });
        
        popUpClose.addEventListener('click', () => {
            popUp.style.display = 'none';
        });
    };
    togglePopUp();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            while (target !== tabHeader) {
                if (target.classList.contains('service-header-tab')) {
                    tab.forEach( ( item, i ) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                    return;
                }
                target = target.parentNode;
            }
        });
    };
    tabs();
});