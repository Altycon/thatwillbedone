import { handleCommonTodoControls } from "../controllers/common_todo_controller.js";
import { HTML_ENTITY } from "../utilities_client.js";

export function createCommonTodoComponent(commonTodo){

    const commonTodoItem = document.createElement('li');

    commonTodoItem.setAttribute('data-todo-id', commonTodo.todoId);

    commonTodoItem.setAttribute('data-common-todo-id', commonTodo.id);

    commonTodoItem.classList.add('td-common-item');

    commonTodoItem.addEventListener('click', handleCommonTodoControls);

    const descriptionButton = createCommonTodoDescriptionComponent(commonTodo.description);

    const removeCommonTodoButton = createCommonTodoCloseButtonComponent();

    commonTodoItem.append(descriptionButton, removeCommonTodoButton);

    return commonTodoItem;

};

function createCommonTodoDescriptionComponent(description){
    
    const descriptionButton = document.createElement('button');

    descriptionButton.setAttribute('type', 'button');

    descriptionButton.setAttribute('data-todo-display', 'description');

    descriptionButton.setAttribute('data-todo-control', 'add-todo');

    descriptionButton.classList.add('btn', 'td-common-description');

    descriptionButton.textContent = description;

    return descriptionButton;
};

function createCommonTodoCloseButtonComponent(){

    const removeCommonTodoButton = document.createElement('button');

    removeCommonTodoButton.setAttribute('type', 'button');

    removeCommonTodoButton.setAttribute('data-todo-control', 'remove');

    removeCommonTodoButton.classList.add('btn', 'td-common-remove-btn');

    removeCommonTodoButton.innerHTML = HTML_ENTITY.X_WRITTEN;

    return removeCommonTodoButton;
}

