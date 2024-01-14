import { createListComponent } from "../components/list_component.js";
import { notify } from "../controller/notification_controller.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { createTWBDId } from "../utilities.js";

export function listenToListForm(){


    const form = document.querySelector(`.new-list-form`);

    const titleInput = form.querySelector('input[name="title"]');

    const formControl = document.querySelector(`[data-control="${form.dataset.connect}"]`);

    const formList = form.querySelector('.new-list-form-list');

    formList.addEventListener('click', handleFormListItemRemove)


    formControl.addEventListener('click', stopListeningToListForm);

    form.addEventListener('submit', handleListFormSubmit);

    form.querySelector('input[name="item"]').addEventListener('keydown', handleItemKeydown);

    form.querySelector('.new-list-form-additem-btn').addEventListener('click', addItemToFormList);

    titleInput.addEventListener('keydown', handleTitleKeydown);

    titleInput.value = '';
    
    titleInput.focus();
};

function stopListeningToListForm(event){

    const form = document.querySelector(`.new-list-form`);

    form.removeEventListener('submit', handleListFormSubmit);

    form.querySelector('input[name="title"]').removeEventListener('keydown', handleTitleKeydown);

    form.querySelector('input[name="item"]').removeEventListener('keydown', handleItemKeydown);

    form.querySelector('.new-list-form-additem-btn').removeEventListener('click', addItemToFormList);

    event.target.removeEventListener('click', stopListeningToListForm);

};

function handleItemKeydown(event){

    const { key, shiftkey } = event;

        if(key === 'Enter' && !shiftkey){

            event.preventDefault();

            const form = event.target.closest('form');

            const newFormList = form.querySelector('.new-list-form-list');

            newFormList.insertBefore(
        
                createNewListItemComponent(event.target.value.trim()),
                newFormList.firstChild
        
            );

            event.target.value = '';
        }
};

function handleTitleKeydown(event){

    const { key, shiftkey } = event;

        if(key === 'Enter' && !shiftkey){

            event.preventDefault();

            event.target.closest('form').querySelector('input[name="item"]').focus();
        }
};

function handleListFormSubmit(event){

    event.preventDefault();

    const formElement = event.target;

    const data = new FormData(formElement);

    let formItemList = '';

    let title = data.get('title').trim();

    if(!title || title === '' || title === ' ') title = 'unknown';

    const newFormItemElements = [...formElement.querySelectorAll('.new-list-form-item')];

    for(let i = newFormItemElements.length - 1; i >= 0; i--){

        formItemList += newFormItemElements[i].querySelector('span').innerText + ','
    }


    if(formItemList === ''){

        notify('Hold up', 'You need to add items to the list before anything will be saved','Add a few items to the list');

        return;
    }

    const now = Date.now().toString();

    const list = {
        id: createTWBDId('L'),
        title: title,
        items: formItemList,
        createdTimestamp: now,
        modifiedTimestamp: now,
        goalTimestamp: null
    };

    AltyIDB.add('list', list, (event)=>{
        
        const component = createListComponent(
            list.id,
            list.title,
            list.items,
            list.createdTimestamp,
            list.modifiedTimestamp,
            list.goalTimestamp
        );

        const listGroups = document.querySelector('.list-groups');

        listGroups.insertBefore(component,listGroups.firstChild);

        resetListForm(formElement);

    });

};

function handleFormListItemRemove(event){

    event.preventDefault();

    const { currentTarget, target } = event;

    if(target && target.dataset.button === 'remove'){

        currentTarget.removeChild(target.closest('li'));
    }
};


function resetListForm(form){

    form.reset();

    const titleInput = form.querySelector('input[name="title"]');

    titleInput.innerText = '';

    const formList = form.querySelector('.new-list-form-list');

    while(formList.lastChild){

        formList.removeChild(formList.lastChild);
    }

    if(document.activeElement === titleInput) return;
    
    else titleInput.focus();
};



function createNewListItemComponent(item){

    const li = document.createElement('li');

    li.classList.add('new-list-form-item');

    const span = document.createElement('span');

    span.textContent = item;

    const removeButton = document.createElement('button');

    removeButton.setAttribute('type','button');

    removeButton.setAttribute('data-button','remove');

    removeButton.classList.add('btn','new-list-form-item-remove-btn');

    removeButton.innerHTML = `&#x2717;`;

    li.append(span,removeButton);

    return li;
};

function addItemToFormList(event){

    const form = event.target.closest('form');

    const itemElement = form.querySelector('input[name="item"]');

    
    const item = itemElement.value.trim();

    if(!item || item === '' || item === ' ') return;

    const newFormList = form.querySelector('.new-list-form-list');

    newFormList.insertBefore(
    
        createNewListItemComponent(item),
        newFormList.firstChild

    );

    itemElement.value = '';

    if(document.activeElement !== itemElement) itemElement.focus();

};
