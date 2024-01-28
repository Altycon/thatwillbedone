

export function lockBody(){

    document.body.style.overflow = 'hidden';

};
export function unlockBody(){

    document.body.style.overflow = 'auto';

};
export function leftZeroPadIfSingleDigit(number){

    if(+number < 10) return `0${number}`;

    return `${number}`;
};
export function timeToString(hour,minute){

    return `${leftZeroPadIfSingleDigit(+hour % 12 === 0 ? 12:+hour % 12)}:${leftZeroPadIfSingleDigit(minute)}${+hour < 12 ? 'am':'pm'}`;

    //return `${leftZeroPadIfSingleDigit(hour)}:${leftZeroPadIfSingleDigit(minute)}am`;
};

export function createTWBDId(stringlette){

    if(stringlette)

    return stringlette + (new Date().getTime().toString(16)) + Math.floor(Math.random() * 1000).toString(16);

    else

    return (new Date().getTime().toString(16)) + Math.floor(Math.random() * 1000).toString(16);
};

export function clearChildElements(htmlElement){

    if(!(htmlElement instanceof HTMLElement)) return;

    while(htmlElement.lastChild){

        htmlElement.removeChild(htmlElement.lastChild);
    }

}

export function restrictNumberInputLength(inputElement,maxLength){

    inputElement.addEventListener('input', (event)=>{

        if(event.target.value.length > maxLength){

            event.target.value = event.target.value.slice(0,maxLength);

        }
    });
};

export function restrictNumberRange(inputElement, min,max){

    inputElement.addEventListener('input', (event)=>{

        if(+event.target.value < min){

            event.target.value = `${min}`

        }else if(+event.target.value > max){

            event.target.value = `${max}`;
        }
    });
};

export function parseTimestamp(timestamp,type){

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const period = new Date(Number(timestamp));

    const year = period.getFullYear();

    const month = period.getMonth();;

    const day = period.getDate();

    const hour = period.getHours();

    const minute = period.getMinutes();

    switch(type){

        case 'datetime': return `${monthNames[month]} ${day}, ${year} - ${timeToString(hour,minute)}`;

        case 'timedate': return `${timeToString(hour,minute)} - ${monthNames[month]} ${day}, ${year}`;

        case 'time': return `${timeToString(hour,minute)}`;

        case 'date': return `${monthNames[month]} ${day}, ${year}`;

        default: return `${month+1}/${day}/${year} - ${hour}:${minute}`;

    }
};

export function parseDatetimeStringToTimestamp(datetime){

    if(!datetime || datetime === "" || datetime.toLowerCase() === 'no goal'){

        return null;
    }

    const datetimeParts = datetime.split('-');

    let date = datetimeParts[0].trim();

    let time = datetimeParts[1].trim();

    if(!date.includes(',')){

        date = datetimeParts[1].trim();

        time = datetimeParts[0].trim();
    }

    const dateParts = date.split(' ').filter( part => part !== "");

    const monthAbbreviation = dateParts[0];


    const dayWithComma = dateParts[1];

    const year = dateParts[2];


    const fullMonthName = getMonthFullNameFromAbbreviation(monthAbbreviation);

    // break time apart, add 12 to hour if meridiem is pm
    const timeParts = time.split(':');

    const timeHour = Number(timeParts[0]);

    const minuteTimeString = timeParts[1].slice(0,-2);

    const meridiemString = timeParts[1].substring(2);

    const newHour = meridiemString.toLowerCase() === 'pm' ? timeHour+12:timeHour;

    console.log(`hour: ${newHour}, minute: ${minuteTimeString}, merid: ${meridiemString}`)

    const newDatetime = `${fullMonthName} ${dayWithComma} ${year} ${newHour}:${minuteTimeString}:00`

    console.log(newDatetime)

    const period = new Date(newDatetime);

    const timestamp = period.getTime();

    return timestamp;
}

export function getMonthFullNameFromAbbreviation(abbrev){

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    for(let i = 0; i < monthNames.length; i++){

        const abbrevatedMonth = monthNames[i].slice(0,3).toLowerCase();

        if(abbrevatedMonth === abbrev.toLowerCase()){

            return monthNames[i]
        }
    }

    return null;

}

export function isLightColor(hexColor) {

    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);

    const g = parseInt(hexColor.slice(3, 5), 16);

    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Colors with a luminance greater than 0.5 are considered light
    return luminance > 0.5;
    
};

export function debounce(callback,delay){

    let timer;

    return (...args)=>{
        
        if(timer) clearTimeout(timer);

        timer = setTimeout(()=>{

            callback(...args);

        },delay);
    }
};

// button.addEventListener('click', debounce( (event)=> handleConnectionControls(event),300));