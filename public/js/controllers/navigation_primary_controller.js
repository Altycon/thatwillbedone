
import { hideCalendar, listenToCalendar, loadCalendarData, revealCalendar } from "./calendar_controller.js";
import { animateManagementList, listenToManagementPage, loadManagementData, removeAnimationOnManagementList } from "./manage_todo_controller.js";
import { loadTodoData } from "./todo_controller.js";
import { listenToNewTodoForm } from "./todo_form_controller.js";

export function handleNavigationPrimary(){

    switch(window.location.hash){

        case '#TodoManagement':

            loadManagementData();

            listenToManagementPage();

            animateManagementList();

        break;

        case '#TodoCalendar':
            
            const today = new Date();

            loadCalendarData(today.getFullYear(),today.getMonth(), today.getDate() );

            listenToCalendar();

            revealCalendar();

        break;

        default:

            loadTodoData();

            listenToNewTodoForm();



            removeAnimationOnManagementList();

            hideCalendar();

        break;
    }

};


