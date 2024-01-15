

export function notify(message,type){

    const notification = document.querySelector('.notification');

    if(!notification) return;

    if(type) notification.classList.add(type);

    if(notification.classList.contains('open')){

        notification.classList.remove('open');

        notification.classList.remove('appear');
    }


    notification.querySelector('.notification-message').textContent = message;

    notification.querySelector('.notification-close-btn').addEventListener('click', closeNotification);

    openNotification(notification);

    setTimeout( ()=>{

        if(notification.classList.contains('appear')){

            closeNotification(notification);

        }

    },3000);

};


function openNotification(notification){

    notification.classList.add('open');

    setTimeout( ()=>{

        notification.classList.add('appear');

    },100);

};

function closeNotification(notification){

    if(notification instanceof Event && notification.target instanceof HTMLElement){

        notification = notification.target.parentElement.parentElement;
    }

    notification.classList.remove('appear');

        
    setTimeout( ()=>{

        notification.classList.remove('open');

        notification.querySelector('.notification-message').textContent = '';

    },500);

};