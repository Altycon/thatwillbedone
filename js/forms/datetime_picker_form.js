import { parseTimeStringNumber, parseTimestamp, timeToString } from "../utilities.js";


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

    const timestring = `${year}-${incrementMonth}-${day}T${worldHour < 10 ? '0' + worldHour:worldHour}:${minute}:00`;

    const timestamp = new Date(timestring).getTime();

    [...document.querySelectorAll(`[data-goal-connect=${controlId}]`)].forEach( connection => {

        if(connection.nodeName !== 'INPUT'){

            connection.textContent = parseTimestamp(timestamp,'timedate');

        }else{

            connection.value = timestamp;
        }

                
    });

    document.querySelector('.datetime-modal-close-btn').click();

};