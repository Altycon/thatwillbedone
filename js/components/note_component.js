import { parseTimestamp } from "../utilities.js";

export function createNoteComponent(id,description,createdTimestamp,modifiedTimestamp){

    const component = document.createElement('li');

    component.classList.add('note-item');

    component.setAttribute('data-key', id);
    

    const noteDescription = document.createElement('p');

    noteDescription.classList.add('note-item-description');

    noteDescription.textContent = description;


    const noteControls = buldNoteControls();

    const dateTime = buildNoteDatetime(createdTimestamp,modifiedTimestamp);

    component.append(noteDescription,noteControls,dateTime);

    return component;

};

function buldNoteControls(){

    const div = document.createElement('div');

    div.classList.add('note-item-controls');

    div.append(

        buildNoteButton('edit','button',`&#9998;`),
        buildNoteButton('delete','button',`&#128465;`),
        buildNoteButton('cancel','button',`&#10007;`),
        buildNoteButton('save','button',`&#128190;`),

    );

    return div;
};

function buildNoteDatetime(createdTimestamp,modifiedTimestamp){
     
    const div = document.createElement('div');

    div.classList.add('note-item-datetime');


    const createdTimestampDisplay = document.createElement('p');

    createdTimestampDisplay.classList.add('note-created-datetime');

    createdTimestampDisplay.innerHTML = `Created:&nbsp;<span>${parseTimestamp(createdTimestamp,'timedate')}</span>`;


    div.appendChild(createdTimestampDisplay);


   
    const modifiedTimestampDisplay = document.createElement('p');

    modifiedTimestampDisplay.classList.add('note-modified-datetime');

    modifiedTimestampDisplay.innerHTML = `Modified:&nbsp;

        <span>${+modifiedTimestamp === +createdTimestamp ? 'Not modified':parseTimestamp(modifiedTimestamp,'timedate')}</span>`;
    
    div.appendChild(modifiedTimestampDisplay);

    

    return div;
};

function buildNoteButton(name,type,innerhtml){

    const button = document.createElement('button');

    button.setAttribute('type', type);

    button.classList.add('btn',`note-item-${name}-btn`,'entity');

    button.setAttribute('data-button', name);

    button.innerHTML = innerhtml;

    return button;
};