import { AltyIDB } from "../databases/local_index_database.js";
import { listenToConnectionControls } from "./connection_controller.js";
import { buildListGroups } from "./list_controller.js";
import { buildNoteList } from "./notes_controller.js";
import { notify } from "./notification_controller.js";
import { buildTodoList } from "./todo_controller.js";


export function listenToAppControls(){

    listenToConnectionControls(document.querySelector('.header-primary'));

    listenToConnectionControls(document.querySelector('.footer-primary'));

};

export function checkAndLoadAppData(){

    if(window.indexedDB){

        AltyIDB.initialize('TWBD',1, { keyPath: 'id' },['todo','note','list']);


        AltyIDB.getAll('todo', (todoData)=> {

            buildTodoList(todoData);

            AltyIDB.getAll('note', (noteData)=> {
                
                buildNoteList(noteData);

                AltyIDB.getAll('list', (listData)=> {
                
                    buildListGroups(listData);

                }, ()=> notify('Data loaded.'));
    
            });
        });

    }
}