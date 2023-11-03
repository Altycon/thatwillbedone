import { MONTH_NAMES, WEEKDAY_NAMES, removeElementChildren } from "../utilities_client.js";

export function openDayViewWindow(){

    document.querySelector('.td-calendar-dayview-window').classList.add('open');

    document.querySelector(`[data-calendar-day-control="close"]`).addEventListener('click', closeDayViewWindow);
};

export function closeDayViewWindow(event){

    if(event && event.target){

        event.target.removeEventListener('click',closeDayViewWindow);

    }else{

        document.querySelector(`[data-calendar-day-control="close"]`).removeEventListener('click',closeDayViewWindow);
    }

    clearDayViewContent();

    document.querySelector('.td-calendar-dayview-window').classList.remove('open');

};

export function updateDayViewContent(year,month,day,weekday,todos){

    
    document.querySelector(`[data-calendar-day-display="weekday"]`).textContent = `${WEEKDAY_NAMES[weekday]}`;
    document.querySelector(`[data-calendar-day-display="month"]`).textContent = `${MONTH_NAMES[month]}`;
    document.querySelector(`[data-calendar-day-display="date"]`).textContent = `${day}`;
    document.querySelector(`[data-calendar-day-display="year"]`).textContent = `${year}`;

    // add todo li with description

    if(todos){

        const dayviewTodoList = document.querySelector('.td-calendar-dayview-todo-list');

        const listFragment = new DocumentFragment();

        todos.forEach( todo => {

            const li = document.createElement('li');

            li.classList.add('td-calendar-dayview-todo-item');

            li.textContent = todo;

            listFragment.appendChild(li);

        });

        dayviewTodoList.appendChild(listFragment);

    }
};

export function clearDayViewContent(){

    document.querySelector(`[data-calendar-day-display="weekday"]`).textContent = "";
    document.querySelector(`[data-calendar-day-display="month"]`).textContent = "";
    document.querySelector(`[data-calendar-day-display="date"]`).textContent = "";
    document.querySelector(`[data-calendar-day-display="year"]`).textContent = "";

    removeElementChildren(dayviewTodoList);
};