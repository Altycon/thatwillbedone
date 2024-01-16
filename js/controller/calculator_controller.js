
function clearCalculatorOutput(display){

    const output = display.querySelector('.calculator-output');

    if(output.innerText === '0') return;
    
    output.innerText = '0';
};

function clearToCalculatorOperationOutput(display){

    const operationsOutput = display.querySelector('.calculator-operation-output');

    if(operationsOutput.innerText === '0') return;

    operationOutput.innerText = '0';
};


function addToCalculatorOutput(display,value){

    const output = display.querySelector('.calculator-output');

    if(value !== '.'){

        if(output.textContent === '0') output.innerText = '';

    }

    output.innerText += value;

    
};

function addToCalculatorOperationOutput(display,value){

    const operationOutput = display.querySelector('.calculator-operation-output');

    if(value !== '.'){

        if(operationOutput.textContent === '0') operationOutput.innerText = '';

    }

    operationOutput.innerText += value;

};


function handleCalculatorOperations(display,operation){

    switch(operation){

        case '+':

        break;

        case '-':

        break;

        case 'x':
    }


    addToCalculatorOutput(display,operation);

    addToCalculatorOperationOutput(display, operation);
};

function handleCalculatorActions(display,action){

    switch(action){

        case 'backspace':

            const output = display.querySelector('.calculator-output');

            if(output.innerText === '0') return;

            if(output.innerText.length === 1)  output.innerText = '0';

            else  output.innerText = output.innerText.slice(0,-1);


        break;

        case 'clear':

            clearCalculatorOutput(display);

        break;

        case 'percent':


        break;

        case 'a':

            clearCalculatorOutput(display);

            clearToCalculatorOperationOutput(display);

        break;
    }

};


function handleCalculatorKeys(event){

    const { currentTarget: display, target: button  } = event;


    if(!button.value && !button.dataset.keyType) return;

    if(event.type === 'click'){

        switch(button.dataset.keyType){

            case 'number':

                addToCalculatorOutput(display,button.value);

                addToCalculatorOperationOutput(display,button.value);

            break;

            case 'operation':

                handleCalculatorOperations(display,button.value);

            break;

            case 'action':

                handleCalculatorActions(display,button.value);

            break;

            case 'point':

                addToCalculatorOutput(display,button.value);

                addToCalculatorOperationOutput(display,button.value);

            break;

        }

    }

    
};

export function calculatorController(){
    
    const calculatorDisplay = document.querySelector('.calculator-display');

    calculatorDisplay.addEventListener('click', handleCalculatorKeys);

    calculatorDisplay.addEventListener('keydown', handleCalculatorKeys);

    clearCalculatorOutput(calculatorDisplay);

};