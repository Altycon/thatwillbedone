import { parseTimestamp } from "../utilities.js";

export function createTodoComponent(id,description,createdTimestamp,completedTimestamp,goalTimestamp){

    const component = document.createElement('li');

    component.classList.add('todo-item');

    if(completedTimestamp){

        component.classList.add('completed');
    }

    component.setAttribute('data-key', id);
    

    const todoDescription = document.createElement('p');

    todoDescription.classList.add('todo-item-description');

    todoDescription.textContent = description;


    const noteControls = buldTodoControls();

    const dateTime = buildTodoDatetimeDisplay(createdTimestamp,completedTimestamp,goalTimestamp);

    component.append(todoDescription,noteControls,dateTime);

    return component;

};


function buldTodoControls(){

    const div = document.createElement('div');

    div.classList.add('todo-item-controls');

    div.append(

        buildTodoButton('delete','button',`&#128465`),
        buildTodoButton('edit','button',`&#9998;`),
        buildTodoButton('completed','button',`&#10003;`),
        buildTodoButton('save','button',`&#128190;`),
        buildTodoButton('datetime','button',`&#128197;`),
        buildTodoButton('cancel','button',`&#10007;`),

    );

    return div;
};

function buildTodoDatetimeDisplay(createdTimestamp,completedTimestamp,goalTimestamp){
     
    const div = document.createElement('div');

    div.classList.add('todo-item-datetime');

    div.append(

        buildTodoDatetime('created',createdTimestamp,'NA'),
        buildTodoDatetime('completed',completedTimestamp,'Not completed'),
        buildTodoDatetime('goal',goalTimestamp,'No goal')
    )

    return div;
};

function buildTodoButton(name,type,innerhtml){

    const button = document.createElement('button');

    button.setAttribute('type', type);

    button.classList.add('btn',`todo-item-${name}-btn`,'entity');

    button.setAttribute('data-button', name);

    button.innerHTML = innerhtml;

    return button;
};

function buildTodoDatetime(name,timestamp,fallback){

    const p = document.createElement('p');

    p.classList.add(`todo-${name}-datetime`);

    p.innerHTML = `${name}:&nbsp;<span>${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;

    return p;

};