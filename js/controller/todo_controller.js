import { createTodoComponent } from "../components/todo_component.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { parseTimestamp } from "../utilities.js";


export function todosController(){

    const todoList = document.querySelector('.todo-list');

    todoList.addEventListener('click', (event)=>{

        if(!event) return;

        const { currentTarget, target } = event;

        if(target.dataset.button){

            handleTodoButtons(target,currentTarget);
        }

    });

};

function handleTodoButtons(target,todoList){

    const button = target.dataset.button;

    const li = target.closest('li');


    switch(button){

        case 'completed': 

            completeTodo(li);

        break;

        case 'edit': 
    
           startEditingTodo(li);

        break;

        case 'cancel':

            cancelEditingTodo(li);

        break;

        case 'save':

            updateTodo(li);

            cancelEditingTodo(li);

        break;

        case 'delete':

            deleteTodo(li,todoList)            
        
        break;
    }
};

function handleTodoDescriptionKeydown(event){

    const { key, shiftkey } = event;

    if(key === 'Enter' && !shiftkey){

        const li = event.target.closest('li');

        updateTodo(li);

        cancelEditingTodo(li);
    }
};

function completeTodo(li){

    const key = li.getAttribute('data-key');

    if(!key) return;

    const todo = { id: key, completedTimestamp: null };

    if(!li.classList.contains('completed')){

        todo.completedTimestamp = Date.now().toString();

    }

    AltyIDB.update('todo', todo, ()=>{

        li.querySelector(`.todo-completed-datetime span`).textContent = todo.completedTimestamp ? parseTimestamp(todo.completedTimestamp,'timedate'):'Not completed';

    });

    li.classList.toggle('completed');
};

function startEditingTodo(li){

    if(li.classList.contains('edit')) return;


    const descriptionElement = li.querySelector('.todo-item-description');

    descriptionElement.contentEditable = true;

    descriptionElement.style.outline = '1px solid black';
    
    descriptionElement.addEventListener('keydown', handleTodoDescriptionKeydown);

    li.classList.add('edit');

    //description.focus();

    //addToSiteState('originalNote',description.innerText.trim());
};

function cancelEditingTodo(li){

    if(!li.classList.contains('edit')) return;


    const descriptionElement = li.querySelector('.todo-item-description');

    descriptionElement.contentEditable = false;

    descriptionElement.style.outline = 'none';

    descriptionElement.removeEventListener('click', handleTodoDescriptionKeydown);
    
    li.classList.remove('edit');

    if(document.activeElement === descriptionElement) descriptionElement.blur();

    //deleteFromSiteState('originalNote');

};

function updateTodo(li){

    const key = li.getAttribute('data-key');

    if(!key) return;
    
    // I think I should compare old to new descriptions if its changed...
    const descriptionElement = li.querySelector('.todo-item-description');

    if(descriptionElement){

        const text = descriptionElement.innerText.trim();

        if(text !== '' && text !== ' '){

            const newTodo = {

                id: key,
                description: text,
                modifiedTimestamp: Date.now().toString()

            };

            AltyIDB.update('todo', newTodo);

        }else{

            deleteTodo(li,li.closest('ul'));

        }
    }

};

function deleteTodo(li,todoList){

    if(confirm('Are you sure you want to delete this todo?')){

        AltyIDB.deleteData('todo', li.getAttribute('data-key'), (data)=>{

            todoList.removeChild(li);

        })
    }
};

export function buildTodoList(data){

    if(!data || data.length < 1) return;

    const todoList = document.querySelector('.todo-list');

    while(todoList.lastChild){

        todoList.removeChild(todoList.lastChild);
    }

    const df = new DocumentFragment();

    data.sort( (a,b) => +b.createdTimestamp - +a.createdTimestamp).forEach( todo => {
    
        df.appendChild(

            createTodoComponent(
                todo.id,
                todo.description,
                todo.createdTimestamp,
                todo.completedTimestamp,
                todo.goalTimestamp
            )
        );
    });

    todoList.appendChild(df);

};