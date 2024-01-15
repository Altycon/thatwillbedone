

export function createNoContentComponent(){

    const component = document.createElement('div');

    component.classList.add('no-content');

    component.textContent = 'No Content';

    return component;
}