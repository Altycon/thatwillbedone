import { handleDatetimePickerFormSubmit } from "../forms/datetime_picker_form.js";


export function openDatetimePicker(){

    const datetimeModal = document.querySelector('.datetime-modal');

    datetimeModal.querySelector('.datetime-modal-close-btn').addEventListener('click', closeDatetimePicker);


    const datetimeForm = datetimeModal.querySelector('.datetime-modal-form');

    initializeDatetimePicker(datetimeForm);

    datetimeForm.addEventListener('submit', handleDatetimePickerFormSubmit);



    datetimeModal.classList.add('open');

    setTimeout( ()=> {

        datetimeModal.classList.add('appear');

    },100);
};

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

function initializeDatetimePicker(datetimeForm){

    const period = new Date();

    const hour = period.getHours();

    datetimeForm.querySelector('select[name=month]').value = period.getMonth().toString();

    datetimeForm.querySelector('select[name=year]').value = period.getFullYear().toString();

    datetimeForm.querySelector('select[name=hour]').value = hour.toString();

    datetimeForm.querySelector('select[name=minute]').value = period.getMinutes().toString();

    datetimeForm.querySelector('select[name=meridiem]').value = hour === 0 ? 'am': hour < 12 ? 'am':'pm';

    setSelectedDay(datetimeForm,period.getDate().toString());

};

function resetDatetimePicker(datetimeModal){

    const datetimeForm = datetimeModal.querySelector('.datetime-modal-form');

    datetimeForm.querySelector('select[name=month]').value = `0`;

    datetimeForm.querySelector('select[name=year]').value = `0`;

    datetimeForm.querySelector('select[name=hour]').value = `0`;

    datetimeForm.querySelector('select[name=minute]').value = `0`;

    datetimeForm.querySelector('select[name=meridiem]').value = `0`;

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
}
