'use strict';

//import nodelistForeachPolyfill from 'nodelist-foreach-polyfill';
import 'fetch-polyfill';
import 'es6-promise';
//import formdataPolyfill from 'formdata-polyfill';
import '@babel/polyfill';
//import elementClosest from 'element-closest';
//nodelistForeachPolyfill(window);
//elementClosest(window);
//formdataPolyfill(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import scrollAnimationButton from './modules/scrollAnimationButton';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculatorBlock from './modules/calculatorBlock';
import commandBlock from './modules/commandBlock';
import sendForm from './modules/sendForm';
// Timer
countTimer(); 

// menu
toggleMenu();
    
// scroll button
scrollAnimationButton();

// popup
togglePopUp();

//tabs
tabs();

// slider
slider(); 

// Calculator
calculatorBlock();

// Command
commandBlock();

// send-ajax-form
sendForm();
