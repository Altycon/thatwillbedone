
import { AltyIDB } from "../databases/local_index_database.js";
import { AltyLocalStorage } from "../databases/local_storage_database.js";
import { listenToProfileForm } from "../forms/profile_form.js";
import { parseTimestamp } from "../utilities.js";
import { confirmSelection } from "./confirm_selection_controller.js";
import { notify } from "./notification_controller.js";



export function profileController(){

    listenToProfileForm();

    document.querySelector('.profile-delete-information-btn').addEventListener('click', deleteProfileInformation)

};

export function addProfileDataToSite(name,createdTimestamp){

    [...document.querySelectorAll('.profile-name')].forEach( element =>{

        if(element.nodeName === 'H2'){

            element.textContent = name + ',';

        }else{

            element.textContent = name;

        }
    });

    document.querySelector('.profile-created').textContent = parseTimestamp(createdTimestamp,'datetime');

    console.log('Profile data added to site');

};

function deleteProfileInformation(event){

    event.preventDefault();

    confirmSelection('This cannot be undone. Are you sure?', ()=> {

        AltyIDB.deleteDatabaseAndStores();

        AltyLocalStorage.deleteLocalStorage();

        addProfileDataToSite('Today', Date.now().toString());

        notify('Information deleted. Please reload page or leave.');

    })
};

