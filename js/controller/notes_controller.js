import { createNoteComponent } from "../components/note_component.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { parseTimestamp } from "../utilities.js";
import { addToSiteState, deleteFromSiteState } from "./state_controller.js";


function handleNoteDescriptionKeydown(event){

    const { key, shiftkey } = event;

    if(key === 'Enter' && !shiftkey){

        const li = event.target.closest('li');

        updateNote(li);

        stopEditingNote(li);
    }
};


function startEditingNote(li){

    if(li.classList.contains('edit')) return;

    li.classList.add('edit');

    const description = li.querySelector('.note-item-description');

    description.contentEditable = true;

    description.addEventListener('keydown', handleNoteDescriptionKeydown);

    //description.focus();

    //addToSiteState('originalNote',description.innerText.trim());

};

function updateNote(li){

    const key = li.getAttribute('data-key');

    if(!key) return;
    
    // I think I should compare old to new descriptions if its changed...
    const descriptionElement = li.querySelector('.note-item-description');

    if(descriptionElement){

        const text = descriptionElement.innerText.trim();

        if(text !== '' && text !== ' '){

            const now = Date.now().toString();

            const newNote = {

                id: key,
                description: text,
                modifiedTimestamp: now

            };

            li.querySelector(`.note-modified-datetime span`).textContent = parseTimestamp(now,'timedate');

            AltyIDB.update('note', newNote);

        }else{

            deleteNote(li,li.closest('ul'));

        }
    }  
};

function stopEditingNote(li){

    if(!li.classList.contains('edit')) return;

    const description = li.querySelector('.note-item-description');

    description.contentEditable = false;

    li.classList.remove('edit');

    description.removeEventListener('click', handleNoteDescriptionKeydown);

    if(document.activeElement === description) description.blur();

    //deleteFromSiteState('originalNote');

};

function deleteNote(li,notesList){

    if(confirm('Are you sure you want to delete this note?')){

        AltyIDB.deleteData('note', li.getAttribute('data-key'), (data)=>{

            notesList.removeChild(li);

        })
    }
};


function handleNoteButtons(target,notesList){

    const button = target.dataset.button;

    const li = target.closest('li');


    switch(button){

        case 'edit': 
    
            startEditingNote(li);

        break;

        case 'cancel':

            stopEditingNote(li);

        break;

        case 'save':

            updateNote(li);

            stopEditingNote(li);
        
        break;

        case 'delete':

            deleteNote(li,notesList)
        
        break;
    }
};

export function notesController(){

    const noteList = document.querySelector('.note-list');

    noteList.addEventListener('click', (event)=>{

        if(!event) return;

        const { currentTarget, target } = event;

        if(target.dataset.button){

            handleNoteButtons(target,currentTarget);
        }

    })

};

export function buildNoteList(data){

    if(!data || data.length < 1) return;

    const noteList = document.querySelector('.note-list');

    while(noteList.lastChild){

        noteList.removeChild(noteList.lastChild);
    }

    const df = new DocumentFragment();

    data.sort( (a,b) => +b.createdTimestamp - +a.createdTimestamp).forEach( note => {
    
        df.appendChild(

            createNoteComponent(
                note.id,
                note.description,
                note.createdTimestamp,
                note.modifiedTimestamp
            )
        );
    });

    noteList.appendChild(df);

};