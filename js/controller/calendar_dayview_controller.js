import { AltyIDB } from "../databases/local_index_database.js";
import { clearChildElements } from "../utilities.js";


export function openCalendarDayviewer(target){

    const year = +target.dataset.year;

    const month = +target.dataset.month;

    const day = +target.dataset.day;

    const period = new Date(year,month,day);

    const weekday = +period.getDay();


    const dayviewer = document.querySelector('.calendar-dayview-window');

    const dayviewerList = dayviewer.querySelector('.calendar-dayview-list');

    const dayItems = [...target.querySelectorAll('.calendar-day-list-item')];

    if(dayItems.length > 0) clearChildElements(dayviewerList);

    dayItems.forEach( dayItem => {

        const key = dayItem.dataset.key;

        if(key.startsWith('T')){

            AltyIDB.get('todo',key, (data)=>{

                dayviewerList.insertBefore(

                    createCalendarDayViewerDayItemComponent(data.description),
                    dayviewerList.firstElementChild
                )

            });
        }else if(key.startsWith('L')){

            AltyIDB.get('list',key, (data)=>{

                const thing = ' - ' + (data.items.split(',').map( item => ` ` + item).join(','));

                console.log('thin', thing)

                dayviewerList.insertBefore(

                    createCalendarDayViewerDayItemComponent(data.title+':', thing),
                    dayviewerList.firstElementChild
                )

            });
        }
    })

    setCalendarDayViewerDisplay(weekday,month,day,year);

    const closeButton = dayviewer.querySelector('[data-calendar-day-control="close"]');

    closeButton.addEventListener('click', closeCalendarDayviewer);

    dayviewer.classList.add('open');

    setTimeout( ()=> {

        dayviewer.classList.add('appear');

    },100);

};

function closeCalendarDayviewer(event){

    const dayviewer = document.querySelector('.calendar-dayview-window');

    dayviewer.classList.remove('appear');

    event.target.removeEventListener('click', closeCalendarDayviewer);

    setTimeout( ()=> {

        dayviewer.classList.remove('open');

    },500);

};

function setCalendarDayViewerDisplay(weekday,month,day,year){

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    const dayviewer = document.querySelector('.calendar-dayview-window');

    const content = `${weekdayNames[weekday]}, ${monthNames[month]} ${day}, ${year}`;

    dayviewer.querySelector('[data-calendar-day-display="date"]').textContent = content;

};

function createCalendarDayViewerDayItemComponent(text,extraText){

    const li = document.createElement('li');

    li.classList.add('calendar-dayview-item');

    li.textContent = text;

    if(extraText) li.textContent += extraText;

    return li;
};