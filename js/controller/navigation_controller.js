
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

    // const baseUrl = '127.0.0.1:5500'; //'https://altycon.github.io/thatwillbedone/';

    // const url = baseUrl + (hash.startsWith('/') ? hash.substring(1): hash);

    const newUrl =  new URL(`https://altycon.github.io/thatwillbedone`).hash = hash;  //new URL(`https://127.0.0.1:5500`).hash = hash;

    history.pushState(null,null,newUrl);

    handleNavigationRouting();
};

export function listenToNavigationLinks(){

    [...document.querySelectorAll('[data-nav-link]')].forEach( navLink => {

         navLink.addEventListener('click', (event)=> {

            if(navLink.classList.contains('active')) return;

            event.preventDefault();

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




