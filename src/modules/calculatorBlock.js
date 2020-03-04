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
        const step = 100;
        countNumbers += step;

        if (countNumbers <= total) {
            totalValue.textContent = countNumbers;
        } else {
            countNumbers = 0;
            clearInterval(id);
        }
    };

    const countSum = () => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value;
        const squareValue = Number(calcSquare.value);

        if (calcSquare.value === '') {
            total = 0;
            totalValue.textContent = total;
        }

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
            id = setInterval( () => {
                animationNumber(total);
            }, 10);
        } else {
            total = 0;
        } 
    };

    calcBlock.addEventListener('change', (event) => { // change
        const target = event.target;

        if ( target.matches('select') || target.matches('input') ) {
            clearInterval(id);
            countSum();
        }
    });
};

export default calculatorBlock;