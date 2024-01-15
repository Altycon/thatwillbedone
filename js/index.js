
import { checkAndLoadAppData, listenToAppControls } from "./controller/app_controller.js";
import { listenToNavigationLinks, navigateToPage } from "./controller/navigation_controller.js";
import { windowController } from "./controller/window_controller.js";



function initializeSite(){

    checkAndLoadAppData();

    listenToNavigationLinks();

    listenToAppControls();

    navigateToPage(window.location.hash || '#main');

    windowController(window);
    
};

initializeSite();