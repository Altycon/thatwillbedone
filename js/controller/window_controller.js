import { handleNavigationRouting } from "./navigation_controller.js";
import { notify } from "./notification_controller.js";


export function windowController(window){

    window.addEventListener('popstate', handleNavigationRouting);

    window.addEventListener('error', (ev)=>{

        notify(ev.message,'error');

    });

    if ('visualViewport' in window) {

        const ViewportVsClientHieghtRatio = 0.75;

        const footerPrimary = document.querySelector('.footer-primary')

        window.visualViewport.addEventListener('resize', function (event) {

            if ((event.target.height * event.target.scale) / window.screen.height <

            ViewportVsClientHieghtRatio){
                
                footerPrimary.classList.add('hide');

                return;

            }

            if(footerPrimary.classList.contains('hide')) footerPrimary.classList.remove('hide');
        });
    };

};