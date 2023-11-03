
import { formatTodoTime } from "../utilities_client.js";
import { manageTodo } from "../controllers/manage_todo_controller.js";

export function createMangeTodoComponent(todo){

    const component = document.createElement('li');
    component.setAttribute('data-todo-id', todo.id);
    component.classList.add('td-management-item');



    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-todo-control', 'delete');
    checkbox.setAttribute('autocomplete', 'off');
    checkbox.classList.add('td-management-checkbox');

    const description = document.createElement('p');
    description.setAttribute('data-todo-display', 'description');
    description.classList.add('td-management-description');
    description.textContent = todo.description;

    const editButton = document.createElement('button');
    editButton.setAttribute('type', 'button');
    editButton.setAttribute('data-todo-control', 'edit');
    editButton.classList.add('td-management-edit-btn');
    editButton.textContent = 'Edit';

    const managementInfo = document.createElement('div');
    managementInfo.classList.add('td-management-info');

    const timeInfo = document.createElement('div');

    const createdLabel = document.createElement('p');
    createdLabel.classList.add('td-management-created-label');
    createdLabel.textContent = `Created:`;

    const createdDateTime = document.createElement('span');
    createdDateTime.setAttribute('data-todo-display', 'created-datetime');
    createdDateTime.classList.add('td-management-created-datatime');
    createdDateTime.textContent = formatTodoTime(todo.createdTime);

    createdLabel.appendChild(createdDateTime);

    const accomplishbyLabel = document.createElement('p');
    accomplishbyLabel.classList.add('td-management-accomplishby-label');
    accomplishbyLabel.textContent = `Accomplish by:`;

    const accomplishbyDateTime = document.createElement('span');
    accomplishbyDateTime.setAttribute('data-todo-display', 'accomplishby-datetime');
    accomplishbyDateTime.classList.add('td-management-accomplishby-datatime');
    accomplishbyDateTime.textContent = `${todo.accomplishByTime ? formatTodoTime(todo.accomplishByTime):'No goal set.'}`;

    accomplishbyLabel.appendChild(accomplishbyDateTime);

    const modifiedLabel = document.createElement('p');
    modifiedLabel.classList.add('td-management-modified-label');
    modifiedLabel.textContent = `Modified:`;

    const modifiedDateTime = document.createElement('span');
    modifiedDateTime.setAttribute('data-todo-display', 'modified-datetime');
    modifiedDateTime.classList.add('td-management-modified-datatime');
    modifiedDateTime.textContent = `${todo.modifiedTime ? formatTodoTime(todo.modifiedTime):'Has not been modified.'}`;

    modifiedLabel.appendChild(modifiedDateTime);

    const completedLabel = document.createElement('p');
    completedLabel.classList.add('td-management-completed-label');
    completedLabel.textContent = `Completed:`;

    const completedDateTime = document.createElement('span');
    completedDateTime.setAttribute('data-todo-display', 'completed-datetime');
    completedDateTime.classList.add('td-management-completed-datatime');
    completedDateTime.textContent = `${todo.completed ? formatTodoTime(todo.completedTime):'Has not been completed.'}`;

    completedLabel.appendChild(completedDateTime);

    timeInfo.append(createdLabel, accomplishbyLabel, modifiedLabel, completedLabel);

    
    const otherData = document.createElement('div');
    
    const commonLabel = document.createElement('p');
    commonLabel.classList.add('td-management-common-label');
    commonLabel.textContent = 'Common:';

    const commonState = document.createElement('span');
    commonState.setAttribute('data-todo-display', 'common');
    commonState.setAttribute('data-value', `${todo.common ? 'true':'false'}`);
    commonState.classList.add('td-management-common');
    commonState.textContent = todo.common ? 'True':'False';

    commonLabel.appendChild(commonState);

    const activeLabel = document.createElement('p');
    activeLabel.classList.add('td-management-active-label');
    activeLabel.textContent = 'Active:'

    const activeState = document.createElement('span');
    activeState.setAttribute('data-todo-display', 'active');
    activeState.setAttribute('data-value', `${todo.active ? 'true':'false'}`);
    activeState.classList.add('td-management-active');
    activeState.textContent = todo.active ? 'True':'False';

    activeLabel.appendChild(activeState);


    otherData.append(commonLabel,activeLabel);

    managementInfo.append(timeInfo,otherData);

    component.append(checkbox,description, editButton,managementInfo);

    component.addEventListener('click', manageTodo);

    return component;
}; 