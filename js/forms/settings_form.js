import { notify } from "../controller/notification_controller.js";
import { AltyLocalStorage } from "../databases/local_storage_database.js";

export function listenToSettingsForm(){

    const settingsForm = document.querySelector('.settings-form');


    settingsForm.addEventListener('submit', handleSettingsSave);

    settingsForm.querySelector('input[name=theme]').addEventListener('input', handleSettingsThemeChange);

    settingsForm.querySelector('select[name=texttype]').addEventListener('input', handleSettingsTextTypeChange);
}

function handleSettingsSave(event){

    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const theme = formData.get('theme') === 'on' ? 'dark':'light';

    const textType = formData.get('texttype');

    const updates = {

        theme: theme,
        textType: textType

    };

    AltyLocalStorage.updateItems('settings', updates);

    notify('Settings updated');

};

function handleSettingsThemeChange(event){

    if(event.target.checked){

        document.documentElement.style.setProperty('--fc-primary', 'hsl(0 0% 100%)');

        document.documentElement.style.setProperty('--bc-primary', 'hsl(0 0% 0%)');

        document.documentElement.style.setProperty('--bc-accent1', 'hsl(0 0% 10%)');

    }else{

        document.documentElement.style.setProperty('--fc-primary', 'hsl(0 0% 0%)');

        document.documentElement.style.setProperty('--bc-primary', 'hsl(0 0% 100%)');

        document.documentElement.style.setProperty('--bc-accent1', 'hsl(0 0% 90%)');

    }
};

function handleSettingsTextTypeChange(event){

    document.documentElement.style.setProperty('--ff-primary', event.target.value);

};
