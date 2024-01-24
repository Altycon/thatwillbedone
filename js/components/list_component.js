import { createTWBDId, parseTimestamp } from "../utilities.js";


export function createListComponent(id,title,list,createdTimestamp,modifiedTimestamp,goalTimestamp){

    const goalControlId = createTWBDId('G');

    const component = document.createElement('li');

    component.setAttribute('data-key',id);

    component.classList.add('list');

    component.append(

        buildListHeader(title,goalControlId),
        buildListList(list),
        buildListFooter(createdTimestamp,modifiedTimestamp,goalTimestamp,goalControlId)

    );

    return component;

};


function buildListHeader(title,goalControlId){

    const header = document.createElement('header');

    const h2 = document.createElement('h2');

    h2.classList.add('list-item-title');

    h2.textContent = title;

    const div = document.createElement('div');

    div.classList.add('list-item-controls');

    const editControls = document.createElement('div');

    editControls.classList.add('list-item-edit-controls');

    editControls.append(

        buildListButton('cancel','button','cancel'),
        buildListButton('additem','button','add item'),
        buildListButton('datetime','button','goal',goalControlId),
        buildListButton('delete','button','delete'),
        buildListButton('save','button','save'),
    )

    div.append(

        buildListButton('edit','button','&#8230;'),
        editControls
    )

    header.append(div,h2);

    return header;
};

function buildListList(list){

    const ul = document.createElement('ul');

    ul.classList.add('list-items');

    list.split(',').forEach( listItem => {

        if(listItem) ul.appendChild(buildListItem(listItem));

    });

    return ul;

};

export function buildListItem(listItem){

    const li = document.createElement('li');

    li.classList.add('list-item');

    const p = document.createElement('p');

    if(listItem) p.textContent = listItem;

    li.append(p,buildListButton('remove','button','&#10007;'));

    return li;

}

function buildListFooter(createdTimestamp,modifiedTimestamp,goalTimestamp,goalControlId){

    const footer = document.createElement('footer');

    footer.classList.add('list-footer');

    footer.append(

        buildListDatetime('created',createdTimestamp,'Not created'),
        buildListDatetime('modified',modifiedTimestamp,'Not modified'),
        buildListDatetime('goal',goalTimestamp,'No goal',goalControlId)
    );

    return footer;
};

function buildListButton(name,type,innerhtml,goalControlId){

    const button = document.createElement('button');

    button.setAttribute('type', type);

    button.setAttribute('title', name)

    button.classList.add('btn',`list-item-${name}-btn`);

    button.setAttribute('data-button', name);

    if(goalControlId) button.setAttribute('data-goal-control', goalControlId);

    button.innerHTML = innerhtml;

    return button;
};

function buildListDatetime(name,timestamp,fallback,goalControlId){

    let label = name;

    const p = document.createElement('p');

    if(name === 'created') label = 'Made';

    if(name === 'modified') label = 'Changed';

    p.classList.add(`list-${name}-datetime`);

    if(goalControlId){

        p.innerHTML = `${label}:&nbsp;<span data-goal-connect="${goalControlId}">${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;

    }else{

        p.innerHTML = `${label}:&nbsp;<span>${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;

    }

    return p;

};

