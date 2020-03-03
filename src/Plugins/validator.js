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

    init(){
        let statusMessage;
        const errorMessage = 'Что-то пошло не так';
        const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

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
                            console.error(error);
                        });
                    
                    this.elementsForm.forEach(elem => {
                        elem.value = '';
                        elem.classList.remove('success');
                    });
                };

                messagePost();
   
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
            console.log('Необходимо передать id полей ввода и метод проверки этих полей для проверки валидатором');
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