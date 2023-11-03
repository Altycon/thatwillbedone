import { createTodoComponent } from "../components/todo_component.js";
import { AltyStorage } from "../local_database/local-storage.js";
import { animateComponentOnAppend, generateUniqueId } from "../utilities_client.js";
import { confirmSelection } from "./confirmation_controller.js";

export function appendCommonTodoComponent(component){

    const commonTodoList = document.querySelector('.td-common-list');

     const documentFragment = new DocumentFragment();

     animateComponentOnAppend(component, '--commonItemAppearAnimationDelay', 0);

     documentFragment.appendChild(component)

    commonTodoList.insertBefore(documentFragment, commonTodoList.firstChild);
};

export function hasCommonComponent(todoId){

    const match = document.querySelector(`.td-common-list [data-todo-id="${todoId}"]`);

    if(match){

        return true;
    }

    return false;
};


export function handleCommonTodoControls(clickEvent){

    const { currentTarget: commonTodoItem, target } = clickEvent;

    switch(target.dataset.todoControl){

        case 'add-todo':

            clickEvent.preventDefault();

            recreateTodoComponent(commonTodoItem,target);

        break;

        case 'remove':

            clickEvent.preventDefault();

            confirmSelection(

                'You will be removing:',
                
                `${commonTodoItem.querySelector(`[data-todo-display="description"]`).textContent}`,
                
                'Are you sure?',
                
                ()=> removeCommonTodoComponent(commonTodoItem));

        break;

    }
};

function recreateTodoComponent(commonTodoItem,target){

    // check if todo exist already

    const store = AltyStorage.getStore('todo-store');

    const match = store.find( todo => todo.id === commonTodoItem.dataset.todoId);

    if(match){

        if(!match.completed) return;

       
    }

    //if(match && !match.completed) return;

    const todo = {
        id: generateUniqueId(1000),
        description: target.textContent,
        type: 'todo',
        active: true,
        common: true,
        completed: false,
        createdTime: Date.now(),
        modifiedTime: null,
        accomplishByTime: null,
        completedTime: null
    };

    // append list

    const documentFragment = new DocumentFragment();

    documentFragment.appendChild(createTodoComponent(todo));

    const todoList = document.querySelector('.td-list');
    
    todoList.insertBefore(documentFragment,todoList.firstChild);

    // save to database

    AltyStorage.setItem('todo-store', todo);

    // update todoId attached to element

    commonTodoItem.dataset.todoId = todo.id;
};

function removeCommonTodoComponent(commonTodo){

    // should confirm here
    AltyStorage.updateItem('todo-store', commonTodo.dataset.commonTodoId, {
        active: false,
        modifiedTime: Date.now()
    })

    
    commonTodo.remove();
};