
import { appController, handleBeginningUser } from "./controller/app_controller.js";
import { listenToNavigationLinks, navigateToPage } from "./controller/navigation_controller.js";
import { windowController } from "./controller/window_controller.js";




function initializeSite(){


    if(!window.localStorage.getItem('TWBD')){

        handleBeginningUser();
        
    }else{

        appController();

    }
  

    listenToNavigationLinks();

    navigateToPage(window.location.hash || '#main');

    windowController(window);

    
};

initializeSite();