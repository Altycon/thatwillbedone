import { AltyIDB } from "../databases/local_index_database.js";
import { AltyLocalStorage } from "../databases/local_storage_database.js";
import { addProfileDataToSite } from "../controller/profile_controller.js";

import { listenToConnectionControls } from "./connection_controller.js";
import { buildListGroups } from "./list_controller.js";
import { buildNoteList } from "./notes_controller.js";

import { buildTodoList } from "./todo_controller.js";
import { applySettingsDataToSite } from "./settings_controller.js";


export function appController(){

    listenToAppControls();
}

function listenToAppControls(){

    listenToConnectionControls(document.querySelector('.header-primary'));

    //listenToConnectionControls(document.querySelector('.footer-primary'));

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
}