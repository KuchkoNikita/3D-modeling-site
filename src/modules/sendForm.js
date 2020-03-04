class Validator {
    constructor({selector, pattern = {}, method}) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.error = new Set();
    }

    displayMessage() {
        let statusMessage;
        const errorMessage = 'Что-то пошло не так';
        const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: body
            });
        };

        const messagePost = () => {
            if (statusMessage) {
                this.form.removeChild(statusMessage);
            } else {
                statusMessage = document.createElement('div');
                statusMessage.style.cssText = 'font-size: 2rem';
            }

            this.form.appendChild(statusMessage);
            statusMessage.style.top = '200px';  
            statusMessage.innerHTML = `
            <div class="spinner">
                <div class="spinner-circle spinner-circle-outer"></div>
                <div class="spinner-circle-off spinner-circle-inner"></div>
                <div class="spinner-circle spinner-circle-single-1"></div>
                <div class="spinner-circle spinner-circle-single-2"></div>
            </div>`;

            const formData = new FormData(this.form);
            
            postData(formData)
                .then( (response) => {
                    if( response.readyState !== 4 && response.status !== 200 ) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch ( (error) => {
                    statusMessage.textContent = errorMessage;
                    statusMessage.style.color = '#FFF';
                    console.error(error);
                });
            
            this.elementsForm.forEach(elem => {
                elem.value = '';
                elem.classList.remove('success');
            });
        };

        messagePost();
    }

    init(){
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach((elem) => {
            elem.addEventListener('change', this.checkIt.bind(this));
        });
        this.form.addEventListener('submit', e => {
            event.preventDefault();

            this.elementsForm.forEach(elem => {
                this.checkIt({target: elem});
            });

            if (this.error.size){
                return;
            } else{
                this.displayMessage();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };
        if (this.method) {
            const method = this.method[elem.id];
        
            if (method) {
                return method.every( item => validatorMethod[ item[0] ]( elem, this.pattern[item[1]] ) );
            } 
        } else {
            console.error('Необходимо передать id полей ввода и метод проверки этих полей для проверки валидатором');
        }

        return true;
    }

    checkIt() {
        const target = event.target;

        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target)
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
            input.success {
                outline: 0;
                box-shadow: inset 0 3px 3px rgba(139, 224, 160), 0 0 15px rgba(52, 201, 36, .6);
            }
            input.error {
                outline: 0;
                box-shadow: inset 0 3px 3px rgba(222, 111, 111), 0 0 15px rgba(255, 0, 0, .6);
            }
        `;
        document.head.appendChild(style);
    }

    setPattern() {
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+[\w\.\d]+@\w+\.\w{2,}$/;
        }
    }
}

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

export default sendForm;