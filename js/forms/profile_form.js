import { notify } from "../controller/notification_controller.js";
import { AltyLocalStorage } from "../databases/local_storage_database.js";


export function listenToProfileForm(){

    const profileForm = document.querySelector('.profile-form');

    profileForm.addEventListener('submit', handleProfileInformationSave);

    profileForm.querySelector('input[name=name]').addEventListener('input', handleAddingNameToPage);
}


function handleProfileInformationSave(event){

    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const profileName = formData.get('name');

    if(!profileName || profileName === '' || profileName === ' ') return;

    AltyLocalStorage.updateItems('profile',{ 

        name: profileName, 
        modifiedTimestamp: Date.now().toString()
        
    });

    document.querySelector('#main .profile-name').textContent = profileName + ',';

    document.querySelector('#main .page-header>p:nth-child(3)').textContent = 'Oh nice. You added a name. :-)';

    document.querySelector('#main .page-header>p:nth-child(3)').textContent = 'Thank you.'

    notify('Profile updated');
    
};

function handleAddingNameToPage(event){

    event.preventDefault();

    const { target } = event;

    [...document.querySelectorAll('.profile-name')].forEach( element =>{

        element.textContent = target.value;

    });

};

