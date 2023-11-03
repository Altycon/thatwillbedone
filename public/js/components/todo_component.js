import { handleTodoControls } from "../controllers/todo_controller.js";
import { HTML_ENTITY, formatTodoTime } from "../utilities_client.js";

export function createTodoComponent(todo){

    const todoItem = document.createElement('li');

    todoItem.setAttribute('data-todo-id', todo.id);

    todoItem.classList.add('td-item');

    if(todo.completed) todoItem.classList.add('completed');
    if(todo.common) todoItem.classList.add('common');
    
    
    const todoDescription = createTodoDescriptionComponent(todo.description);

    const todoControls = createTodoControlsComponent(todo.common);

    const todoInfo = createTodoInfoComponent(todo.createdTime,todo.accomplishByTime,todo.completedTime);


    todoItem.append(todoDescription,todoControls,todoInfo);

    todoItem.addEventListener('click', handleTodoControls);

    return todoItem;

};

function createTodoDescriptionComponent(description){

    const todoDescription = document.createElement('p');

    todoDescription.setAttribute('data-todo-display', 'description');

    todoDescription.classList.add('td-description');

    todoDescription.textContent = description;

    return todoDescription;
};

function createTodoControlsComponent(common){

    const todoControls = document.createElement('div');

    todoControls.classList.add('td-item-controls');

    const removeButton = createTodoButtonComponent('remove', HTML_ENTITY.X_WRITTEN);

    const completeButton = createTodoButtonComponent('complete', HTML_ENTITY.CHECKMARK_WRITTEN);

    const commonalityControl = createTodoCommonalityControlComponent(common);

    const accomplishByControl = createTodoAccomplishByControlComponent();


    todoControls.append(removeButton,completeButton,commonalityControl,accomplishByControl);


    return todoControls;

};

function createTodoButtonComponent(name,content){

    const button = document.createElement('button');

    button.setAttribute('type','button');

    button.setAttribute('data-todo-control', name);

    button.classList.add('btn',`td-${name}-btn`);

    button.innerHTML = content;

    return button;
};

function createTodoCommonalityControlComponent(common){
    
    const commonalityLabel = document.createElement('label');

    commonalityLabel.classList.add('btn', 'td-commonality-control-label');

    commonalityLabel.innerHTML = HTML_ENTITY.STAR_LAYERED;


    const commonalityCheckbox = document.createElement('input');

    commonalityCheckbox.setAttribute('type', 'checkbox');

    commonalityCheckbox.setAttribute('data-todo-control','commonality');

    if(common) commonalityCheckbox.setAttribute('checked',true);

    commonalityCheckbox.classList.add('td-commonality-control-checkbox');
    
    commonalityLabel.appendChild(commonalityCheckbox);

    return commonalityLabel;
}

function createTodoAccomplishByControlComponent(){

    const accomplishByLabel = document.createElement('label');

    accomplishByLabel.classList.add('btn','td-accomplishby-control-label');

    accomplishByLabel.innerHTML = HTML_ENTITY.CALENDAR2;


    const accomplishByDataTimeInput = document.createElement('input');

    accomplishByDataTimeInput.setAttribute('type', 'date');

    accomplishByDataTimeInput.setAttribute('data-todo-control','accomplishby');

    accomplishByDataTimeInput.classList.add('td-accomplishby-control-datetime');


    accomplishByLabel.appendChild(accomplishByDataTimeInput);
    

    return accomplishByLabel;

};

function createTodoInfoComponent(createdTime,accomplishByTime,completedTime){

    const todoInfo = document.createElement('div');

    todoInfo.classList.add('td-info');

    const createdDisplay = createDateTimeDisplayComponent('created',HTML_ENTITY.ARROW_DOWN_RIGHT,createdTime);

    const accomplishByDisplay = createDateTimeDisplayComponent('accomplishby', HTML_ENTITY.PENCIL_UPPER_RIGHT, accomplishByTime);

    const completedDisplay = createDateTimeDisplayComponent('completed', HTML_ENTITY.CHECKMARK_WRITTEN,completedTime);


    todoInfo.append(createdDisplay,accomplishByDisplay,completedDisplay);


    return todoInfo;
};

function createDateTimeDisplayComponent(name,content,time){

    const span = document.createElement('span');

    span.classList.add(`td-${name}-datetime-label`);

    span.innerHTML = content;


    const display = document.createElement('span');

    display.setAttribute('data-todo-display', `${name}-datetime`);

    display.classList.add(`td-${name}-datetime`);

    

    if(time) display.textContent = formatTodoTime(time);

    span.appendChild(display);

    return span;
};