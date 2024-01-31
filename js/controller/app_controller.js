import { AltyIDB } from "../databases/local_index_database.js";
import { AltyLocalStorage } from "../databases/local_storage_database.js";
import { addProfileDataToSite } from "../controller/profile_controller.js";

import { listenToConnectionControls } from "./connection_controller.js";
import { buildListGroups } from "./list_controller.js";
import { buildNoteList } from "./notes_controller.js";

import { buildTodoList } from "./todo_controller.js";
import { applySettingsDataToSite } from "./settings_controller.js";


export function appController(){

    checkAndLoadAppData();

    listenToAppControls();
}

function listenToAppControls(){

    listenToConnectionControls(document.querySelector('.header-primary'));

};

export function checkAndLoadAppData(){


    if(window.localStorage){

        AltyLocalStorage.initialize()

        const profileData = AltyLocalStorage.getCategory('profile');

        addProfileDataToSite(
            profileData.name,
            profileData.createdTimestamp
        );

        const settingsData = AltyLocalStorage.getCategory('settings');

        applySettingsDataToSite(
            settingsData.theme,
            settingsData.textType
        );
        
    }

    if(window.indexedDB){

        AltyIDB.initialize('TWBD',1, { keyPath: 'id' },['todo','note','list']);

        AltyIDB.getAll('todo', (todoData)=> {

            buildTodoList(todoData);
            
        });

        AltyIDB.getAll('note', (noteData)=> {
                
            buildNoteList(noteData);

        });

        AltyIDB.getAll('list', (listData)=> {
            
            buildListGroups(listData);

        });

    }
};

export function handleBeginningUser(){


    function handleDatabaseIntialize(event){

        checkAndLoadAppData();

        listenToAppControls();

        event.target.removeEventListener('click', handleDatabaseIntialize);

        document.querySelector('.main .page-content').removeChild(
            document.querySelector('.welcome')
        )
    };

    const welcome = document.createElement('div');
    welcome.classList.add('welcome');

    welcome.innerHTML = 
        `<p><strong>thatwillbedone</strong>a simple web application for your lists, basic notes, and to-do's.</p>
        <p>No data is sent online.</p>
        <p>Everything is saved in your browser.</p>
        <p>* Deleting your cache will delete all data for this website.</p>

        <button type="button" class="initialize-database-btn">By Pressing this button, your information can be saved.</button>`;

    document.querySelector('.main .page-content').appendChild(welcome);

    document.querySelector('.initialize-database-btn').addEventListener('click', handleDatabaseIntialize);

}

