import { listenToListForm } from "../forms/list_new_form.js";
import { listenToNoteForm } from "../forms/note_new_form.js";
import { listenToTodoForm } from "../forms/todo_new_form.js";
import { debounce } from "../utilities.js";
import { clearSiteState, setSiteState } from "./state_controller.js";


export function handleConnectListeners(control){

    switch(control){

        case 'todo-form':

            listenToTodoForm();

        break;

        case 'list-form':

            listenToListForm();

        break;

        case 'note-form':

            listenToNoteForm();

        break;

    }


};

export function openControlConnection(connection){

    setTimeout( ()=> {

        connection.classList.add('appear');;

    },100);

    connection.classList.add('open');

};

export function closeControlConnection(connection){

    setTimeout( ()=> {

        connection.classList.remove('open');;

    },500);

    connection.classList.remove('appear');
};

function handleConnectionControls(event){

    event.preventDefault();

    const button = event.target;

    const connection = document.querySelector(`[data-connect="${button.dataset.control}"]`);

    if(connection){

        if(connection.classList.contains('open')){

            closeControlConnection(connection);

            button.classList.remove('active');

            // if(button.dataset.href){

            //     clearSiteState(button.dataset.href);

            // }

        }else{

            // if(button.dataset.href){

            //     setSiteState(button.dataset.href);

            // }

            openControlConnection(connection);

            button.classList.add('active');

            handleConnectListeners(button.dataset.control);

        }
    }
    
}
export function listenToConnectionControls(page){

    [...page.querySelectorAll(`[data-control]`)].forEach( button => {

        button.addEventListener('click', handleConnectionControls);

    });

};

export function stopListenToConnectionControls(page){

    [...page.querySelectorAll(`[data-control]`)].forEach( button => {

        button.removeEventListener('click', handleConnectionControls);
    });

};