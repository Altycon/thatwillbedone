import { createCommonTodoComponent } from "../components/common_todo_component.js";
import { createTodoComponent } from "../components/todo_component.js";
import { AltyStorage } from "../local_database/local-storage.js";
import { formatTodoTime, generateUniqueId, removeElementChildren } from "../utilities_client.js";
import { appendCommonTodoComponent } from "./common_todo_controller.js";
import { confirmSelection } from "./confirmation_controller.js";

export function loadTodoData(){

    const todoStore = AltyStorage.getStore('todo-store');

    if(!todoStore) return;

    appendTodoComponentsOnLoad(todoStore);
    
};

function appendTodoComponentsOnLoad(todoStore){

    const todoList = document.querySelector('.td-list');

    const commonTodoList = document.querySelector('.td-common-list');


    removeElementChildren(commonTodoList)

    removeElementChildren(todoList);


    const todoDocumentFragment = new DocumentFragment();

    const commonTodoDocumentFragment = new DocumentFragment();


    todoStore.reverse().forEach( todo => {

        if(todo.active && todo.type === 'todo'){

            todoDocumentFragment.appendChild( createTodoComponent(todo) );

        }

        if(todo.active && todo.type === 'common'){

            commonTodoDocumentFragment.appendChild( createCommonTodoComponent(todo));

        }

    });


    if(todoDocumentFragment.children.length > 0){

        todoList.appendChild( todoDocumentFragment );

    }

    if(commonTodoDocumentFragment.children.length > 0){

        commonTodoList.appendChild( commonTodoDocumentFragment );
    }

};

  


export function handleTodoControls(clickEvent){

    const { currentTarget: todoItem, target } = clickEvent;

    switch(target.dataset.todoControl){

        case 'complete':

            clickEvent.preventDefault();

            completeTodo(todoItem);

        break;

        case 'remove':

            clickEvent.preventDefault();

            confirmSelection(

                'You will be removing:',

                `${todoItem.querySelector(`[data-todo-display="description"]`).textContent}`,

                'Are you sure?',

                ()=> removeTodoComponent(todoItem));
        
        break;

        case 'commonality':
        
            handleTodoCommonality(todoItem,target);

        break;

        case 'accomplishby':

            handleAccomplishByDateTime(todoItem,target);

        break;
    }

};

function completeTodo(todoItem){

    if(!todoItem.classList.contains('completed')){

        const now = Date.now();

        AltyStorage.updateItem('todo-store', todoItem.dataset.todoId, { 
            completed: true, 
            completedTime: now,
            modifiedTime: now
        });

        todoItem.querySelector(`[data-todo-display="completed-datetime"]`).textContent = formatTodoTime(now);

    }else{

        AltyStorage.updateItem('todo-store', todoItem.dataset.todoId, { 
            completed: false, 
            completedTime: null,
            modifiedTime: Date.now()
        });

        todoItem.querySelector(`[data-todo-display="completed-datetime"]`).textContent = '';
    }

    todoItem.classList.toggle('completed');

};

function removeTodoComponent(todoItem){

    AltyStorage.updateItem('todo-store', todoItem.dataset.todoId, { 
        active: false, 
        modifiedTime: Date.now()
    });

    todoItem.remove();
};

function handleTodoCommonality(todoItem, target){

    if(target.checked){

        const storedTodo = AltyStorage.updateItem('todo-store', todoItem.dataset.todoId, { 
            common: true, 
            modifiedTime: Date.now()
        });

        let commonTodo;
        let match;
        
        const store = AltyStorage.getStore('todo-store');

        for(let i = 0; i < store.length; i++){

            if(store[i].type === 'common' && store[i].todoId === todoItem.dataset.todoId){

                match = store[i];

                break;
            }
        }

        if(match){

            commonTodo = match;

            AltyStorage.updateItem('todo-store', commonTodo.id, { 
                active: true,
                modifiedTime: Date.now()
            });
            
        }else{

            commonTodo = {
                id: generateUniqueId(1000),
                todoId: storedTodo.id,
                type: 'common',
                description: storedTodo.description,
                active: true,
                createdTime: Date.now(),
                modifiedTime: null
            };

            AltyStorage.setItem('todo-store', commonTodo);
        }
  
        appendCommonTodoComponent(createCommonTodoComponent(commonTodo));

        todoItem.classList.add('common');

    }else{

        AltyStorage.updateItem('todo-store', todoItem.dataset.todoId, { 
            common: false, 
            modifiedTime: Date.now()
        });

        const commonItem = document.querySelector(`.td-common-list [data-todo-id="${todoItem.dataset.todoId}"]`)

        AltyStorage.updateItem('todo-store', commonItem.dataset.commonTodoId, { 
            active: false, 
            modifiedTime: Date.now()
        });

        commonItem.remove();

        todoItem.classList.remove('common');
    }

};

function handleAccomplishByDateTime(todoItem, target){

    window.location = window.location.href + '#TodoCalendar';

};

export function updateTodo(todo){

    // update todo in storage

    // update components page wide

    updateTodoComponent(todo);
}

function updateTodoComponent(todo){

    const todoElements = document.querySelectorAll(`[data-todo-id"${todo.id}"]`);

    console.log(todoElements);
}

