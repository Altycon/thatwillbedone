import { parseTimestamp } from "../utilities.js";

export function createNoteComponent(id,description,createdTimestamp,modifiedTimestamp){

    const component = document.createElement('li');

    component.classList.add('note-item');

    component.setAttribute('data-key', id);
    

    const noteDescription = document.createElement('p');

    noteDescription.classList.add('note-item-description');

    noteDescription.textContent = description;

    component.append(
        
        buildNoteHeader(),
        noteDescription,
        buildNoteDatetimeDisplay(createdTimestamp,modifiedTimestamp)

    );

    return component;

};

function buildNoteHeader(){

    const header = document.createElement('header');

    header.classList.add('note-item-header');

    header.append(

        buildNoteControls()
    );

    return header;

};

function buildNoteControls(){

    const div = document.createElement('div');

    div.classList.add('note-item-controls');

    const editControls = document.createElement('div');

    editControls.classList.add('note-item-edit-controls');

    editControls.append(

        buildNoteButton('cancel','button',`cancel`),  
        buildNoteButton('save','button',`save`),
        buildNoteButton('delete','button',`delete`)

    );

    div.append(
        buildNoteButton('edit','button',`&#8230;`),
        editControls
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

    button.classList.add('btn',`note-item-${name}-btn`);

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