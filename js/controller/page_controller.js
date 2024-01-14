
import { listenToConnectionControls, stopListenToConnectionControls } from "./connection_controller.js";
import { listsController } from "./list_controller.js";
import { notesController } from "./notes_controller.js";
import { todosController } from "./todo_controller.js";


export function resetPages(){

    [...document.querySelectorAll('[data-page]')].forEach( page => {

        if(page.classList.contains('active')) {

            page.classList.remove('appear');

            setTimeout( ()=> {

                stopListenToConnectionControls(page);

                page.classList.remove('active');

            },500);

        };
    });

};

function activatePage(page){
    
    page.classList.add('active');

    const link = document.querySelector(`[data-nav-link="${page.dataset.page}"]`);

    link.classList.add('active');

    link.parentElement.classList.add('active');

    setTimeout( ()=> {

        page.classList.add('appear');

        listenToConnectionControls(page);

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

    }

}