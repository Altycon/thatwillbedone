import { AltyStorage } from "../local_database/local-storage.js";
import { areObjectsEqual, formDataToObject, formatTodoTime } from "../utilities_client.js";


export function openUpdateTodoWindow(){

    document.querySelector('.td-update-form-window').classList.toggle('open');

};

export function listenToUpdateForm(){

    const updateForm = document.querySelector('.td-update-form');

    updateForm.addEventListener('click', handleUpdateFormControls);

    updateForm.addEventListener('submit', submitUpdateForm);
}

function submitUpdateForm(submitEvent){

    submitEvent.preventDefault();

    const tempStoredTodo = AltyStorage.getStore('temp-todo')[0];

    const updateFormData = formDataToObject(new FormData(submitEvent.target));

    
    const todoIsEqual = areObjectsEqual(tempStoredTodo, updateFormData);


    const newCompletedTime = configureUpdatedCompletedTime(tempStoredTodo,updateFormData);

    const newModifiedTime = configureUpdatedModifiedTime(todoIsEqual, newCompletedTime, tempStoredTodo.completedTime);

    const updatedTodo = AltyStorage.updateItem('todo-store', tempStoredTodo.id, {
        id: updateFormData.id,
        description: updateFormData.description,
        common: updateFormData.common,
        active: updateFormData.active,
        completed: updateFormData.completed,
        modifiedTime: newModifiedTime,
        completedTime: newCompletedTime
    });

    // update management item with new information

    updateManagementTodoComponent(updatedTodo)

    closeUpdateTodoWindow();

};

export function insertTodoDataIntoUpdateForm(todoId){

    const storedTodo = AltyStorage.getItem('todo-store', todoId);

    resetUpdateFormRadioButtons();

    setUpdateFormInputValue('id', storedTodo.id);

    setUpdateFormInputValue('description', storedTodo.description);

    

    setUpdateFormRadioButton('common', (storedTodo.common ? 'true':'false'));

    setUpdateFormRadioButton('active', (storedTodo.active ? 'true':'false'));

    setUpdateFormRadioButton('completed', (storedTodo.completed ? 'true':'false'));


    AltyStorage.setItem('temp-todo', storedTodo);

};

function setUpdateFormInputValue(name,value){

    document.querySelector(`.td-update-form-${name}`).value = value;
}

function resetUpdateFormRadioButtons(){
    
    [...document.querySelectorAll('.td-update-form input[type="radio"]')].forEach( radio => radio.checked = false);

};

function setUpdateFormRadioButton(radioName, value){
        
    [...document.querySelectorAll(`.td-update-form [name="${radioName}"]`)].forEach( radio => {

        if(radio.value === value){

            radio.checked = true;
        }
    });

};

function handleUpdateFormControls(clickEvent){

    const { currentTarget: updateForm, target } = clickEvent;

    const control = target.dataset.todoControl

    if(control){

        switch(control){

            case 'submit':

                clickEvent.preventDefault();
            
            break;

            case 'cancel':

                clickEvent.preventDefault();

                closeUpdateTodoWindow();

                updateForm.removeEventListener('click', handleUpdateFormControls);

            break;

            case 'delete':

                clickEvent.preventDefault();

            break;

            case 'accomplishby':

                // I need to change this. This will not work

                //closeUpdateTodoWindow();

                window.location = window.location.origin + `#TodoCalendar`;

            break;
        }
    }
};

function closeUpdateTodoWindow(){

    document.querySelector('.td-update-form-window').classList.toggle('open');

    document.querySelector('.td-update-form').reset();

    if(AltyStorage.getStore('temp-todo').length > 0) AltyStorage.deleteStore('temp-todo');
    
};


function configureUpdatedCompletedTime(tempStoredTodo, updateFormData){

    let newCompletedTime;

    if(updateFormData.completed){

        if(tempStoredTodo.completed !== updateFormData.completed){

            newCompletedTime = Date.now();

        }else{

            newCompletedTime = tempStoredTodo.completedTime
        }
        
    }else{

        newCompletedTime = null
    }

    return newCompletedTime;
};

function configureUpdatedModifiedTime(todoIsEqual, newCompletedTime, storedCompletedTime){

    let newModifiedTime;

    if(todoIsEqual){

        if(newCompletedTime !== storedCompletedTime){

            newModifiedTime = Date.now();

        }else{

            newModifiedTime = null
        }
        
    }else{
        
        newModifiedTime = Date.now()
    }

    return newModifiedTime;
};

function updateManagementTodoComponent(todo){

    const componet = document.querySelector(`.td-management-list [data-todo-id="${todo.id}"]`);

    componet.querySelector(`[data-todo-display="description"]`).textContent = todo.description;
    
    componet.querySelector(`[data-todo-display="created-datetime"]`).textContent = formatTodoTime(todo.createdTime);

    componet.querySelector(`[data-todo-display="accomplishby-datetime"]`).textContent = `${todo.accomplishByTime ? formatTodoTime(todo.accomplishByTime):'No goal set.'}`;

    componet.querySelector(`[data-todo-display="modified-datetime"]`).textContent = `${todo.modifiedTime ? formatTodoTime(todo.modifiedTime):'Has not been modified.'}`;

    componet.querySelector(`[data-todo-display="completed-datetime"]`).textContent = `${todo.completed ? formatTodoTime(todo.completedTime):'Has not been completed.'}`;

    componet.querySelector(`[data-todo-display="common"]`).textContent = todo.common ? 'True':'False';

    componet.querySelector(`[data-todo-display="active"]`).textContent = todo.active ? 'True':'False';

};