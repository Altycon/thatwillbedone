
import { listenToProfileForm } from "../forms/profile_form.js";
import { parseTimestamp } from "../utilities.js";



export function profileController(){

    listenToProfileForm();

};

export function addProfileDataToSite(name,createdTimestamp){

    console.log(createdTimestamp);

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
