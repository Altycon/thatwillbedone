export const YEAR_MATRIX = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
];



export function isLeapYear(year){

    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 ===0);
};

export const HTML_ENTITY = {
    SPACE: `&nbsp;`,
    X_WRITTEN: `&#x2717;`,
    CHECKMARK_WRITTEN: `&#10003;`,
    HAMBURGER: `&#9776;`,
    STAR_LAYERED: `&#10029;`,
    PLUS_SQUARE: `&#8862;`,
    TIMES_SQUARE: `&#8864;`,
    CHECKMARK_SQURE: `&#9745;`,
    GEAR: `&#9881;`,
    PENCIL: `&#9999;`,
    PENCIL_LOWER_RIGHT: `&#9998;`,
    PENCIL_UPPER_RIGHT: `&#10000;`,
    ARROW_DOWN_RIGHT: `&rdsh;`,
    CALENDAR1: `&#128197;`,
    CALENDAR2: `&#x1F4C5;`
};

export const MONTH_NAMES =[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const WEEKDAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Firday",
    "Saturday"
];

export function isMobileDevice(DEVICE) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(DEVICE) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(DEVICE.substr(0, 4))){
        return true;
    }else{
        return false;
    }
}

export function setDocumentMobileBoolean(element){

    const device = navigator.userAgent || navigator.vendor || window.opera

    const isMobile = isMobileDevice(device)

    element.setAttribute('data-device', isMobile ? 'mobile':'desktop');
}

export function generateUniqueId(n){
    return "" + Math.floor(Math.random() * n);
};

export function removeElementChildren(element){
    if(element.lastChild){
        while(element.lastChild){
            element.removeChild(element.lastChild);
        }
    }
};

function addLeadZeroUnderTen(number){
    return number < 10 ? `0${number}`:`${number}`
}

export function formatTodoTime(timestamp){

    const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const date = new Date(timestamp);

    //const weekday = date.getDay();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = addLeadZeroUnderTen(date.getMinutes());
    const period = hours > 12 ? 'pm':'am';

    return `${month}/${day}/${year} ${hours % 12}:${minutes}${period}`
};

export function setHtmlAttributes(element, attributes){

    Object.keys(attributes).forEach( key => {

        element.setAttribute(key, attributes[key])

    });

};

export function setHtmlClasses(element, classes = []){

    element.classList.add(...classes);
};

export function limitSentenceLength(string,limit = 30){

    if(string.length > limit){

        return string.slice(0,limit) + '...';

    }

    return string;
};

export function formDataToObject(formData){

    const data = {};

    for(const prop of formData){

        if(prop[1] === 'true' || prop[1] === 'false'){

            data[prop[0]] = (prop[1] === 'true' ? true:false);
            
        }else{

            data[prop[0]] = prop[1];
        }
    }

    return data;
};

export function areObjectsEqual(oldFormData,newFormData){

    let bool = true;

    for(const prop in newFormData){

        if(oldFormData[prop] && oldFormData[prop] !== newFormData[prop]){

            bool = false;

            break;
        }
    };

    return bool;

};

export function animateComponentOnAppend(component, cssVariable, delay = 0){

    component.style.opacity = '0';

    component.style.setProperty(cssVariable, `${delay}ms`);

    component.classList.add('appear');

    component.addEventListener('animationend', function handleComponentAppendAnimationEnd(){

        component.style.setProperty(cssVariable, `0ms`);

        component.removeEventListener('animationend', handleComponentAppendAnimationEnd);
    });

};

export function animateComponentsOnLoad(itemClassName, customCSSVariableName, delayBetweenItems, itemDelay){

    [...document.querySelectorAll(itemClassName)].forEach( (todo,index) => {

        todo.style.opacity = '0';

        if(itemDelay && index === 0){
          
            todo.style.setProperty(customCSSVariableName, `${itemDelay}ms`);

        }else if(itemDelay && index > 0){

            todo.style.setProperty(customCSSVariableName, `${index * (delayBetweenItems + itemDelay)}ms`);

        }else{

            todo.style.setProperty(customCSSVariableName, `${index * delayBetweenItems}ms`);
        }

        

        todo.classList.add('appear');

        todo.addEventListener('animationend', function handleTodoInsertAnimationEnd(){

            todo.style.setProperty(customCSSVariableName, `0ms`);

            todo.removeEventListener('animationend', handleTodoInsertAnimationEnd);
        });

    })

};
















function Component(elementName,options){

    // this works just fine and could easily be elaborated on.

    const component = document.createElement(elementName.toLowerCase());

    if(options.attributes){

        for(const key in options.attributes){

            component.setAttribute(key, options.attributes[key])
        }

    }

    if(options.classes){

        component.classList.add(...options.classes);

    }

    if(options.content){

        for(const key in options.content){

            component[key] = options.content[key];
        }
        
    }

    if(options.children){

        component.append(...options.children);
    }

    if(options.listeners){

        options.listeners.forEach( listener => {

            component.addEventListener( listener.type, listener.reaction );
        });
    }

    return component;
};





const ideaComponent = Component('form',{

    attributes: {

        id: 'SomeForm',

        action: '/user',

        method: 'post'

    },

    classes: ['some-form','js-some-form'],

    children: [

        Component('div', {

            children: [

                Component('input', {

                    attributes: { 

                        type: 'text', 

                        name: 'name', 

                        id: 'NameInput',

                        placeholder: 'Put text here',

                        autocomplete: 'off',

                        required: 'true'
                    },

                    classes: ['name-input','js-name-input'],

                    listeners: [

                        { type: 'click', reaction: (event)=>{

                            console.log('Holy shit! IT WORKED!')
                            console.log('event', event);

                        }},

                        { type: 'keydown', reaction: (event)=>{

                            console.log('Holy shit! IT WORKED!')
                            console.log('event', event);

                        }}
                       
                    ]

                }),

                Component('label',{

                    attributes: {
                        
                        for: 'NameInput',

                    },

                    classes: ['name-input-label','ja-name-input-label'],

                    content: { textContent: 'This is the LABEL' }

                })
            ]
        })
    ]
});


function ColorPicker(){

    const div = document.querySelector('div');
}

