
import { calculatorController } from "./calculator_controller.js";
import { listenToConnectionControls, stopListenToConnectionControls } from "./connection_controller.js";
import { listenToGoalControls } from "./datetime_picker_controller.js";
import { listsController, stopListeningToLists } from "./list_controller.js";
import { notesController, stopListeningToNotes } from "./notes_controller.js";
import { profileController } from "./profile_controller.js";
import { settingsController } from "./settings_controller.js";
import { stopListeningToTodos, todosController } from "./todo_controller.js";


export function resetPages(){

    [...document.querySelectorAll('[data-page]')].forEach( page => {

        if(page.classList.contains('active')) {

            page.classList.remove('active');

            page.classList.remove('appear');

            stopListenToConnectionControls(page);

        };

        switch(page.dataset.page){

            case 'todos': stopListeningToTodos(); break;

            case 'lists': stopListeningToLists(); break;

            case 'notes': stopListeningToNotes(); break;
        }
    });

};

function activatePage(page){
    
    page.classList.add('active');

    const link = document.querySelector(`[data-nav-link="${page.dataset.page}"]`);

    link.classList.add('active');

    link.parentElement.classList.add('active');

    listenToConnectionControls(page);

    listenToGoalControls(page);

    setTimeout( ()=> {

        page.classList.add('appear');

        

    },100);

};

export function pageRouter(hash){

    const page = document.querySelector(`[data-page="${hash}"]`);

    activatePage(page);

    switch(hash){

        case 'todos':

            todosController();

        break;

        case 'lists':

            listsController();

        break;

        case 'notes':

            notesController();

        break;

        case 'calculator':

            calculatorController();

        break;

        case 'profile':

            profileController();

        break;

        case 'settings':

            settingsController();

        break;

    }

    document.title = `${hash.toUpperCase()} | TWBD`;

}