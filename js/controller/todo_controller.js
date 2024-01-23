import { createNoContentComponent } from "../components/no_content_component.js";
import { createTodoComponent } from "../components/todo_component.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { clearChildElements, parseDatetimeStringToTimestamp, parseTimestamp } from "../utilities.js";
import { confirmSelection } from "./confirm_selection_controller.js";
import { pickDatetime } from "./datetime_picker_controller.js";


export function todosController(){

    const todoList = document.querySelector('.todo-list');

    todoList.addEventListener('click', listenToTodos);

};

function listenToTodos(event){

    if(!event) return;

    const { currentTarget, target } = event;

    if(target.dataset.button){

        handleTodoButtons(target,currentTarget);
    }

}

export function stopListeningToTodos(){

    const todoList = document.querySelector('.todo-list');

    todoList.removeEventListener('click', listenToTodos);

    [...todoList.querySelectorAll('.todo-item')].forEach( todo => {

        if(todo.classList.contains('edit')) todo.classList.remove('edit');

        todo.querySelector('.todo-item-description').removeEventListener('keydown', handleTodoDescriptionKeydown);

    });
  
}

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

        confirmSelection('Are you sure you want to update?', ()=>{

            updateTodo(li);

            cancelEditingTodo(li);

        });

        break;

        case 'datetime':

            console.log('hit')
            pickDatetime({ target });

        break;

        case 'delete':

        confirmSelection('Delete todo?', ()=>{

            deleteTodo(li,todoList);

        });            
        
        break;
    }
};

function handleTodoDescriptionKeydown(event){

    const { key, shiftkey } = event;

    if(key === 'Enter' && !shiftkey){

        const li = event.target.closest('li');

        confirmSelection('Are you sure you want to update?', ()=>{

            updateTodo(li);

            cancelEditingTodo(li);

        });
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
    
    descriptionElement.addEventListener('keydown', handleTodoDescriptionKeydown);

    li.classList.add('edit');

    //description.focus();

    //addToSiteState('originalNote',description.innerText.trim());
};

function cancelEditingTodo(li){

    if(!li.classList.contains('edit')) return;


    const descriptionElement = li.querySelector('.todo-item-description');

    descriptionElement.contentEditable = false;

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

    const goalDatetimeElement = li.querySelector('[data-goal-connect]')

    if(descriptionElement){

        const text = descriptionElement.innerText.trim();

        const goal = goalDatetimeElement.textContent.toLowerCase();

        if(text !== '' && text !== ' '){

            const newTodo = {

                id: key,
                description: text,
                modifiedTimestamp: Date.now().toString(),
                goalTimestamp: parseDatetimeStringToTimestamp(goal)
            };

            AltyIDB.update('todo', newTodo);

        }else{

            deleteTodo(li,li.closest('ul'));

        }
    }

};

function deleteTodo(li,todoList){

    AltyIDB.deleteData('todo', li.getAttribute('data-key'), (data)=>{

    todoList.removeChild(li);

        if(todoList.children.length < 1){

            todoList.appendChild(createNoContentComponent())
        }

    });
};

export function buildTodoList(data){

    if(!data || data.length < 1) return;

    const todoList = document.querySelector('.todo-list');

    clearChildElements(todoList);

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