import { notify } from "../controller/notification_controller.js";
import { AltyLocalStorage } from "../databases/local_storage_database.js";
import { parseTimestamp } from "../utilities.js";


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

    const now = Date.now().toString()

    AltyLocalStorage.updateItems('profile',{ 

        name: profileName,
        createdTimestamp:  now,
        modifiedTimestamp: now
        
    });

    document.querySelector('.profile-created').textContent = parseTimestamp(now,'datetime');

    document.querySelector('#main .profile-name').textContent = profileName + ',';

    document.querySelector('#main .page-header>p:nth-child(3)').textContent = 'Oh nice. You added a name. :-)';

    document.querySelector('#main .page-header>p:nth-child(4)').textContent = 'Thank you.'

    notify('Profile updated');
    
};

function handleAddingNameToPage(event){

    event.preventDefault();

    const { target } = event;

    [...document.querySelectorAll('.profile-name')].forEach( element =>{

        element.textContent = target.value;

    });

};

