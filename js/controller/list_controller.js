import { buildListItem, createListComponent } from "../components/list_component.js";
import { createNoContentComponent } from "../components/no_content_component.js";
import { AltyIDB } from "../databases/local_index_database.js";
import { confirmSelection } from "./confirm_selection_controller.js";
import { notify } from "./notification_controller.js";
import { addToSiteState, deleteFromSiteState, getSiteState } from "./state_controller.js";

export function listsController(){

    const listGroups = document.querySelector('.list-groups');

    listGroups.addEventListener('click', (event)=>{

        if(!event) return;

        const { currentTarget, target } = event;

        if(target.dataset.button){

            event.preventDefault();

            handleListButtons(target,currentTarget);
        }

    });

};


function handleListButtons(target,listGroups){

    const button = target.dataset.button;

    const li = target.closest('li');

    switch(button){

        case 'remove': 
    
           removeListItem(li,listGroups);

        break;     

        case 'edit': 
    
           startEditingList(li);

        break;

        case 'cancel':

            cancelEditingList(li);

        break;

        case 'additem':

            addNewItemToList(li,listGroups);

        break;

        case 'save':

        confirmSelection('Positive you want to update?', ()=>{

            updateList(li);

            cancelEditingList(li);

        });

        break;

        case 'delete':

            confirmSelection('Delete this list?', ()=>{

                deleteList(li,listGroups)  

            });

        break;
    }
};

function startEditingList(li){

    if(li.classList.contains('edit')) return;

    li.classList.add('edit');

    li.querySelector('.list-item-title').contentEditable = true;

    [...li.querySelectorAll('.list-item')].forEach( item => {

        item.firstElementChild.contentEditable = true;

    });
    
    //addToSiteState('listtitle', li.querySelector('.list-item-title').innerText.trim());
};

function cancelEditingList(li){

    li.classList.remove('edit');

    li.querySelector('.list-item-title').contentEditable = false;

    [...li.querySelectorAll('.list-item')].forEach( item => {

        item.firstElementChild.contentEditable = false;

        if(!item.firstElementChild.textContent || item.firstElementChild.textContent === '' ||
        item.firstElementChild.textContent === ' '){

            li.querySelector('.list-items').removeChild(item);
        }

    });

    //deleteFromSiteState('listtitle');
};

function updateList(li){

    const key = li.getAttribute('data-key');

    if(!key) return;

    // I think I should compare old to new descriptions if its changed...
    const titleElement = li.querySelector('.list-item-title');

    if(titleElement){

        const updatedList = {

            id: key,
            modifiedTimestamp: Date.now().toString()

        };

        let listItems = '';

        let title = titleElement.innerText.trim();
    
        const state = getSiteState(['listtitle']);


        if(state.listtitle && state.listtitle !== title){

            updatedList.title = state.listtitle;

        }

        const listItemElements = [...li.querySelectorAll('.list-item')];

        listItemElements.forEach( listItemElement => {

            listItems += listItemElement.firstElementChild.textContent.trim() + ','

        })

        updatedList.items = listItems;

        AltyIDB.update('list', updatedList, ()=>{

            notify('List has been updated.');

        });

    }

};

function addNewItemToList(li){

    const listItemsElemensts = li.querySelector('.list-items');

    const newListItem = buildListItem();


    function handleNewListItemKeydown(event){

        const { target, key, shiftkey } = event;

        if(key === 'Enter' && !shiftkey){

            event.preventDefault();

            target.blur();

            target.removeEventListener('keydown',handleNewListItemKeydown);

            addNewItemToList(li);
        }

    }

    listItemsElemensts.lastChild.firstChild.removeEventListener('keydown', handleNewListItemKeydown);

    newListItem.firstChild.addEventListener('keydown', handleNewListItemKeydown);

    listItemsElemensts.appendChild(newListItem);

    newListItem.firstChild.contentEditable = true;

    newListItem.firstChild.focus();
}

function deleteList(li,listGroups){

    AltyIDB.deleteData('list', li.getAttribute('data-key'), (data)=>{

        listGroups.removeChild(li);

        if(listGroups.children.length < 1){

            listGroups.appendChild(createNoContentComponent());
        }

    })
};

function removeListItem(li,listGroups){

    listGroups.querySelector('.list-items').removeChild(li);

};


export function buildListGroups(data){

    if(!data || data.length < 1) return;

    const listGroups = document.querySelector('.list-groups');

    while(listGroups.lastChild){

        listGroups.removeChild(listGroups.lastChild);
    }

    const df = new DocumentFragment();

    data.sort( (a,b) => +b.createdTimestamp - +a.createdTimestamp).forEach( list => {
    
        df.appendChild(

            createListComponent(
                list.id,
                list.title,
                list.items,
                list.createdTimestamp,
                list.modifiedTimestamp,
                list.goalTimestamp
            )
        );
    });

    listGroups.appendChild(df);

};