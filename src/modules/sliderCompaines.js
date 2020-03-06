'use strict';

class SliderCompaines {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidersToShow = 3,
        //responsive = [],
    }) {
        if (!main || !wrap) {
            console.warn('carousel-slider: Необходимо 2 селектора, "main" и "wrap"');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.sliders = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidersToShow = slidersToShow;

        this.option = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidersToShow),
            maxPosition: this.sliders.length - this.slidersToShow,
        };
       // this.responsive = responsive;
    }

    init() {
        this.addClass();
        this.addStyle();

        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }

        /*if (this.responsive) {
            this.responseInit();
        }*/
    }

    addClass() {
        this.main.classList.add('carousel-slider');
        this.wrap.classList.add('carousel-slider__wrap');

        for (const item of this.sliders) {
            item.classList.add('carousel-slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('sliderCarusel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarusel-style';
        }

        style.textContent = `
            .carousel-slider {
                overflow: hidden !important;
            }
            .carousel-slider__wrap {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .carousel-slider__item {
                flex: 0 0 ${this.option.widthSlide}% !important;
                margin: auto 0 !important;
            }
        `;

        document.head.appendChild(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    nextSlider() {
        if (this.option.infinity || this.option.position < this.option.maxPosition) {
            ++this.option.position;

            if (this.option.position > this.option.maxPosition) {
                this.option.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.option.position * this.option.widthSlide}%)`;
        }
    }

    prevSlider() {
        if (this.option.infinity || this.option.position > 0) {
            --this.option.position;

            if (this.option.position < 0) {
                this.option.position = this.option.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.option.position * this.option.widthSlide}%)`;
        }
    }

    addArrow() {
        this.next = document.createElement('button');
        this.prev = document.createElement('button');

        this.next.className = 'companies-slider__next';
        this.prev.className = 'companies-slider__prev';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .companies-slider__next,
            .companies-slider__prev {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .companies-slider__next {
                border-left-color: #19b5fe
            }
            .companies-slider__prev {
                border-right-color: #19b5fe
            }

            .companies-slider__next:hover,
            .companies-slider__prev:hover,
            .companies-slider__next:focus,
            .companies-slider__prev:focus {
                background: transparent;
                outline: transparent;
            }
        `;
        document.head.appendChild(style);

    }

   /* responseInit() {
        const slidersToShowDefault = this.slidersToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const sizeСalculation = () => {
            this.option.widthSlide = Math.floor(100 / this.slideToShow);
            this.addStyle();                        
        };

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                    if (widthWindow < allResponse[i]) {
                        this.slidersToShow = this.responsive[i].slideToShow;
                        sizeСalculation();       
                    }
                }
            } else {
                this.slidersToShow = slidersToShowDefault;
                sizeСalculation();       
            }
        };

        checkResponse();

        window.addEventListener('resize', checkResponse);
    }*/
}

const sliderABC = () => {
    const slider = new SliderCompaines({
        main: '.companies-wrapper',
        wrap: '.companies-hor',
        prev: '.test-left',
        next: '.test-right',
        slidersToShow: 4,
        infinity: true,

        /*responsive: [{
                breakpoint: 1024,
                slideToShow: 3,
            },
            {
                breakpoint: 768,
                slideToShow: 2,
            },
            {
                breakpoint: 576,
                slideToShow: 1,
            }
        ],*/
    });

    slider.init();
};

export default sliderABC;