

export function todoNotify(message){

    const notification = document.querySelector('.js-notification');


    const messageDisplay = notification.querySelector('.js-notification-message');

    const closeButton = notification.querySelector('.js-notification-close-btn');


    messageDisplay.textContent = message;


    function closeNotification(event){

        notification.classList.toggle('open');


        event.target.removeEventListener('click', closeNotification);

        
    };


    closeButton.addEventListener('click', closeNotification);

    notification.classList.toggle('open');


    setTimeout(()=>{

        if(notification.classList.contains('open')){

            notification.classList.remove('open');

            closeButton.removeEventListener('click', closeNotification);

        }

    },4000)
}