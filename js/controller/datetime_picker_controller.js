
import { clearChildElements, leftZeroPadIfSingleDigit, lockBody, parseDatetimeStringToTimestamp, parseTimestamp, unlockBody } from "../utilities.js";


export function pickDatetime({ target }){


    let timestamp = Date.now();

    const connection = document.querySelector(`[data-goal-connect="${target.dataset.goalControl}"]`);

    if(connection && connection.textContent !== "" && connection.textContent.toLowerCase() !== "no goal"){

        timestamp = connection.dataset.timestamp;

        console.log(timestamp)

    }

    const datetimeModal = document.querySelector('.datetime-modal');

    datetimeModal.querySelector('.datetime-modal-close-btn').addEventListener('click', closeDatetimePicker);


    initializeDatetimePicker(timestamp,target.dataset.goalControl);

    datetimeModal.classList.add('open');

    setTimeout( ()=> {

        datetimeModal.classList.add('appear');

        datetimeModal.querySelector('form input[type=radio]:checked').focus();

        lockBody();

    },100);
};

export function listenToGoalControls(parent){

    [...parent.querySelectorAll(`[data-goal-control]`)].forEach( control => {

        control.addEventListener('click', pickDatetime);

    });

}

function closeDatetimePicker(event){

    event.preventDefault();

    const datetimeModal = document.querySelector('.datetime-modal');

    datetimeModal.classList.remove('appear');

    unlockBody();

    setTimeout( ()=> {

        datetimeModal.classList.remove('open');

    },300);

    resetDatetimePicker(datetimeModal);

    event.target.removeEventListener('click', closeDatetimePicker);
};

function initializeDatetimePicker(timestamp = Date.now(),controlId){

    const datetimeForm = document.querySelector('.datetime-modal form');


    const period = new Date(+timestamp);

    const hour = Number(period.getHours());

    const minute = Number(period.getMinutes());

    const month = period.getMonth();


    const monthSelectElement = datetimeForm.querySelector('select[name=month]');


    datetimeForm.querySelector('input[name=controlid]').value = controlId;
    
    monthSelectElement.value = month.toString();

    datetimeForm.querySelector('select[name=year]').value = period.getFullYear().toString();

    datetimeForm.querySelector('select[name=hour]').value = leftZeroPadIfSingleDigit(hour % 12);

    datetimeForm.querySelector('select[name=minute]').value = leftZeroPadIfSingleDigit(minute);

    datetimeForm.querySelector('select[name=meridiem]').value = hour < 12 ? 'am':'pm';


    setSelectedDay(datetimeForm,period.getDate().toString());

    monthSelectElement.addEventListener('input', handleDatetimeMonthSelectInput);


    datetimeForm.addEventListener('submit', handleDatetimePickerFormSubmit);

};

function resetDatetimePicker(datetimeModal){

    const datetimeForm = datetimeModal.querySelector('.datetime-modal-form');


    datetimeForm.querySelector('select[name=month]').value = `0`;

    datetimeForm.querySelector('select[name=year]').value = `2024`;

    datetimeForm.querySelector('select[name=hour]').value = `12`;

    datetimeForm.querySelector('select[name=minute]').value = `00`;

    datetimeForm.querySelector('select[name=meridiem]').value = `am`;


    removeDatetimeSelectDayListeners(datetimeForm);

};

function setSelectedDay(datetimeForm,day){

    // console.log('day', day)

    // const days = [...datetimeForm.querySelectorAll('input[name=day]')];

    // const dayInput = datetimeForm.querySelector(`input[value="${day}"]`);

    // resetSelectedDays(datetimeForm);

    // days.forEach( day => {

    //     day.addEventListener('click', handleDatetimeSelectDay);

    // })


    // dayInput.checked = true;

    // dayInput.parentElement.classList.add('active');

    const month = datetimeForm.querySelector('.datetime-calendar select[name=month]');

    const daysInSelectedMonth = +month[month.value].dataset.days

    const year = datetimeForm.querySelector('.datetime-calendar select[name=year]').value;


    const weekdayStart = getPreviousMonthLastWeekday(month.value,year);
    
    buildDatetimePickerCalendarDays(weekdayStart,daysInSelectedMonth,day)

    
};

