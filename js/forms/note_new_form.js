import { createNoteComponent } from "../components/note_component.js";
import { notify } from "../controller/notification_controller.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { clearChildElements, createTWBDId } from "../utilities.js";


export function listenToNoteForm(){


    const form = document.querySelector(`.new-note-form`);

    const textarea = form.querySelector('textarea');

    const formControl = document.querySelector(`[data-control="${form.dataset.connect}"]`);


    formControl.addEventListener('click', stopListeningToNoteForm);

    form.addEventListener('submit', handleNoteFormSubmit);

    textarea.addEventListener('keydown', handleKeydown);


    textarea.innerText = '';
    
    textarea.focus();
};

function stopListeningToNoteForm(event){

    const form = document.querySelector(`.new-note-form`);

    form.removeEventListener('submit', handleNoteFormSubmit);

    form.querySelector('textarea').removeEventListener('keydown', handleKeydown);

    event.target.removeEventListener('click', stopListeningToNoteForm);

};

function handleKeydown(event){

    const { key, shiftkey } = event;

        if(key === 'Enter' && !shiftkey){

            event.preventDefault();

            event.target.closest('form').querySelector('button[type="submit"]').click();
        }
};

function handleNoteFormSubmit(event){

    event.preventDefault();

    const data = new FormData(event.target);

    const description = data.get('note').trim();

    if(!description) return;

    const now = Date.now().toString();

    const note = {
        id: createTWBDId('N'),
        description: description,
        createdTimestamp: now,
        modifiedTimestamp: now
    };

    AltyIDB.add('note', note, ()=>{
        
        const component = createNoteComponent(
            note.id,
            note.description,
            note.createdTimestamp,
            note.modifiedTimestamp
        );

        component.classList.add('hiding');

        const noteList = document.querySelector('.note-list');

        if(noteList.querySelector('.no-content')){

            clearChildElements(noteList);
        }

        noteList.insertBefore(component,noteList.firstChild);

        const noteFormControl = document.querySelector(`[data-control="note-form"]`);

        noteFormControl.addEventListener('click', function unhideNote(event){

            setTimeout(() => {

                component.classList.remove('hiding');
                
            },300);

            event.target.removeEventListener('click', unhideNote);
        });
        noteFormControl.click();

        resetNoteForm(event.target);

        notify('Successfully added note.')

    });

};

function resetNoteForm(form){

    form.reset();

    const textarea = form.querySelector('textarea');

    textarea.innerText = '';

    if(document.activeElement === textarea) return;
    
    else textarea.focus();
};