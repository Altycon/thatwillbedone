import { createTodoComponent } from "../components/todo_component.js";
import { AltyStorage } from "../local_database/local-storage.js";
import { animateComponentOnAppend, generateUniqueId } from "../utilities_client.js";

export function listenToNewTodoForm(){

    document.querySelector('.td-form').addEventListener('submit', submitTodo);

    document.querySelector('.td-form').addEventListener('keydown', handleTodoFormKeydownEvents);
};

export function submitTodo(submitEvent){

    submitEvent.preventDefault();

    const formData = new FormData(submitEvent.target);

    const description = formData.get('description').trim();

    if(!description || description === "" || description === ' '){

        alert('Your to-do description should have text. It cannot be blank.');

        return;
    }
    

    const todo = {
        id: generateUniqueId(1000),
        description: description,
        type: 'todo',
        active: true,
        common: false,
        completed: false,
        createdTime: Date.now(),
        modifiedTime: null,
        accomplishByTime: null,
        completedTime: null
    };

    // append list

    const documentFragment = new DocumentFragment();

    const todoComponent = createTodoComponent(todo);

    animateComponentOnAppend(todoComponent,'--todoInsertAnimationDelay', 0)

    documentFragment.appendChild(todoComponent);

    const todoList = document.querySelector('.td-list');
    
    todoList.insertBefore(documentFragment,todoList.firstChild);

    // save to database

    AltyStorage.setItem('todo-store', todo);

    submitEvent.target.reset();
};

export function handleTodoFormKeydownEvents(keydownEvent){

    const { currentTarget: todoForm, target, key, shiftKey } = keydownEvent;

    switch(target.dataset.todoForm){

        case 'description':

            if(document.body.dataset.device === 'desktop'){

                if(key && key === 'Enter' && !shiftKey){

                    keydownEvent.preventDefault();

                    todoForm.querySelector('button[type="submit"]').click();

                    todoForm.reset();
                }

            }

        break;

    }
}