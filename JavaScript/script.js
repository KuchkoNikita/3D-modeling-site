window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    /*var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate() + 1;
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();*/
    
    // Timer
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        const getTimeRemaining = () => {
            let dateStop = new Date(deadline).getTime();
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
                clearInterval();
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        setInterval( updateClock, 1000 );
    };
    
    countTimer('20 february 2020'); // Переделать
    //countTimer(day + ' ' + 'february' + ' ' + year);

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
            let id = setInterval(()=>{
                popUpContent.style.left = count + '%';
                count++;
                if(count === 41){
                    clearInterval(id);
                }
            }, 10);
        };

        popUpBtn.forEach( (elem) => {
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
});