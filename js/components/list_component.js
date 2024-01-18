import { parseTimestamp } from "../utilities.js";


export function createListComponent(id,title,list,createdTimestamp,modifiedTimestamp,goalTimestamp){

    const component = document.createElement('li');

    component.setAttribute('data-key',id);

    component.classList.add('list');

    component.append(

        buildListHeader(title),
        buildListList(list),
        buildListFooter(createdTimestamp,modifiedTimestamp,goalTimestamp)

    );

    return component;

};


function buildListHeader(title){

    const header = document.createElement('header');

    const h2 = document.createElement('h2');

    h2.classList.add('list-item-title');

    h2.textContent = title;

    const div = document.createElement('div');

    div.classList.add('list-item-controls');


    div.append(

        buildListButton('delete','button','&#128465;'),
        buildListButton('save','button','&#128190;'),
        buildListButton('cancel','button','&#10007;'),
        buildListButton('additem','button','+'),
        buildListButton('edit','button','&#9998;')

    )

    header.append(

        h2,
        div

    );

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

    li.append(p,buildListButton('remove','button','&#128465;'));

    return li;

}

function buildListFooter(createdTimestamp,modifiedTimestamp,goalTimestamp){

    const footer = document.createElement('footer');

    footer.classList.add('list-footer');

    footer.append(

        buildListDatetime('created',createdTimestamp,'Not created'),
        buildListDatetime('modified',modifiedTimestamp,'Not modified'),
        buildListDatetime('goal',goalTimestamp,'No goal')
    );

    return footer;
};

function buildListButton(name,type,innerhtml){

    const button = document.createElement('button');

    button.setAttribute('type', type);

    button.setAttribute('title', name)

    button.classList.add('btn',`list-item-${name}-btn`,'entity');

    button.setAttribute('data-button', name);

    button.innerHTML = innerhtml;

    return button;
};

function buildListDatetime(name,timestamp,fallback){

    let label = name;

    const p = document.createElement('p');

    if(name === 'created') label = 'Made';

    if(name === 'modified') label = 'Changed';

    p.classList.add(`list-${name}-datetime`);

    p.innerHTML = `${label}:&nbsp;<span>${timestamp ? parseTimestamp(timestamp,'timedate'):fallback}</span>`;

    return p;

};

