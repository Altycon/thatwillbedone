import { clearChildElements } from "../utilities.js";
import { openCalendarDayviewer } from "./calendar_dayview_controller.js";


export function calendarController(){

    const calendar = document.querySelector('.calendar');

    const today = new Date();

    setCalendar(today.getFullYear(),today.getMonth(),today.getDate());

    calendar.addEventListener('click', handleCalendarControls)

};

export function stopListeningToCalendar(){

    const calendar = document.querySelector('.calendar');

    calendar.removeEventListener('click', handleCalendarControls);

}

function setCalendar(year,month,day){

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    const calendar = document.querySelector('.calendar');

    calendar.querySelector(`[data-calendar-display="year"]`).textContent = `${year}`;

    calendar.querySelector(`[data-calendar-display="month"]`).textContent = `${monthNames[month]}`;

    const period = new Date(year,month);

    const firstDayweekday = period.getDay();

    const daysInMonth =  new Date(year,month + 1, -1).getDate();

    const lastMonthDays = new Date(year,month,-1).getDate();

    console.log('firstdayweekday', firstDayweekday);

    console.log('daysInMonth', daysInMonth);

    const calendarDayList = calendar.querySelector('.calendar-day-list');

    clearChildElements(calendarDayList);

    const df = new DocumentFragment();

    for(let i = 0; i < firstDayweekday; i++){

        df.appendChild(

            createCalendarDayComponent(lastMonthDays-i,month-1 === -1 ? 11:month-1,'previous-month')
        )
    }

    for(let i = 0; i <= daysInMonth; i++){

        if(month === -1) month = 11;

        if(month === 11) month = 0;

        df.appendChild(

            createCalendarDayComponent(i + 1,month,'current-month')
        )
    }

    for(let i = 0; i < 41 - daysInMonth - firstDayweekday; i++){

        df.appendChild(

            createCalendarDayComponent(i+1,month+1 === 12 ? 0:month+1,'next-month')
        )
    }

    calendarDayList.append(df);

    if(day) setCalendarDay(day,month);
};
    

function setCalendarDay(dayNumber,monthNumber){

    console.log(dayNumber,monthNumber)

    const calendar = document.querySelector('.calendar');
    
    const days = [...calendar.querySelectorAll('.calendar-day-item')];

    days.forEach( day => {

        if(day.classList.contains('today')) day.classList.remove('today');

    });

    for(let i = 0; i < days.length; i++){

        if(+days[i].dataset.month === monthNumber){

            if(+days[i].firstElementChild.textContent === dayNumber){

                days[i].classList.add('today');
    
                break;
    
            }
        }
    }

    // days.forEach( (day,index) => {

    //     if(+day.firstElementChild.textContent === dayNumber){

    //         day.classList.add('today');

    //     }
    // })
};

function getCalendarData(){

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const data = [];

    const calendar = document.querySelector('.calendar');

    const year = calendar.querySelector(`[data-calendar-display="year"]`).textContent;

    const month = calendar.querySelector(`[data-calendar-display="month"]`).textContent;

    data.push(+year);
    
    for(let i = 0; i < monthNames.length; i++){

        if(monthNames[i].toLowerCase() === month.toLowerCase()){

            data.push(i);

            break;
        }
    }

    const days = [...calendar.querySelectorAll('.calendar-day-item')];

    const currentDay = days.find( element => element.classList.contains('today'));

    if(!currentDay) data.push(null);

    else data.push(+currentDay.firstElementChild.textContent);

    return data;
}

function handleCalendarControls(event){ 

    event.preventDefault();

    const { currentTarget, target } = event;

    if(target.dataset.calendarControl){

        switch(target.dataset.calendarControl){

            case 'day':

                setCalendarDay(+target.dataset.day,+target.dataset.month);

                openCalendarDayviewer();

            break;

            case 'previous-month':{

                const data = getCalendarData();

                if(data[1] === 0){

                    data[0]--;

                    if(data[0] === 0) data[0] = 11;

                    data[1] = 12;
                }

                setCalendar(data[0],data[1] - 1,data[2])
            }
            break;

            case 'next-month':

                const data = getCalendarData();

                if(data[1] === 11){

                    data[0]++;

                    data[1] = -1;
                }

                setCalendar(data[0],data[1] + 1,data[2])

            break;
        }
    }

};

function createCalendarDayComponent(day,month,monthClass){

    const li = document.createElement('li');

    li.classList.add('calendar-day-item');

    li.dataset.calendarControl = 'day';

    if(month !== undefined || month !== null) li.dataset.month = `${month}`;

    if(monthClass) li.classList.add(monthClass);

    const p = document.createElement('p');

    p.classList.add('calendar-day-number');

    if(day){

        li.dataset.day = `${day}`;

        p.textContent = `${day}`;
    }

    li.append(p);

    return li;
};





