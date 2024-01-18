import { parseTimestamp } from "../utilities.js";

export function createNoteComponent(id,description,createdTimestamp,modifiedTimestamp){

    const component = document.createElement('li');

    component.classList.add('note-item');

    component.setAttribute('data-key', id);
    

    const noteDescription = document.createElement('p');

    noteDescription.classList.add('note-item-description');

    noteDescription.textContent = description;

    component.append(
        
        noteDescription,
        buldNoteControls(),
        buildNoteDatetimeDisplay(createdTimestamp,modifiedTimestamp)

    );

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


function buildNoteDatetimeDisplay(createdTimestamp,modifiedTimestamp){

    const div = document.createElement('div');

    div.classList.add('note-item-datetime');

    div.append(

        buildNoteDatetime('created',createdTimestamp,'Not created'),
        buildNoteDatetime('modified',modifiedTimestamp,'Not modified')

    );

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

function buildNoteDatetime(name,timestamp,fallback){

    let label = name;

    const p = document.createElement('p');

    if(name === 'created') label = 'Made';

    if(name === 'modified') label = 'Changed';

    p.classList.add(`note-${name}-datetime`);

    p.innerHTML = `${label}:&nbsp;<span>${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;

    return p;

};