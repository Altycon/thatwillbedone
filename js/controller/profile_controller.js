import { AltyLocalStorage } from "../databases/local_storage_database.js";



export function profileController(){

    const profileForm = document.querySelector('.profile-form');

    profileForm.addEventListener('submit', handleProfileInformationSave);

    profileForm.querySelector('input[name=name]').addEventListener('input', handleAddingNameToPage);

};

function handleProfileInformationSave(event){

    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const profileName = formData.get('name');

    console.log(profileName)

    if(!profileName || profileName === '' || profileName === ' ') return;

    AltyLocalStorage.updateItem('profile','name', profileName);
    
};

function handleAddingNameToPage(event){

    event.preventDefault();

    const { target } = event;

    addDataToProfilePage(target.value)

};

export function addDataToProfilePage(name){

    const profileName = [...document.querySelectorAll('.profile-name')];

    profileName.forEach( element => element.textContent = name);

};