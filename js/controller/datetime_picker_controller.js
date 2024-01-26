import { handleDatetimePickerFormSubmit } from "../forms/datetime_picker_form.js";
import { leftZeroPadIfSingleDigit, parseDatetimeStringToTimestamp } from "../utilities.js";


export function pickDatetime({ target }){


    let timestamp = Date.now();

    const connection = document.querySelector(`[data-goal-connect="${target.dataset.goalControl}"]`);

    if(connection && connection.textContent !== "" && connection.textContent.toLowerCase() !== "no goal"){

        timestamp = +parseDatetimeStringToTimestamp(connection.textContent);

    }

    const datetimeModal = document.querySelector('.datetime-modal');

    datetimeModal.querySelector('.datetime-modal-close-btn').addEventListener('click', closeDatetimePicker);


    initializeDatetimePicker(timestamp,target.dataset.goalControl);

    datetimeModal.classList.add('open');

    setTimeout( ()=> {

        datetimeModal.classList.add('appear');

        datetimeModal.querySelector('form input[type=radio]:checked').focus();

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

    setTimeout( ()=> {

        datetimeModal.classList.remove('open');

    },300);

    resetDatetimePicker(datetimeModal);

    event.target.removeEventListener('click', closeDatetimePicker);
};

function initializeDatetimePicker(timestamp = Date.now(),controlId){

    const datetimeForm = document.querySelector('.datetime-modal form');


    const period = new Date(timestamp);

    const hour = Number(period.getHours());

    const minute = Number(period.getMinutes());

    const month = period.getMonth();


    const monthSelectElement = datetimeForm.querySelector('select[name=month]');


    datetimeForm.querySelector('input[name=controlid]').value = controlId;
    
    monthSelectElement.value = month.toString();

    datetimeForm.querySelector('select[name=year]').value = period.getFullYear().toString();

    datetimeForm.querySelector('select[name=hour]').value = leftZeroPadIfSingleDigit(hour % 12);

    datetimeForm.querySelector('select[name=minute]').value = leftZeroPadIfSingleDigit(minute);

    datetimeForm.querySelector('select[name=meridiem]').value = hour <= 12 ? 'am':'pm';


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

    const days = [...datetimeForm.querySelectorAll('input[name=day]')];

    const dayInput = datetimeForm.querySelector(`input[value="${day}"]`);

    resetSelectedDays(datetimeForm);

    days.forEach( day => {

        day.addEventListener('click', handleDatetimeSelectDay);

    })


    dayInput.checked = true;

    dayInput.parentElement.classList.add('active');
    
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

    const month = +selectedMonth < 10 ? "0" + selectedMonth:selectedMonth;

    const days = [...document.querySelectorAll('.datetime-calendar-days label')];

    const year = document.querySelector('.datetime-calendar select[name=year]').value;

    const selectedDay = days.find( day => day.classList.contains('active')).firstElementChild.value;

    const day = +selectedDay < 10 ? "0" + selectedDay:selectedDay;

    const timeString = `${year}-${month}-01`;

    const period = new Date(timeString);

    const weekdayStart = period.getDay(); // 0-6


    days.forEach( (day,index) => {


        const hidden = day.getAttribute('hidden');
        
        if(hidden && hidden === 'true') day.removeAttribute('hidden');

       
    })

    switch(selectedMonth){

        case "1":
            days[days.length - 1].setAttribute('hidden',true);
            days[days.length - 2].setAttribute('hidden',true);
            days[days.length - 3].setAttribute('hidden',true);
        break;

        case "3":
        case "5":
        case "8":
        case "10":
            days[days.length - 1].setAttribute('hidden',true);

        break;

    }

}