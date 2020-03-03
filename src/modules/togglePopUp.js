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

export default togglePopUp;