
import { checkAndLoadAppData, listenToAppControls } from "./controller/app_controller.js";
import { handleNavigationRouting, listenToNavigationLinks, navigateToPage } from "./controller/navigation_controller.js";
import { notify } from "./controller/notification_controller.js";



function initializeSite(){

    checkAndLoadAppData();

    listenToNavigationLinks();

    listenToAppControls();

    navigateToPage(window.location.hash || '#main');


    window.addEventListener('popstate', handleNavigationRouting);

    window.addEventListener('error', (ev)=>{

        notify(ev.message);

    });

};

initializeSite();
