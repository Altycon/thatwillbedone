import { createTodoComponent } from "../components/todo_component.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { clearChildElements, createTWBDId } from "../utilities.js";


export function listenToTodoForm(){


    const form = document.querySelector(`.new-todo-form`);

    const textarea = form.querySelector('textarea');

    const formControl = document.querySelector(`[data-control="${form.dataset.connect}"]`);


    formControl.addEventListener('click', stopListeningToTodoForm);

    form.addEventListener('submit', handleTodoFormSubmit);

    form.addEventListener('transitionend', _=>{

        textarea.focus();
    });

    textarea.addEventListener('keydown', handleTodoKeydown);

    textarea.innerText = '';
    
};



function stopListeningToTodoForm(ev){

    const form = document.querySelector(`.new-todo-form`);

    const textarea = form.querySelector('textarea');

    form.removeEventListener('submit', handleTodoFormSubmit);

    textarea.removeEventListener('keydown', handleTodoKeydown);

    form.addEventListener('transitionend', _=>{

        if(document.activeElement === textarea) textarea.blur();

    });

    resetTodoForm(form);

    ev.target.removeEventListener('click', stopListeningToTodoForm);

};

function handleTodoFormSubmit(event){

    event.preventDefault();

    const data = new FormData(event.target);

    const description = data.get('todo').trim();

    if(!description) return;

    const gaol = data.get('goal') || null;

    const now = Date.now().toString();

    const todo = {

        id: createTWBDId('T'),
        description: description,
        createdTimestamp: now,
        modifiedTimestamp: now,
        completedTimestamp: null,
        goalTimestamp: gaol

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
        

        todoList.insertBefore(new DocumentFragment().appendChild(component),todoList.firstChild);

        const todoFormControl = document.querySelector(`[data-control="todo-form"]`);

        todoFormControl.addEventListener('click', function unhideTodo(event){

            setTimeout(() => {

                component.classList.remove('hiding');
                
            },300);

            event.target.removeEventListener('click',unhideTodo);
        });
        todoFormControl.click();

        resetTodoForm(event.target);

    });

};

function handleTodoKeydown(event){

    const { key, shiftkey } = event;

        if(key === 'Enter' && !shiftkey){

            event.preventDefault();

            event.target.closest('form').querySelector('button[type="submit"]').click();
        }
};


function resetTodoForm(form){

    form.reset();

    const textarea = form.querySelector('textarea');

    textarea.innerText = '';

    [...form.querySelectorAll('[data-goal-connect')].forEach( connection => {

        if(connection.nodeName !== 'INPUT'){

            connection.textContent = "";

        }else{

            connection.value = "";
        }
    })

    if(document.activeElement === textarea) return;
    
    else textarea.focus();
};