import { parseTimestamp } from "../utilities.js";


export function handleDatetimePickerFormSubmit(event){

    if(!event) return;

    event.preventDefault();

    const datetimeForm = event.target;

    const formData = new FormData(datetimeForm);

    const controlId = formData.get('controlid');

    const month = formData.get('month');

    const year = formData.get('year');

    const day = formData.get('day');

    const hour = formData.get('hour');

    const minute = formData.get('minute');

    const meridiem = formData.get('meridiem');

    console.log(`month: ${month}\nyear: ${year}\nday: ${day}\nhour: ${hour}\nminute: ${minute}\nmeridiem: ${meridiem}\n`);

    const incrementMonth = ('0' + (parseInt(month, 10) + 1)).slice(-2);

    const timestring = `${year}-${incrementMonth}-${day}T${hour}:${minute}:00`;

    const timestamp = new Date(timestring).getTime();

    [...document.querySelectorAll(`[data-goal-connect=${controlId}]`)].forEach( connection => {

        if(connection.nodeName !== 'INPUT'){

            connection.textContent = parseTimestamp(timestamp,'datetime');

        }else{

            connection.value = timestamp;
        }

                
    });

    document.querySelector('.datetime-modal-close-btn').click();

};