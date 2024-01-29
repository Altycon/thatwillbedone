

export function openCalendarDayviewer(){

    const dayviewer = document.querySelector('.calendar-dayview-window');

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

}