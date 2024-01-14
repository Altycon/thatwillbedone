

export const stopwatchElements = {
    main: document.querySelector('.js-stopwatch-display'),
    buttons: {
        start: document.querySelector('.js-stopwatch-start-btn'),
        lap: document.querySelector('.js-stopwatch-lap-btn'),
        pause: document.querySelector('.js-stopwatch-pause-btn'),
        reset: document.querySelector('.js-stopwatch-reset-btn')
    },
    display: {
        time: document.querySelector('.js-stopwatch-time-output'),
        totalMilliseconds: document.querySelector('.js-stopwatch-total-milliseconds-output')
    },
    table: {
        head: document.querySelector('.js-stopwatch-table-head'),
        body: document.querySelector('.js-stopwatch-table-body')
    },
    notification:{
        main: document.querySelector('.js-stopwatch-notification'),
        message: document.querySelector('.js-stopwatch-notification-message')
    },
};

export const Stopwatch = {
    STATES: Object.freeze({
        IDLE: 'idle',
        READY: 'ready',
        STARTED: 'started',
        PAUSED: 'paused',
        RESET: 'reset'
    }),
    EVENTS: Object.freeze({
        CLICK: 'click',
    }),
    NUMBERS: Object.freeze({
        ZERO: 0,
        TWENTY_FOUR: 24,
        SIXTY: 60,
        ONE_THOUSAND: 1000,
        TWO_THOUSAND: 2000,
    }),
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    totalMilliseconds: 0,
    totalSeconds: 0,
    totalMinutes: 0,
    totalHours: 0,
    startTime: 0,
    elapsedTime: 0,
    animationId: null,
    notificationDelayId: null,
    laps: [],
    state: null,
    elements: null,
    initialized: false,
    scale(x,a,b,c,d){
        return (x - a)*(d - c)/(b - a) + c;
    },
    setState(state){
        Stopwatch.state = state;
        Stopwatch.elements.main.dataset.state = state;
        Stopwatch.notify(state);
    },
    notify(message){
        if(Stopwatch.elements.notification.main.classList.contains('open')){
            Stopwatch.elements.notification.main.classList.toggle('open');

            clearTimeout(Stopwatch.notificationDelayId);
        }

        Stopwatch.elements.notification.message.textContent = message;
        Stopwatch.elements.notification.main.classList.toggle('open');

        Stopwatch.notificationDelayId = setTimeout( ()=>{
            Stopwatch.elements.notification.main.classList.toggle('open');
            Stopwatch.elements.notification.message.textContent = '';
        }, 2000);
    },
    propertyReset(){
        Stopwatch.milliseconds = Stopwatch.NUMBERS.ZERO;
        Stopwatch.seconds = Stopwatch.NUMBERS.ZERO;
        Stopwatch.minutes = Stopwatch.NUMBERS.ZERO;
        Stopwatch.hours = Stopwatch.NUMBERS.ZERO;
        Stopwatch.days = Stopwatch.NUMBERS.ZERO;

        Stopwatch.totalMilliseconds = Stopwatch.NUMBERS.ZERO;
        Stopwatch.totalSeconds = Stopwatch.NUMBERS.ZERO;
        Stopwatch.totalMinutes = Stopwatch.NUMBERS.ZERO;
        Stopwatch.totalHours = Stopwatch.NUMBERS.ZERO;

        Stopwatch.startTime = Stopwatch.NUMBERS.ZERO;
        Stopwatch.elapsedTime = Stopwatch.NUMBERS.ZERO;
        Stopwatch.animationId = null;
        Stopwatch.laps = [];
    },
    resetDisplay(){
        Stopwatch.elements.display.time.textContent = '00:00:00:00';
        Stopwatch.elements.display.totalMilliseconds.textContent = `0 ms`;

        while(Stopwatch.elements.table.head.lastChild){
            Stopwatch.elements.table.head.removeChild(Stopwatch.elements.table.head.lastChild);
        }

        while(Stopwatch.elements.table.body.lastChild){
            Stopwatch.elements.table.body.removeChild(Stopwatch.elements.table.body.lastChild);
        }
    },
    zeroPad(itime){
        return itime < 10 ? `0${itime}`:`${itime}`;
    },
    parseTime(measurement = 'milliseconds'){
        switch(measurement){
            case 'milliseconds':
                return Stopwatch.totalMilliseconds % Stopwatch.NUMBERS.ONE_THOUSAND;
            case 'seconds':
                return Stopwatch.totalSeconds % Stopwatch.NUMBERS.SIXTY;
            case 'minutes':
                return Stopwatch.totalMinutes % Stopwatch.NUMBERS.SIXTY;
            case 'hours':
                return Stopwatch.totalHours % Stopwatch.NUMBERS.TWENTY_FOUR;
            default:
                return Stopwatch.totalMilliseconds % Stopwatch.NUMBERS.ONE_THOUSAND;
        }
    },
    updateDisplay(totalMilliseconds){
        Stopwatch.elements.display.time.textContent = Stopwatch.createTimeString();
        Stopwatch.elements.display.totalMilliseconds.textContent = `${totalMilliseconds} ms`;
    },
    createTimeString(h,m,s,ms){
        h = h || Stopwatch.hours;
        m = m || Stopwatch.minutes;
        s = s || Stopwatch.seconds;
        ms = ms || Stopwatch.milliseconds;

        return `${Stopwatch.zeroPad(h)}:`+
        `${Stopwatch.zeroPad(m)}:`+ 
        `${Stopwatch.zeroPad(s)}:`+
        `${Stopwatch.zeroPad(Math.floor(Stopwatch.scale(ms,0,999,0,99)))}`;
    },
    addLapTableFields(fields){
        const df = new DocumentFragment();

        const tableRow = document.createElement('tr');

        fields.forEach( field => {
            const th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.textContent = field;
            tableRow.appendChild(th);
        });

        df.appendChild(tableRow);
        Stopwatch.elements.table.head.appendChild(df);
    },
    addLap(lap){
      
        const df = new DocumentFragment();
        const tableRow = document.createElement('tr');

        Object.keys(lap).forEach( key => {
            const td = document.createElement('td');
            td.textContent = `${lap[key]}`;
            tableRow.appendChild(td);
        })
        df.appendChild(tableRow);
        Stopwatch.elements.table.body.insertBefore(df, Stopwatch.elements.table.body.firstChild);
    },
    lap() {
        if (Stopwatch.state !== Stopwatch.STATES.STARTED) return;

        const currentLap = {
            ms: Stopwatch.parseTime('milliseconds'),
            s: Stopwatch.parseTime('seconds'),
            m: Stopwatch.parseTime('minutes'),
            h: Stopwatch.parseTime('hours')
        };

        let newLap;
        
        if(Stopwatch.laps.length > 0){
            const lastLap = Stopwatch.laps[Stopwatch.laps.length - 1];

            const newLapTime = {
                ms: Math.abs(lastLap.totalTime.ms - currentLap.ms),
                s: Math.abs(lastLap.totalTime.s - currentLap.s),
                m: Math.abs(lastLap.totalTime.m - currentLap.m),
                h: Math.abs(lastLap.totalTime.h - currentLap.h)
            };

            newLap = { lapTime: {...newLapTime},totalTime: {...currentLap} };

            Stopwatch.laps.push(newLap);

        }else{
            Stopwatch.addLapTableFields(['Lap','Lap Time','Total Time']);
            newLap = { lapTime: {...currentLap},totalTime: {...currentLap} };
            Stopwatch.laps.push(newLap)
        }

        Stopwatch.addLap({
            count: Stopwatch.laps.length,
            lapTime: Stopwatch.createTimeString(
                newLap.lapTime.h,
                newLap.lapTime.m,
                newLap.lapTime.s,
                newLap.lapTime.ms
            ),
            totalTime: Stopwatch.createTimeString(
                newLap.totalTime.h,
                newLap.totalTime.m,
                newLap.totalTime.s,
                newLap.totalTime.ms,
            )
        });
        
        Stopwatch.notify('lap created')
    },
    
    update(){
        const currentTime = performance.now();

        const deltaTime = currentTime - Stopwatch.startTime;

        Stopwatch.elapsedTime += deltaTime;

        Stopwatch.totalMilliseconds = Stopwatch.elapsedTime;
        Stopwatch.milliseconds = Stopwatch.parseTime('milliseconds');

        Stopwatch.totalSeconds = Math.floor(Stopwatch.totalMilliseconds / Stopwatch.NUMBERS.ONE_THOUSAND);
        Stopwatch.seconds = Stopwatch.parseTime('seconds');

        Stopwatch.totalMinutes = Math.floor(Stopwatch.totalSeconds / Stopwatch.NUMBERS.SIXTY);
        Stopwatch.minutes = Stopwatch.parseTime('minutes');

        Stopwatch.totalHours = Math.floor(Stopwatch.totalMinutes / Stopwatch.NUMBERS.SIXTY);
        Stopwatch.hours = Stopwatch.parseTime('hours');

        Stopwatch.updateDisplay(Stopwatch.totalMilliseconds);

        Stopwatch.startTime = currentTime;

        Stopwatch.animationId = requestAnimationFrame(Stopwatch.update);
    },
    reset(event){
        event.preventDefault();

        cancelAnimationFrame(Stopwatch.animationId);

        Stopwatch.propertyReset();
        Stopwatch.resetDisplay();

        Stopwatch.elements.buttons.pause.removeEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.pause);
        event.target.removeEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.reset);

        Stopwatch.setState(Stopwatch.STATES.READY);
    },
    pause(event){
        if(Stopwatch.state !== Stopwatch.STATES.STARTED) return;
        event.preventDefault();

        cancelAnimationFrame(Stopwatch.animationId);

        Stopwatch.setState(Stopwatch.STATES.PAUSED);
    },
    start(event){
        if(Stopwatch.state === Stopwatch.STATES.STARTED) return;
        event.preventDefault();

        Stopwatch.startTime = performance.now() - Stopwatch.elapsedTime;
        
        Stopwatch.update();

        Stopwatch.elements.buttons.lap.addEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.lap);
        Stopwatch.elements.buttons.pause.addEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.pause);
        Stopwatch.elements.buttons.reset.addEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.reset);

        Stopwatch.setState(Stopwatch.STATES.STARTED);
    },
    listen(){
        Stopwatch.elements.buttons.start.addEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.start);
    },
    initialize(elements){
        if(elements){
            Stopwatch.elements = elements;

            Stopwatch.listen();

            Stopwatch.setState(Stopwatch.STATES.READY);

            Stopwatch.initialized = true;
        }
    },
    unitialize(){

        if(!Stopwatch.elements || !Stopwatch.initialized) return;

        if(Stopwatch.animationId){

            cancelAnimationFrame(Stopwatch.animationId);

        }

        Stopwatch.propertyReset();
        Stopwatch.resetDisplay();

        Stopwatch.elements.buttons.start.removeEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.start);
        Stopwatch.elements.buttons.lap.removeEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.lap);
        Stopwatch.elements.buttons.pause.removeEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.pause);
        Stopwatch.elements.buttons.reset.removeEventListener(Stopwatch.EVENTS.CLICK, Stopwatch.reset);

        Stopwatch.setState(Stopwatch.STATES.READY);
    }
};