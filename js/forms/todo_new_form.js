import { createTodoComponent } from "../components/todo_component.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { createTWBDId } from "../utilities.js";


export function listenToTodoForm(){


    const form = document.querySelector(`.new-todo-form`);

    const textarea = form.querySelector('textarea');

    textarea.innerText = '';

    const formControl = document.querySelector(`[data-control="${form.dataset.connect}"]`);


    function handleTodoFormSubmit(ev){

        ev.preventDefault();
    
        const data = new FormData(ev.target);
    
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
    
            const todoList = document.querySelector('.todo-list');
    
            todoList.insertBefore(component,todoList.firstChild);
    
            resetNoteForm(ev.target);

            notify('Successfully added to-do');

        });
    
    };

    function handleTodoKeydown(event){

        const { key, shiftkey } = event;

            if(key === 'Enter' && !shiftkey){

                event.preventDefault();

                form.querySelector('button[type="submit"]').click();
            }
    };

    function stopListeningToTodoForm(ev){

        form.removeEventListener('submit', handleTodoFormSubmit);

        textarea.removeEventListener('keydown', handleTodoKeydown)

        ev.target.removeEventListener('click', stopListeningToTodoForm);

    }

    formControl.addEventListener('click', stopListeningToTodoForm);

    form.addEventListener('submit', handleTodoFormSubmit);

    textarea.addEventListener('keydown', handleTodoKeydown);
    
    textarea.focus();
};



function resetNoteForm(form){

    form.reset();

    const textarea = form.querySelector('textarea');

    textarea.innerText = '';

    if(document.activeElement === textarea) return;
    
    else textarea.focus();
};