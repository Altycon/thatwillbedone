import { createNoteComponent } from "../components/note_component.js";
import { notify } from "../controller/notification_controller.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { clearChildElements, createTWBDId } from "../utilities.js";


export function listenToNoteForm(){


    const form = document.querySelector(`.new-note-form`);

    const textarea = form.querySelector('textarea');

    textarea.innerText = '';

    const formControl = document.querySelector(`[data-control="${form.dataset.connect}"]`);


    function handleNoteFormSubmit(ev){

        ev.preventDefault();
    
        const data = new FormData(ev.target);
    
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
    
            const noteList = document.querySelector('.note-list');

            if(noteList.querySelector('.no-content')){

                clearChildElements(noteList);
            }
    
            noteList.insertBefore(component,noteList.firstChild);
    
            resetNoteForm(ev.target);

            notify('Successfully added note.')

        });
    
    };

    function handleKeydown(event){

        const { key, shiftkey } = event;

            if(key === 'Enter' && !shiftkey){

                event.preventDefault();

                form.querySelector('button[type="submit"]').click();
            }
    };

    function stopListeningToNoteForm(ev){

        form.removeEventListener('submit', handleNoteFormSubmit);

        textarea.removeEventListener('keydown', handleKeydown)

        ev.target.removeEventListener('click', stopListeningToNoteForm);

    }

    formControl.addEventListener('click', stopListeningToNoteForm);

    form.addEventListener('submit', handleNoteFormSubmit);

    textarea.addEventListener('keydown', handleKeydown);
    
    textarea.focus();
};



function resetNoteForm(form){

    form.reset();

    const textarea = form.querySelector('textarea');

    textarea.innerText = '';

    if(document.activeElement === textarea) return;
    
    else textarea.focus();
};