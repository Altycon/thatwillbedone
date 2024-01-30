import { AltyIDB } from "../databases/local_index_database.js";
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

            createCalendarDayComponent(lastMonthDays-i,month-1 === -1 ? 11:month-1,year - 1,'previous-month')
        )
    }

    for(let i = 0; i <= daysInMonth; i++){

        if(month === -1) month = 11;

        if(month === 11) month = 0;

        df.appendChild(

            createCalendarDayComponent(i + 1,month,year,'current-month')
        )
    }

    for(let i = 0; i < 41 - daysInMonth - firstDayweekday; i++){

        df.appendChild(

            createCalendarDayComponent(i+1,month+1 === 12 ? 0:month+1,year + 1,'next-month')
        )
    }

    calendarDayList.append(df);

    if(day) setCalendarDay(day,month);

    AltyIDB.getAll('todo', (todoData)=>{

        todoData.forEach( todo => {

            if(todo.goalTimestamp){

                const period = new Date(+todo.goalTimestamp);

                const todoYear = period.getFullYear();
                const todoMonth = period.getMonth();
                const todoDay = period.getDate();

                if(todoYear === year && todoMonth === month){

                    console.log('yeas',todoYear,todoMonth,todoDay)

                    addDayItemToCalendar(todo.id,todoYear,todoMonth,todoDay,`(T) ` + todo.description);

                }
                                
            }
        })

    })

    AltyIDB.getAll('list', (listData)=>{

        listData.forEach( list => {

            console.log('list',list)

            if(list.goalTimestamp){

                const period = new Date(+list.goalTimestamp);

                const listYear = period.getFullYear();
                const listMonth = period.getMonth();
                const listDay = period.getDate();

                if(listYear === year && listMonth === month){

                    console.log('ylist yeas',listYear,listMonth,listDay)

                    addDayItemToCalendar(list.id,listYear,listMonth,listDay,`(L) ` + list.title);

                }
                                
            }
        })

    })
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

                if(target.querySelector('.calendar-day-list-item')){
                    
                    openCalendarDayviewer(target);

                }

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

            case 'next-month':{

                const data = getCalendarData();

                if(data[1] === 11){

                    data[0]++;

                    data[1] = -1;
                }

                setCalendar(data[0],data[1] + 1,data[2])
            }
            break;
        }
    }

};

function createCalendarDayComponent(day,month,year,monthClass){

    const li = document.createElement('li');

    li.classList.add('calendar-day-item');

    li.dataset.calendarControl = 'day';

    li.dataset.month = `${month}`;

    li.dataset.year = `${year}`;

    li.dataset.day = `${day}`;

    if(monthClass) li.classList.add(monthClass);


    const p = document.createElement('p');

    p.classList.add('calendar-day-number');

    p.textContent = `${day}`;


    const ul = document.createElement('ul');

    ul.classList.add('calendar-day-item-list');

    li.append(p,ul);

    return li;
};

export function addDayItemToCalendar(id,year,month,day,item){

    const calendar = document.querySelector('.calendar');

    const days = [...calendar.querySelectorAll('.calendar-day-item')];

    for(let i = 0; i < days.length; i ++){

        const calendarDay = days[i];

        if(+calendarDay.dataset.year === year && +calendarDay.dataset.month === month &&
           +calendarDay.dataset.day === day){

                const dayList = calendarDay.querySelector('.calendar-day-item-list');

                dayList.insertBefore(

                    createCalendarDayItemComponenet(id,item),
                    dayList.firstElementChild

                );

        }
    }
};

function createCalendarDayItemComponenet(id,item){

    const li = document.createElement('li');

    li.dataset.key = id;

    li.classList.add('calendar-day-list-item');

    li.textContent = item;

    return li;
};





