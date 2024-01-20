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

    component.append(
        
        buildTodoHeader(),
        todoDescription,
        buildTodoDatetimeDisplay(createdTimestamp,completedTimestamp,goalTimestamp)
    );

    return component;

};

function buildTodoHeader(){

    const header = document.createElement('header');

    header.classList.add('todo-item-header');

    header.append(

        buildTodoControls(),
        buildTodoButton('completed','button',`&#10003;`),
    )

    return header;
}


function buildTodoControls(){

    const div = document.createElement('div');

    div.classList.add('todo-item-controls');

    const editControls = document.createElement('div');

    editControls.classList.add('todo-item-edit-controls');

    editControls.append(

        buildTodoButton('cancel','button',`cancel`),
        buildTodoButton('datetime','button',`goal`),
        buildTodoButton('delete','button',`delete`),
        buildTodoButton('save','button',`save`),
        
    )

    div.append( 
        buildTodoButton('edit','button',`&#8230;`),
        editControls
      
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

    button.classList.add('btn',`todo-item-${name}-btn`);

    button.setAttribute('data-button', name);

    button.innerHTML = innerhtml;

    return button;
};

function buildTodoDatetime(name,timestamp,fallback){

    let label = name;

    const p = document.createElement('p');

    p.classList.add(`todo-${name}-datetime`);

    if(name === 'created') label = 'Made';

    if(name === 'modified') label = 'Changed';

    p.innerHTML = `${label}:&nbsp;<span>${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;

    return p;

};