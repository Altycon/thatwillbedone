
import { listenToSettingsForm } from "../forms/settings_form.js";
import { isLightColor } from "../utilities.js";

export function settingsController(){

    listenToSettingsForm();

};

export function applySettingsDataToSite(theme,textType){


    const settingsForm = document.querySelector('.settings-form');

    if(theme){

        switch(theme){

            case 'light':

                document.documentElement.style.setProperty('--fc-primary', 'hsl(0 0% 0%)');

                document.documentElement.style.setProperty('--bc-primary', 'hsl(0 0% 100%)');

                document.documentElement.style.setProperty('--bc-accent1', 'hsl(0 0% 90%)');

                settingsForm.querySelector('input[name=theme]').checked = false;

            break;

            case 'dark':

                document.documentElement.style.setProperty('--fc-primary', 'hsl(0 0% 100%)');

                document.documentElement.style.setProperty('--bc-primary', 'hsl(0 0% 0%)');

                document.documentElement.style.setProperty('--bc-accent1', 'hsl(0 0% 10%)');

                settingsForm.querySelector('input[name=theme]').checked = true;

            break;
        }

    }else{

        if(getComputedStyle(document.documentElement).getPropertyValue('--bc-primary') === 'hsl(0 0% 0%)'){
            
            settingsForm.querySelector('input[name=theme]').checked = true;
        }
    }
      
    if(textType){

        document.documentElement.style.setProperty('--ff-primary', textType);

        const textTypeSelect = settingsForm.querySelector(`select option[value="${textType}"]`).selected = true;

        console.log(textTypeSelect)
    }

    console.log('Settings data added to site');
    
}



