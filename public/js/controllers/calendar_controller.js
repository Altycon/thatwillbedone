import { MONTH_NAMES, isLeapYear } from "../utilities_client.js";
import { openDayViewWindow, updateDayViewContent } from "./dayview_controller.js";


export function revealCalendar(){
    
    const calendar = document.querySelector('.td-calendar');

    if(!calendar.classList.contains('appear')) calendar.classList.add('appear');
}

export function hideCalendar(){

    const calendar = document.querySelector('.td-calendar');

    if(calendar.classList.contains('appear')){

        calendar.removeEventListener('click', handleCalendarControls);

        calendar.classList.remove('appear');
    }
};

export function loadCalendarData(year,month,date){

    if(month < 0) month = 11;

    month = month % 12;

    const { calendarData, selectedIndex } = createCalendarData(year,month,date);

    clearCalendarData();

    updateCalendarDisplay(month,year,calendarData,selectedIndex);

};


function createCalendarData(year,month,date){

    const htmlCells = document.querySelector('.td-calendar-day-list').children.length || 42;

    const weekdayIndexTotal = 6;

    const daysOfMonth = new Date(year, (month + 1), 0).getDate();

    const days = [];

    // create current month day objects
    for(let i = 1; i <= daysOfMonth; i++){

        days.push( createDayObject (
            month,
            year,
            i
        ))

    }

    const selectedMonthLastDayIndex = (new Date(year, month, daysOfMonth)).getDay();

    const amountOflastCellsToFill = weekdayIndexTotal - selectedMonthLastDayIndex;

    // create future month day objects
    for(let i = 1; i <= amountOflastCellsToFill; i++){

        days.push( createDayObject (
            month,
            year,
            i
        ))
    }

    const lastMonthDays = new Date(year, month , 0).getDate();

    const beginingNumberOfDays = htmlCells - days.length

    // create past month days objects
    for(let i = lastMonthDays; i > (lastMonthDays - beginingNumberOfDays); i--){
       
        days.unshift( createDayObject (
            month,
            year,
            i
        ))
    }

    days.forEach( (day,index) => day.weekday = index % 7);

    let selectedIndex;

    if(date){

        selectedIndex = (date - 1) + beginingNumberOfDays;

    }else{

        const today = new Date();

        if(month === today.getMonth()){

            selectedIndex = (today.getDate() - 1) + beginingNumberOfDays;

        }else{

            selectedIndex = null;
        }
    }

    return {
        calendarData: days,
        selectedIndex: selectedIndex
    }
}

function createDayObject(month,year,day){
    return {
        month,
        day,
        year
    }
}

function clearCalendarData(){

    const calendar = document.querySelector('.td-calendar');

    [...calendar.querySelectorAll('.td-calendar-day-item')].forEach( item => {

        if(item.classList.contains('today')) item.classList.remove('today');

        item.querySelector('.td-calendar-day-number').textContent = "";
    })
}

function updateCalendarDisplay(month,year,days,todayIndex){

    const calendar = document.querySelector('.td-calendar');

    calendar.setAttribute('data-month', `${month}`);

    calendar.setAttribute('data-year', `${year}`);

    
    calendar.querySelector(`[data-calendar-display="month"]`).textContent = MONTH_NAMES[month];

    calendar.querySelector(`[data-calendar-display="year"]`).textContent = `${year}`;


    const dayNumbers = [...calendar.querySelectorAll('.td-calendar-day-number')];
    
    days.forEach( (day,index)=> {

        const dayNumberItem = dayNumbers[index]
        const dayItem = dayNumberItem.closest('li');
        

        dayItem.setAttribute('data-calendar-day', `${day.day}`);
        dayItem.setAttribute('data-calendar-weekday', `${day.weekday}`)

        dayNumberItem.textContent = `${day.day}`

        if(todayIndex && index === todayIndex) dayItem.classList.add('today');
    });

};

export function listenToCalendar(){

    const calendar = document.querySelector('.td-calendar');

    calendar.addEventListener('click', handleCalendarControls);
};


function handleCalendarControls(clickEvent){

    const { currentTarget: calendar, target } = clickEvent

    const calendarControl = target.dataset.calendarControl;

    switch(calendarControl){

        case 'past-month':{

            const { year, month } = getCurrentCalendarData();

            const updatedYear = (Number(month) - 1) % 12 === 0 ? Number(year) - 1:Number(year);

            const updatedMonth = Number(month) - 1;

            loadCalendarData(updatedYear, updatedMonth);
            
        }
        break;

        case 'future-month':{

            const { year, month } = getCurrentCalendarData();

            const updatedYear = (Number(month) + 1) % 12 === 0 ? Number(year) + 1:Number(year);

            const updatedMonth = Number(month) + 1;

            loadCalendarData(updatedYear, updatedMonth);

        }
        break;

        case 'day':

            const { year, month } = getCurrentCalendarData();

            const day = target.dataset.calendarDay;
            const weekday = target.dataset.calendarWeekday;

            updateDayViewContent(year,month,day,weekday);

            openDayViewWindow();

        break;
    }
}

function getCurrentCalendarData(){

    const calendar = document.querySelector('.td-calendar');

    return {
        year: calendar.dataset.year,
        month: calendar.dataset.month
    }
}

