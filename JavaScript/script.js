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
        
        let id;
        const updateClock = () => {
            let timer = getTimeRemaining();

            timerHours.textContent = ( timer.hours < 10 ) ? '0' + timer.hours : timer.hours;
            timerMinutes.textContent = ( timer.minutes < 10 ) ? '0' + timer.minutes : timer.minutes;
            timerSeconds.textContent = ( timer.seconds < 10 ) ? '0' + timer.seconds : timer.seconds;
            
            if (timer.timeRemaining < 0) {
                cancelAnimationFrame(id);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                requestAnimationFrame( updateClock );
            }
        };
        id = requestAnimationFrame( updateClock );
    };
    
    countTimer(); 

    // menu
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
        const popUpContent = popUp.querySelector('.popup-content');
        
        const popUpAnimation = () => { 
            let count = 0;
            let id;
            popUpContent.style.left = '-10%';

            const animationBlock = () => {
                popUpContent.style.left = count + '%';
                count++;
                if (count <= 41) {
                    requestAnimationFrame( animationBlock );
                }
            };

            id = requestAnimationFrame( animationBlock );
        };

        popUpBtn.forEach( ( elem ) => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (screen.width > 768) {
                    popUpAnimation();
                }
            });
        });
        
        popUp.addEventListener('click', (event) => {
            let target = event.target;
        
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
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
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach( ( item, i ) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    // slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        
        const addDots = () => {
            const portfolioDots = document.querySelector('.portfolio-dots');
            for (let i = 0; i < slide.length; i++) {
                if(i === 0){
                    portfolioDots.insertAdjacentHTML('beforeEnd', `<li class="dot dot-active"></li>`);   
                }else{
                    portfolioDots.insertAdjacentHTML('beforeEnd', `<li class="dot"></li>`);   
                }
            }
        };
        addDots();
        
        const dot = document.querySelectorAll('.dot');
        const slider = document.querySelector('.portfolio-content');
        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlider = (time = 4000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlider = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click' , (event) => {
            event.preventDefault();

            let target = event.target;

            if ( !target.matches('.portfolio-btn, .dot') ) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if ( target.matches('#arrow-right') ) {
                currentSlide++;
            } else if ( target.matches('#arrow-left') ) {
                currentSlide--;
            } else if ( target.matches('.dot') ) {
                dot.forEach( (elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            let target = event.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                stopSlider();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            let target = event.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                startSlider();
            }
        });
        startSlider(5000);
    };
    slider(); 

    // Calculator
    const calculatorBlock = (price = 100) => {
        const calcSquare = document.querySelector('.calc-square');
        const calcCount = document.querySelector('.calc-count');
        const calcDay = document.querySelector('.calc-day');

        const calcBlock = document.querySelector('.calc-block');
        const calcType = document.querySelector('.calc-type');
        const totalValue = document.getElementById('total');

        const checkNumbers = (num) => {
            num.value = num.value.replace(/[^\d]/g, '');
        };
        calcSquare.addEventListener('input', () => {
            checkNumbers(calcSquare);
        });
        calcCount.addEventListener('input', () => {
            checkNumbers(calcCount);
        });
        calcDay.addEventListener('input', () => {
            checkNumbers(calcDay);
        });
        
        let id;
        let countNumbers = 0;
        const animationNumber = (total) => {
            countNumbers += 100;
            if (countNumbers <= total) {
                totalValue.textContent = countNumbers;
                requestAnimationFrame(animationNumber);
            } else {
                countNumbers = 0;
            }
        };

        const countSum = () => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = Number(calcSquare.value);
 
            if (calcCount.value > 1) {
                countValue += ( calcCount.value - 1 ) / 10;
            }
            
            if (calcDay.value < 5 && calcDay.value) {
                dayValue *= 2;
            } else if (calcDay.value < 10 && calcDay.value) {
                dayValue *= 1.5;
            }
             
            if (typeValue && squareValue) {
                total = Math.round(price * typeValue * squareValue * countValue * dayValue);
                console.log('total: ', total);
                requestAnimationFrame( () => {
                    animationNumber(total);
                });
            } else {
                total = 0;
            } 
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if ( target.matches('select') || target.matches('input') ) {
                countSum();
            }
        });
    };
    calculatorBlock();

    // Command
    const commandBlock = () => {
        const row = document.querySelectorAll('.row')[8];
        let secondImage;

        row.addEventListener('mouseover', (event) => {
            let target = event.target;
            if(target.classList.contains('command__photo')) {
                secondImage = target.src;
                target.src = target.dataset.img;
            }
        });

        row.addEventListener('mouseout', (event) => {
            let target = event.target;
            if(target.classList.contains('command__photo')) {
                target.src = secondImage;
            }
        });
    };
    commandBlock();

    // send-ajax-form
    const sendForm = () => {
        const headerForm = new Validator({
            selector: '#form1',
            pattern: {
                phone: /^\+375( )?(( )?\d){9}$/,
                name: /[а-яА-ЯёЁ]+/
            },
            method: {
            'form1-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form1-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ],
            'form1-name': [
                ['notEmpty'],
                ['pattern', 'name']
            ]
        }
        });
        headerForm.init();

        const footerForm = new Validator({
            selector: '#form2',
            pattern: {
                phone: /^\+375( )?(( )?\d){9}$/,
                name: /^[а-яА-ЯёЁ]+$/,
                message: /^[а-яА-ЯёЁ0-9 ]+$/
            },
            method: {
            'form2-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form2-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ],
            'form2-name': [
                ['notEmpty'],
                ['pattern', 'name']
            ],
            'form2-message': [
                ['notEmpty'],
                ['pattern', 'message']
            ]
        }
        });
        footerForm.init();

        const popupForm = new Validator({
            selector: '#form3',
            pattern: {
                phone: /^\+375( )?(( )?\d){9}$/,
                name: /[а-яА-ЯёЁ]+/
            },
            method: {
            'form3-phone': [
                ['notEmpty'],
                ['pattern', 'phone']
            ],
            'form3-email': [
                ['notEmpty'],
                ['pattern', 'email']
            ],
            'form3-name': [
                ['notEmpty'],
                ['pattern', 'name']
            ]
        }
        });
        popupForm.init();
    };
    sendForm();
});