
function parseTimeStringNumber(number){

    if(+number < 10) return `0${number}`;

    return number;
}
function timeToString(hour,minute){

    if(+hour >= 12) return `${parseTimeStringNumber(hour % 12 === 0 ? 12:hour % 12)}:${parseTimeStringNumber(minute)}pm`;

    return `${parseTimeStringNumber(hour)}:${parseTimeStringNumber(minute)}am`;
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

    const period = new Date(+timestamp);

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
