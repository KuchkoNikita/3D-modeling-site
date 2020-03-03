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

export default scrollAnimationButton;