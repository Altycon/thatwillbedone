
import { confirmSelection } from "./controllers/confirmation_controller.js";
import { handleNavigationPrimary } from "./controllers/navigation_primary_controller.js";
import { todoNotify } from "./controllers/notification_controller.js";
import { listenToNewTodoForm } from "./controllers/todo_form_controller.js";
import { AltyStorage } from "./local_database/local-storage.js";

import { animateComponentsOnLoad, isMobileDevice, setDocumentMobileBoolean } from "./utilities_client.js";

function initializeSite(){

    
    

    if(AltyStorage.getStore('temp-todo').length > 0) AltyStorage.deleteStore('temp-todo');

    // confirmSelection('You are here now!', 'Your choices, stay or leave.', 'Your choice?', ()=>{

    //     todoNotify('Welcome to that will be done.');

    // });

    setDocumentMobileBoolean(document.body);
    
    handleNavigationPrimary();

    window.addEventListener('popstate', handleNavigationPrimary);



    animateComponentsOnLoad('.td-item','--todoInsertAnimationDelay', 500);
    
    animateComponentsOnLoad('.td-common-item', '--commonItemAppearAnimationDelay', 500, 100);

};

initializeSite();