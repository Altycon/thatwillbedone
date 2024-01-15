import { createTodoComponent } from "../components/todo_component.js";
import { notify } from "../controller/notification_controller.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { clearChildElements, createTWBDId } from "../utilities.js";


export function listenToTodoForm(){


    const form = document.querySelector(`.new-todo-form`);

    const textarea = form.querySelector('textarea');

    const formControl = document.querySelector(`[data-control="${form.dataset.connect}"]`);


    formControl.addEventListener('click', stopListeningToTodoForm);

    form.addEventListener('submit', handleTodoFormSubmit);

    textarea.addEventListener('keydown', handleTodoKeydown);

    textarea.innerText = '';
    
    textarea.focus();
};

function stopListeningToTodoForm(ev){

    const form = document.querySelector(`.new-todo-form`);

    form.removeEventListener('submit', handleTodoFormSubmit);

    form.querySelector('textarea').removeEventListener('keydown', handleTodoKeydown)

    ev.target.removeEventListener('click', stopListeningToTodoForm);

};

function handleTodoFormSubmit(event){

    event.preventDefault();

    const data = new FormData(event.target);

    const description = data.get('todo').trim();

    if(!description) return;

    // I need to get the "goal" time from the calendar....

    const now = Date.now().toString();

    const todo = {

        id: createTWBDId('T'),
        description: description,
        createdTimestamp: now,
        modifiedTimestamp: now,
        completedTimestamp: null,
        goalTimestamp: null

    };

    AltyIDB.add('todo', todo, ()=>{
        
        const component = createTodoComponent(
            todo.id,
            todo.description,
            todo.createdTimestamp,
            todo.completedTimestamp,
            todo.goalTimestamp
        );

        component.classList.add('hiding');

        const todoList = document.querySelector('.todo-list');

        if(todoList.querySelector('.no-content')){

            clearChildElements(todoList);
        }

        todoList.insertBefore(component,todoList.firstChild);

        const todoFormControl = document.querySelector(`[data-control="todo-form"]`);

        todoFormControl.addEventListener('click', function unhideTodo(event){

            setTimeout(() => {

                component.classList.remove('hiding');
                
            },300);

            event.target.removeEventListener('click',unhideTodo);
        });
        todoFormControl.click();

        resetNoteForm(event.target);

        notify('Successfully added to-do');

    });

};

function handleTodoKeydown(event){

    const { key, shiftkey } = event;

        if(key === 'Enter' && !shiftkey){

            event.preventDefault();

            event.target.closest('form').querySelector('button[type="submit"]').click();
        }
};


function resetNoteForm(form){

    form.reset();

    const textarea = form.querySelector('textarea');

    textarea.innerText = '';

    if(document.activeElement === textarea) return;
    
    else textarea.focus();
};