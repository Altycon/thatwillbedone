import { parseTimestamp } from "../utilities.js";

export function createTodoComponent(id,description,createdTimestamp,completedTimestamp,goalTimestamp){

    const goalControlId = 'G' + (Math.floor(Math.random()*100000).toString());

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
        
        buildTodoHeader(goalControlId),
        todoDescription,
        buildTodoDatetimeDisplay(createdTimestamp,completedTimestamp,goalTimestamp,goalControlId)
    );

    return component;

};

function buildTodoHeader(goalControlId){

    const header = document.createElement('header');

    header.classList.add('todo-item-header');

    header.append(

        buildTodoControls(goalControlId),
        buildTodoButton('completed','button',`&#10003;`),
    )

    return header;
}


function buildTodoControls(goalControlId){

    const div = document.createElement('div');

    div.classList.add('todo-item-controls');

    const editControls = document.createElement('div');

    editControls.classList.add('todo-item-edit-controls');

    editControls.append(

        buildTodoButton('cancel','button',`cancel`),
        buildTodoButton('datetime','button',`goal`,goalControlId),
        buildTodoButton('delete','button',`delete`),
        buildTodoButton('save','button',`save`),
        
    )

    div.append( 
        buildTodoButton('edit','button',`&#8230;`),
        editControls
      
    );

    

    return div;
};

function buildTodoDatetimeDisplay(createdTimestamp,completedTimestamp,goalTimestamp,goalControlId){
     
    const div = document.createElement('div');

    div.classList.add('todo-item-datetime');

    div.append(

        buildTodoDatetime('created',createdTimestamp,'NA'),
        buildTodoDatetime('completed',completedTimestamp,'Not completed'),
        buildTodoDatetime('goal',goalTimestamp,'No goal',goalControlId)
    )

    return div;
};

function buildTodoButton(name,type,innerhtml,goalControlId){

    const button = document.createElement('button');

    button.setAttribute('type', type);

    button.classList.add('btn',`todo-item-${name}-btn`);

    button.setAttribute('data-button', name);

    if(goalControlId) button.setAttribute('data-goal-control', goalControlId);

    button.innerHTML = innerhtml;

    return button;
};

function buildTodoDatetime(name,timestamp,fallback,goalControlId){

    let label = name;

    const p = document.createElement('p');

    p.classList.add(`todo-${name}-datetime`);

    if(name === 'created') label = 'Made';

    if(name === 'modified') label = 'Changed';

    if(goalControlId){

        p.innerHTML = `${label}:&nbsp;<span data-timestamp="${timestamp}" data-goal-connect="${goalControlId}">${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;


    }else{

        p.innerHTML = `${label}:&nbsp;<span>${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;

    }

    return p;

};