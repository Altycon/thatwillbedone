
import { closeControlConnection } from "./connection_controller.js";
import { pageRouter, resetPages } from "./page_controller.js";
import { handleUrlState } from "./state_controller.js";

export function handleNavigationRouting(){

    const url = new URL(window.location.href);

    const hash = url.hash.substring(1);
    

    resetNavigationLinks();

    resetPages();

    pageRouter(hash);

    handleUrlState(hash, url);


};

export function navigateToPage(hash){

   const hostURl = `https://altycon.github.io`;

    //const hostURl = `http://127.0.0.1:5500`;

    const newUrl =  new URL(hostURl);

    newUrl.pathname = '/thatwillbedone';
    
    newUrl.hash = hash.substring(1);

    history.pushState(null,null,newUrl.href);

    handleNavigationRouting();
};

export function listenToNavigationLinks(){

    [...document.querySelectorAll('[data-nav-link]')].forEach( (navLink,i,navLinks) => {

         navLink.addEventListener('click', (event)=> {

            event.preventDefault();

            if(navLink.classList.contains('active')) return;

            navLinks.forEach( link => {

                if(link.parentElement.classList.contains('active')){

                    link.parentElement.classList.remove('active');

                    link.classList.remove('active');
                }
            })

            navLink.classList.add('active');

            navigateToPage(event.target.getAttribute('href'));



            [...document.querySelectorAll('[data-control]')].forEach( button => {

                if(button.classList.contains('active')){

                    closeControlConnection(document.querySelector(`[data-connect="${button.dataset.control}"]`));

                    button.classList.remove('active');
                }
            })
            
        });
    });

};


function hasQueryParameters(url){

    return url.search.indexOf('?') !== -1;
};

function resetNavigationLinks(){

    [...document.querySelectorAll('[data-nav-link]')].forEach( link => {

        if(link.parentElement.classList.contains('active')){

            link.parentElement.classList.remove('active');

        }

    });
};




