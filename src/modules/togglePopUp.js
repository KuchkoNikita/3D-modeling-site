'use strict';

const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpContent = popUp.querySelector('.popup-content');
    
    const popUpAnimation = () => { 
        let count = 0;
        popUpContent.style.left = '-30%';

        const animationBlock = () => {
            popUpContent.style.left = count + '%';
            count++;
            if (count <= 38) {
                requestAnimationFrame( animationBlock );
            }
        };

        requestAnimationFrame( animationBlock );
    };

    popUpBtn.forEach( ( elem ) => {
        elem.addEventListener('click', () => {
            popUp.style.display = 'block';
            if (document.body.clientWidth > 768) {
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

export default togglePopUp;