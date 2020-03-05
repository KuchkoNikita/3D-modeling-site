'use strict';

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

export default slider;