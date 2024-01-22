

export function handleDatetimePickerFormSubmit(event){

    if(!event) return;

    event.preventDefault();

    const datetimeForm = event.target;

    const formData = new FormData(datetimeForm);

    const month = formData.get('month');

    const year = formData.get('year');

    const day = formData.get('day');

    const hour = formData.get('hour');

    const minute = formData.get('minute');

    const meridiem = formData.get('meridiem');

    console.log(`month: ${month}\nyear: ${year}\nday: ${day}\nhour: ${hour}\nminute: ${minute}\nmeridiem: ${meridiem}\n`);

    document.querySelector('.datetime-modal-close-btn').click();

};