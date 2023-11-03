import { limitSentenceLength } from "../utilities_client.js";



export function confirmSelection(title,message,question,callback,sentenceLength = 50){

    const lastActiveElement = document.activeElement;

    const dialogConfirm = document.querySelector('.js-todo-dialog-confirm');

    const dialogTitle = dialogConfirm.querySelector('.js-todo-dialog-confirm-title');

    const dialogMessage = dialogConfirm.querySelector('.js-todo-dialog-confirm-message');

    const dialogQuestion = dialogConfirm.querySelector('.js-todo-dialog-confirm-question');

    const dialogConfirmButton = dialogConfirm.querySelector('.js-todo-dialog-confirm-btn');

    const dialogCancelButton = dialogConfirm.querySelector('.js-todo-dialog-cancel-btn');


    function handleConfirmMenuKeydownEvents(keydownEvent){

        const { key, shiftKey } = keydownEvent;


        if(key && key === 'Tab' && !shiftKey){

            if(document.activeElement === dialogCancelButton){

                keydownEvent.preventDefault();

                dialogConfirmButton.focus();
            }
        }
        if(key && key === 'Tab' && shiftKey){

            if(document.activeElement === dialogConfirmButton){

                keydownEvent.preventDefault();

                dialogCancelButton.focus();

            }
        } 
    }

    dialogConfirm.addEventListener('keydown', handleConfirmMenuKeydownEvents);
    

    dialogTitle.textContent = title;

    dialogMessage.textContent = `"${limitSentenceLength(message,sentenceLength)}"`;

    dialogQuestion.textContent = question;


    function handleDialogConfirm(clickEvent){

        dialogConfirm.classList.toggle('open');

        dialogTitle.textContent = "";

        dialogMessage.textContent = "";

        dialogQuestion.textContent = "";

        if(callback) callback();

        clickEvent.target.removeEventListener('click', handleDialogConfirm);

        dialogCancelButton.removeEventListener('click', handleDialogCancel);

        document.body.style.overflow = 'hidden';

        lastActiveElement.focus();

    };


    function handleDialogCancel(clickEvent){

        clickEvent.preventDefault();

        dialogConfirm.classList.toggle('open');

        dialogTitle.textContent = "";

        dialogMessage.textContent ="";

        dialogQuestion.textContent = "";

        clickEvent.target.removeEventListener('click', handleDialogCancel);

        dialogConfirmButton.removeEventListener('click', handleDialogConfirm);

        document.body.style.overflow = 'auto';

        lastActiveElement.focus();

    };

    dialogCancelButton.addEventListener('click', handleDialogCancel);

    dialogConfirmButton.addEventListener('click', handleDialogConfirm);

    dialogConfirm.classList.toggle('open');


    dialogCancelButton.focus();

    document.body.style.overflow = 'hidden';

};