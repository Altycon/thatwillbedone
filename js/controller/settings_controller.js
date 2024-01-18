import { AltyLocalStorage } from "../databases/local_storage_database.js";

export function settingsController(){

    const settingsForm = document.querySelector('.settings-form');


    settingsForm.addEventListener('submit', handleSettingsSave);

    settingsForm.querySelector('input[name=theme]').addEventListener('input', handleSettingsThemeChange);

    settingsForm.querySelector('select[name=texttype]').addEventListener('input', handleSettingsTextTypeChange);

    settingsForm.querySelector('input[name=textcolor]').addEventListener('input', handleSettingsTextColorChange);

    settingsForm.querySelector('input[name=backgroundcolor]').addEventListener('input', handleSettingsBackgroundColorChange);

};

function handleSettingsSave(event){

    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const theme = formData.get('theme');

    const textType = formData.get('texttype');

    const textColor = formData.get('textcolor');

    const backgroundColor = formData.get('backgroundcolor');

    const updates = {

        theme: theme,
        textType: textType,
        textColor: textColor,
        backgroundColor: backgroundColor

    };

    console.log(updates)

    AltyLocalStorage.updateItems('settings', updates);

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

function handleSettingsTextColorChange(event){

    document.documentElement.style.setProperty('--fc-primary', event.target.value);

};

function handleSettingsBackgroundColorChange(event){

    document.documentElement.style.setProperty('--bc-primary', event.target.value);
};