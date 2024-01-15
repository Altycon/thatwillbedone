

export function confirmSelection(message,callback){

    // open a html dialop/popup window
    // make sure there is a confirm and cancel button

    const confirmationModal = document.querySelector('.confirmation-modal');

    const messageOutput = confirmationModal.querySelector('.confirmation-message');


    messageOutput.textContent = message;


    confirmationModal.addEventListener('click', function handleConfirmationClickEvent(event){

        const { currentTarget, target } = event;
    
        if(!target.dataset.button) return;

        event.preventDefault();
    
        switch(target.dataset.button){
    
            case 'cancel':
    
                closeConfirmationModal(currentTarget);

            break;
    
            case 'confirm':
    
                callback(currentTarget);

                closeConfirmationModal(currentTarget);
    
            break;

            default:

                closeConfirmationModal(currentTarget);

            break;
        }

        currentTarget.removeEventListener('click', handleConfirmationClickEvent);
    });

    openConfirmationModal(confirmationModal);

};

function closeConfirmationModal(confirmationModal){

    confirmationModal.classList.remove('appear');

    setTimeout( ()=> {

        confirmationModal.classList.remove('open');

    },300);
};

function openConfirmationModal(confirmationModal){

    confirmationModal.classList.add('open');

    setTimeout( ()=> {

        confirmationModal.classList.add('appear');

        confirmationModal.querySelector('.confirmation-cancel-btn').focus();

    },100)
};

