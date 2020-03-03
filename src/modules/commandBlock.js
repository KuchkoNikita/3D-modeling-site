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

export default commandBlock;