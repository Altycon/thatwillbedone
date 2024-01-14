import { listenToNoteForm } from "../forms/note_new_form.js";
import { openControlConnection } from "./connection_controller.js";
import { Stopwatch, stopwatchElements } from "./stopwatch_controller.js";
import { Timer, timerElements } from "./timer_controller.js";


export function setSiteState(url){
    
    history.replaceState(null,null,url);

};

export function getSiteState(props){

    const stateObject = {}

    const url = (new URL(window.location.href));

    props.forEach( prop => {

        const query = url.searchParams.get(prop);

        if(query){

            stateObject[prop] = query;

        }
    });

    return stateObject;
}

export function addToSiteState(prop,val){

    const url = (new URL(window.location.href));

    url.searchParams.set(prop,val);

    setSiteState(`${url.search}${url.hash}`);
};

export function deleteFromSiteState(prop){

    const url = new URL(window.location.href);

    url.searchParams.delete(prop);

    if(!url.search || url.search === ""){

        clearSiteState(url);

    }else{

        setSiteState(`${url.search}${url.hash}`);

    }
}

export function clearSiteState(url){

    url = new URL(window.location.href);

    url.search = "";

    history.replaceState(null,null,url);
};

export function handleUrlState(hash, url){

    switch(hash){

        // case 'main':

        // break;

        // case 'todos':

        // break;

        // case 'lists':

        // break;

        //case 'notes':

            // const form = url.searchParams.get('form');
            
            // if(form){
                
            //     const active = url.searchParams.get('active');

            //     if(active){
                    
            //         document.querySelector(`[data-control="${form}-form"]`).classList.add('active');

            //         openControlConnection(document.querySelector(`[data-connect="${form}-form"]`));

            //         listenToNoteForm();

            //     }
                
            // }

        //break;

        // case 'profile':

        // break;

        // case 'settings':

        // break;

        // case 'connections':

        // break;

        // case 'calculator':

        // break;

        //case 'calendar':

            //const date = url.searchParams.get('date');

            // if(date) console.log('params', date);

        //break;

        case 'stopwatch':

            if(!Stopwatch.initialized) Stopwatch.initialize(stopwatchElements);

        break;

        case 'timer':
            
            if(!Timer.initialized) Timer.initialize(timerElements);

        break;
            
    }
    
};