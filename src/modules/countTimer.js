'use strict';

const countTimer = () => {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    
    const gettingTomorrow = () => {
        let today = new Date();
        today.setDate(today.getDate()+1);
        let tomorrow = today.toLocaleString('en', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
        }); 
        return tomorrow;
    };
    
    const getTimeRemaining = () => {
        let dateStop = new Date(gettingTomorrow()).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = ( dateStop - dateNow ) / 1000;
        let seconds = Math.floor( timeRemaining % 60 );
        let minutes = Math.floor( ( timeRemaining / 60 ) % 60 );
        let hours = Math.floor( ( timeRemaining / 60 / 60 ) % 24 ); // 24
        
        return {timeRemaining, hours, minutes, seconds };
    };            
    
    let id;
    const updateClock = () => {
        let timer = getTimeRemaining();

        timerHours.textContent = ( timer.hours < 10 ) ? '0' + timer.hours : timer.hours;
        timerMinutes.textContent = ( timer.minutes < 10 ) ? '0' + timer.minutes : timer.minutes;
        timerSeconds.textContent = ( timer.seconds < 10 ) ? '0' + timer.seconds : timer.seconds;
        
        if (timer.timeRemaining < 0) {
            cancelAnimationFrame(id);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        } else {
            requestAnimationFrame( updateClock );
        }
    };
    id = requestAnimationFrame( updateClock );
};

export default countTimer;