import { createMangeTodoComponent } from "../components/manage_todo_component.js";
import { AltyStorage } from "../local_database/local-storage.js";
import { removeElementChildren } from "../utilities_client.js";
import { insertTodoDataIntoUpdateForm, listenToUpdateForm, openUpdateTodoWindow } from "./edit_todo_controller.js";
import { todoNotify } from "./notification_controller.js";

export function loadManagementData(){

    const todoStore = AltyStorage.getStore('todo-store');

    if(!todoStore) return;

    appendManageTodoComponents(todoStore);
 
};

export function listenToManagementPage(){

    document.querySelector(`.td-management [data-todo-management-control="select-all"]`)
    .addEventListener('click', selectAllManageTodoItemCheckboxes)

    document.querySelector(`.td-management [data-todo-management-control="delete-selected"]`)
    .addEventListener('click', deleteAllSelectedManageTodoItems);

};

function selectAllManageTodoItemCheckboxes(){

    [...document.querySelectorAll('.td-management-item')].forEach( item => {

        item.querySelector(`[data-todo-control="delete"]`).checked = true;
    })
};

function deleteAllSelectedManageTodoItems(){

    const toBeDeleted = [];

    [...document.querySelectorAll('.td-management-item')].forEach( item => {
        
        const checkbox = item.querySelector(`[data-todo-control="delete"]`);

        if(checkbox.checked === true){

            toBeDeleted.push(item.dataset.todoId);

            item.remove();
        }
    });

    if(toBeDeleted.length < 1){

        todoNotify('You have nothing selected to be deleted.')

        return;
    }

    const todoStore = AltyStorage.getStore('todo-store');

    if(todoStore.length < 1) return;

    toBeDeleted.forEach( id => {

        for(let i = 0; i < todoStore.length; i++){

            const item = todoStore[i];

            if(id === item.id){

                todoStore.splice(i,1);

                break;
            }
        }
    });

    AltyStorage.setStore('todo-store', todoStore);

};


function appendManageTodoComponents(todoStore){

    const managementList =  document.querySelector('.td-management-list');

    removeElementChildren(managementList);

    const managementFragment = new DocumentFragment();

    todoStore.forEach( todo => {

        if(todo.type === 'todo'){

            managementFragment.appendChild(createMangeTodoComponent(todo));

        }
    });

    managementList.appendChild(managementFragment);
   
};


export function manageTodo(clickEvent){

    const { currentTarget: todoItem, target } = clickEvent;

    const control = target.dataset.todoControl;

    if(control){

        switch(control){

            case 'edit':
               
                insertTodoDataIntoUpdateForm(todoItem.dataset.todoId);

                listenToUpdateForm();

                openUpdateTodoWindow()

            break;

            case 'delete':

                todoItem.classList.toggle('to-be-deleted');

            break;
        }
    }
   
};

export function animateManagementList(){

    document.querySelector('.td-management-list').classList.add('appear');

};

export function removeAnimationOnManagementList(){

    document.querySelector('.td-management-list').classList.remove('appear');
};

