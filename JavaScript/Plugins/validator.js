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
        const loadMessage = 'Загрузка...';
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
            if(this.error.size){
                return;
            }else{

                const postData = (body, outputData, errorData) => {
                    const request = new XMLHttpRequest();
                
                    request.addEventListener('readystatechange', () => {
                        if(request.readyState !== 4){
                            return;
                        }
                        if(request.status === 200){
                            outputData();
                        }else{
                            errorData(request.status);
                        }
                    });
        
                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(JSON.stringify(body));
        
                };

                const messagePost = () => {

                    this.elementsForm.forEach(elem => {
                        elem.value = '';
                        elem.classList.remove('success');
                    });
                    
                    if(statusMessage){
                        this.form.removeChild(statusMessage);
                    }else{
                        statusMessage = document.createElement('div');
                        statusMessage.style.cssText = 'font-size: 2rem';
                    }

                    this.form.appendChild(statusMessage);
                    statusMessage.textContent = loadMessage;

                    const formData = new FormData(this.form);
                    
                    let body ={};
                    for(let val of formData.entries()){
                        body[val[0]] = val[1];
                    }
            
                    postData(body, () => {
                        statusMessage.textContent = successMessage;
                    }, (error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
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
        console.log(this.error);
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
            input.success {
                border: 2px solid green
            }
            input.error {
                border: 2px solid red
            }
            .validator-error {
                font-size: 14px;
                font-family: sans-serif;
                color: red;
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