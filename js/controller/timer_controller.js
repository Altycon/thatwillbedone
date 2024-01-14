import { restrictNumberInputLength, restrictNumberRange } from "../utilities.js";

export const timerElements = {
    main: document.querySelector('.js-timer-display'),
    select: {
        main: document.querySelector('.js-timer-select'),
        inputs: [...document.querySelectorAll('.js-timer-select input')],
    },
    display: {
        output: document.querySelector('.js-timer-output')
    },
    buttons:{
        start: document.querySelector('.js-timer-start-btn'),
        pause: document.querySelector('.js-timer-pause-btn'),
        resume: document.querySelector('.js-timer-resume-btn'),
        reset: document.querySelector('.js-timer-reset-btn')
    },
    notification: {
        main: document.querySelector('.js-timer-notification'),
        message: document.querySelector('.js-timer-notification-message')
    }
};

export const Timer = {
    _state: 'idle',
    STATES: Object.freeze({
        IDLE: 'idle',
        READY: 'ready',
        STARTED: 'started',
        PAUSED: 'paused',
        RESET: 'reset',
        FINISHED: 'finished'
    }),
    EVENTS: Object.freeze({
        CLICK: 'click',
    }),
    seconds: 0,
    minutes: 0,
    hours: 0,
    startTime: 0,
    futureTime: 0,
    totalSeconds: 0,
    totalMinutes: 0,
    totalHours: 0,
    selectedMilliseconds: null,
    selectedSeconds: null,
    selectedMinutes: null,
    selectedHours: null,
    elements: null,
    selections: [],
    initialized: false,
    setState(state){
        Timer._state = state;
        Timer.elements.main.dataset.state = state;
        Timer.notify(state);
    },
    notify(message){
        if(Timer.elements.notification.main.classList.contains('open')){
            Timer.elements.notification.main.classList.toggle('open');

            clearTimeout(Timer.notificationDelayId);
        }

        Timer.elements.notification.message.textContent = message;
        Timer.elements.notification.main.classList.toggle('open');

        Timer.notificationDelayId = setTimeout( ()=>{
            Timer.elements.notification.main.classList.toggle('open');
            Timer.elements.notification.message.textContent = '';
        }, 2000);
    },
    zeroPad(itime){
        return itime < 10 ? `0${itime}`:`${itime}`;
    },
    createTimeString(h,m,s){
        h = h || Timer.hours;
        m = m || Timer.minutes;
        s = s || Timer.seconds;
        return `${Timer.zeroPad(h)}:${Timer.zeroPad(m)}:${Timer.zeroPad(s)}`;
    },
    addSelect(){
        Timer.elements.select.main.style.display = 'flex';
    },
    removeSelect(){
        Timer.elements.select.main.style.display = 'none';
    },
    addOutputDisplay(){
        Timer.elements.display.output.style.display = 'block';
    },
    removeOutputDisplay(){
        Timer.elements.display.output.style.display = 'none';
    },
    select(){
        Timer.elements.select.inputs.forEach( input => {
            Timer.selections.push(input.value);
        });

        Timer.selectedHours = Number(Timer.selections[0] + Timer.selections[1]);
        Timer.selectedMinutes = Number(Timer.selections[2] + Timer.selections[3]);
        Timer.selectedSeconds = Number(Timer.selections[4] + Timer.selections[5]);
        Timer.selectedMilliseconds = (((Timer.selectedHours * 60) * 60) * 1000) + ((Timer.selectedMinutes * 60) * 1000) + (Timer.selectedSeconds * 1000);
    },
    pause(event){
        event.preventDefault();
        if(Timer._state !== Timer.STATES.STARTED) return;
        
        cancelAnimationFrame(Timer.animationId);

        Timer.elements.buttons.pause.hidden = true;
        Timer.elements.buttons.resume.hidden = false;
        Timer.elements.buttons.reset.hidden = false;
        Timer.elements.buttons.start.hidden = true;

        Timer.setState(Timer.STATES.PAUSED);
    },
    resume(event){
        event.preventDefault();

        Timer.startTime = performance.now();

        Timer.futureTime = Timer.startTime + (Timer.seconds * 1000);

        Timer.animationId = requestAnimationFrame(Timer.update);

        Timer.elements.buttons.pause.hidden = false;
        Timer.elements.buttons.resume.hidden = true;
        Timer.elements.buttons.reset.hidden = false;
        Timer.elements.buttons.start.hidden = true;

        Timer.setState(Timer.STATES.STARTED);
    },
    reset(event){
        event.preventDefault();
        cancelAnimationFrame(Timer.animationId);

        Timer.seconds = 0;
        Timer.minutes = 0;
        Timer.hours = 0;
        Timer.startTime = 0;
        Timer.futureTime = 0;
        Timer.totalSeconds = 0;
        Timer.totalMinutes = 0;
        Timer.totalHours = 0;
        Timer.selectedMilliseconds = null;
        Timer.selectedSeconds = null;
        Timer.selectedMinutes = null;
        Timer.selectedHours = null;
        Timer.animationId = null;
        Timer.selections = [];

        Timer.elements.buttons.pause.hidden = true;
        Timer.elements.buttons.resume.hidden = true;
        Timer.elements.buttons.reset.hidden = true;
        Timer.elements.buttons.start.hidden = false;

        Timer.elements.buttons.pause.removeEventListener(Timer.EVENTS.CLICK, Timer.pause);
        Timer.elements.buttons.resume.removeEventListener(Timer.EVENTS.CLICK, Timer.resume);
        Timer.elements.buttons.reset.removeEventListener(Timer.EVENTS.CLICK, Timer.reset);

        Timer.elements.display.output.textContent = `00:00:00`;
        Timer.addSelect();
        Timer.removeOutputDisplay();
        
        Timer.setState(Timer.STATES.READY);
    },
    update(){
        const currentTime = performance.now();
        const delta = currentTime - Timer.startTime;

        if(delta >= 1000){
            
                const newNow = performance.now();

                const timeDifference = Timer.futureTime - newNow + 1000;
                Timer.totalSeconds = Math.floor(timeDifference / 1000);
                Timer.seconds = Timer.totalSeconds % 60;
                Timer.totalMinutes = Math.floor(Timer.totalSeconds / 60);
                Timer.minutes = Timer.totalMinutes % 60;
                Timer.totalHours = Math.floor(Timer.totalMinutes / 60);
                Timer.hours = Timer.totalHours % 60;
                
                Timer.elements.display.output.textContent = Timer.createTimeString();

                if(Timer.totalSeconds <= 0){
                    cancelAnimationFrame(Timer.animationId);
                    Timer.animationId = null;
                    Timer.setState(Timer.STATES.FINISHED);
                    return;
                }

            Timer.startTime = currentTime;
        }

        Timer.animationId = requestAnimationFrame(Timer.update);
    },
    start(event){
        
        event.preventDefault();
        const { target } = event;

        Timer.select();

        if(Timer.selectedSeconds <= 0 && Timer.selectedMinutes <= 0 &&
            Timer.selectedHours <= 0 && Timer.selectedMilliseconds <= 0){

                Timer.notify('Add time...');

                return;
            }

        Timer.removeSelect();
        Timer.addOutputDisplay();

        Timer.startTime = performance.now();

        Timer.futureTime = Timer.startTime + Timer.selectedMilliseconds;
        
        Timer.update();

        Timer.elements.buttons.pause.addEventListener(Timer.EVENTS.CLICK, Timer.pause);
        Timer.elements.buttons.resume.addEventListener(Timer.EVENTS.CLICK, Timer.resume);
        Timer.elements.buttons.reset.addEventListener(Timer.EVENTS.CLICK, Timer.reset);


        Timer.elements.buttons.pause.hidden = false;
        Timer.elements.buttons.resume.hidden = true;
        Timer.elements.buttons.reset.hidden = false;
        target.hidden = true;

        Timer.setState(Timer.STATES.STARTED);
    },
    listen(){
        Timer.elements.select.inputs.forEach( input => {
            restrictNumberInputLength(input,1);
        });
        const tens = Timer.elements.select.inputs.filter( input => input.name.includes('tens'));
        const ones = Timer.elements.select.inputs.filter( input => input.name.includes('ones'));

        tens.forEach( input => {
            restrictNumberRange(input, 0, 5);
        });
        
        Timer.elements.buttons.start.addEventListener(Timer.EVENTS.CLICK, Timer.start);
    },
    initialize(elements){
        if(elements){
            Timer.elements = elements;
            Timer.listen();
            Timer.setState(Timer.STATES.READY);
            Timer.initialized = true;
            Timer.removeOutputDisplay();
        }
        
    }
};