function handleDatetimeSelectDay(event){

    resetSelectedDays(event.target.closest('form'));

    event.target.parentElement.classList.add('active');
}

function resetSelectedDays(datetimeForm){

    const days = [...datetimeForm.querySelectorAll('input[name=day]')];

    days.forEach( day => {

        if(day.parentElement.classList.contains('active')){

            day.parentElement.classList.remove('active')
        }
    })
};

function removeDatetimeSelectDayListeners(datetimeForm){

    [...datetimeForm.querySelectorAll('input[name=day]')].forEach( dayInput => {

        dayInput.removeEventListener('click', handleDatetimeSelectDay);
    });
};

function handleDatetimeMonthSelectInput(event){

    const selectedMonth = event.target.value;

    const year = document.querySelector('.datetime-calendar select[name=year]').value;


    const daysInSelectedMonth = +event.srcElement[selectedMonth].dataset.days


    const weekdayStart = getPreviousMonthLastWeekday(selectedMonth,year);
    
    buildDatetimePickerCalendarDays(weekdayStart,daysInSelectedMonth)

};

function getPreviousMonthLastWeekday(selectedMonth,year){

    const month = (parseInt(selectedMonth, 10));

    const period = new Date(+year,month);

    return +period.getDay(); // 0-6
};

function buildDatetimePickerCalendarDays(weekdayStart, daysInSelectedMonth, selectedDay){
    

    const calendarDaysListElement = document.querySelector('.datetime-calendar-days');

    if(!selectedDay || selectedDay === undefined){

        selectedDay = calendarDaysListElement.querySelector('label input[name=day]:checked').value;

    }

    if(+selectedDay > +daysInSelectedMonth){

        selectedDay = daysInSelectedMonth;

    }

    const daysDocumentFragment = new DocumentFragment();

    clearChildElements(calendarDaysListElement);

    
    if(weekdayStart > 0){

        for(let i = 0; i < weekdayStart; i++){

            daysDocumentFragment.appendChild(
    
                createDatetimePickerCalendarDayComponent()
            )
        }

    }

    for(let i = 0; i < daysInSelectedMonth; i++){

        daysDocumentFragment.appendChild(

            createDatetimePickerCalendarDayComponent(i + 1)
        )
    }

    calendarDaysListElement.append(daysDocumentFragment);

    const dayInput = calendarDaysListElement.querySelector(`input[value="${selectedDay}"]`);

    dayInput.parentElement.classList.add('active');

    dayInput.checked = true;

}

export function handleDatetimePickerFormSubmit(event){

    if(!event) return;

    event.preventDefault();

    const datetimeForm = event.target;

    const formData = new FormData(datetimeForm);

    const controlId = formData.get('controlid');

    const month = formData.get('month');

    const year = formData.get('year');

    const day = formData.get('day');

    const hour = Number(formData.get('hour'));

    const minute = formData.get('minute');

    const meridiem = formData.get('meridiem');

    const worldHour = meridiem === 'pm' ? hour + 12:hour;

    const incrementMonth = ('0' + (parseInt(month, 10) + 1)).slice(-2);

    const timestring = `${year}-${incrementMonth}-${leftZeroPadIfSingleDigit(day)}T${leftZeroPadIfSingleDigit(worldHour % 24)}:${minute}:00`;

    console.log(timestring)

    const timestamp = new Date(timestring).getTime();

    [...document.querySelectorAll(`[data-goal-connect=${controlId}]`)].forEach( connection => {

        if(connection.nodeName !== 'INPUT'){

            connection.textContent = parseTimestamp(timestamp,'timedate');

            connection.dataset.timestamp = timestamp.toString();

        }else{

            connection.value = timestamp;
        }

                
    });

    document.querySelector('.datetime-modal-close-btn').click();

};

function createDatetimePickerCalendarDayComponent(day,active = false){

    const label = document.createElement('label');

    if(active) label.classList.add('active');

    if(day){

        label.textContent = day;

        label.addEventListener('click', handleDatetimeSelectDay);
    }

    const input = document.createElement('input');

    input.setAttribute('type', 'radio');

    input.setAttribute('name', 'day');

    input.setAttribute('value', day);

    label.append(input);

    return label;
}