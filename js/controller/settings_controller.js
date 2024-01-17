
export function settingsController(){

    const settingsForm = document.querySelector('.settings-form');


    settingsForm.addEventListener('submit', handleSettingsSave);

    settingsForm.querySelector('input[name=theme]').addEventListener('input', handleSettingsThemeChange);

    settingsForm.querySelector('input[name=textcolor]').addEventListener('input', handleSettingsTextColorChange);

    settingsForm.querySelector('input[name=backgroundcolor]').addEventListener('input', handleSettingsBackgroundColorChange);

};

function handleSettingsSave(event){

    const form = event.target;

    const formData = new FormData(form);

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

function handleSettingsTextColorChange(event){

    document.documentElement.style.setProperty('--fc-primary', event.target.value);

};

function handleSettingsBackgroundColorChange(event){

    document.documentElement.style.setProperty('--bc-primary', event.target.value);
};