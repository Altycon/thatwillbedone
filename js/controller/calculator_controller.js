

function checkCalculatorState(display,state){

    return display.classList.contains(state);

};

function setCalculatorState(display,state){

    if(!display.classList.contains(state)) display.classList.add(state);

};

function removeCalculatorState(display,state){

    if(display.classList.contains(state)) display.classList.remove(state);

};

function seperateOperationsInOperationsOutput(display){

    const operationOutput = display.querySelector('.calculator-operation-output');

    operationOutput.textContent += ',';
}


function removeLastCharacterFromCalculatorOutput(display){

    const output = display.querySelector('.calculator-output');

    if(output.textContent === '0') return;

    if(output.textContent.length === 1){

        output.textContent = '0';

        //operationOutput.textContent = output.textContent;

    }else{

        output.textContent = output.textContent.slice(0,-1);

        //operationOutput.textContent = operationOutput.textContent.slice(0,-1);
    }
};

function removeLastCharacterFromCalculatorOperationOutput(display){

    const operationOutput = display.querySelector('.calculator-operation-output');

    operationOutput.textContent = operationOutput.textContent.slice(0,-1);

};

function clearCalculatorOutput(display){

    const output = display.querySelector('.calculator-output');

    if(output.textContent === '0') return;
    
    output.textContent = '0';
};

function clearToCalculatorOperationOutput(display){

    const operationsOutput = display.querySelector('.calculator-operation-output');

    if(operationsOutput.textContent === '0') return;

    operationsOutput.textContent = '0';
};


function addToCalculatorOutput(display,value){

    const output = display.querySelector('.calculator-output');

    if(output.textContent === '0') output.textContent = '';

    output.textContent += value;

    
};

function addToCalculatorOperationOutput(display,value){

    const operationOutput = display.querySelector('.calculator-operation-output');

    if(operationOutput.textContent === '0') operationOutput.textContent = '';

    operationOutput.textContent += value;

};

function isCalculatorOperator(character){

    return ['+','-','*','/'].includes(character);
};

function hasCalculatorOperator(string){

    const operators = ['+','-','*','/'];

    const characters = string.split(',');

    let hasOperator = false;

    for(let i = 0; i < operators.length; i++){

        const operator = operators[i];

        for(let j = 0; j < characters.length; j++){

            const char = characters[j];

            if(char === operator){

                hasOperator = true;

                break;
            }
        }

        if(hasOperator) return hasOperator;
    }

    return hasOperator;
};

function calculateOperations(operationsArray){

    const operations = operationsArray.map( a => a);

    let total = 0;

    operations.forEach( operation => {

        if(hasCalculatorOperator(operation)){

            const parts = operation.split(',');

            if(isNaN(parts[0])){

                const oper = parts[0];

                const other = +parts[1];

                switch(oper){

                    case '+': total += other; break;
    
                    case '-': total -= other; break;
    
                    case '*': total *= other; break;
    
                    case '/': 
                    
                       // handle divide by zero
                    
                    total /= other; 
                    
                    
                    break;
                }

            }else{

                const a = +parts[0];

                const operator = parts[1];

                const b = +parts[2];

                let sum = 0;

                switch(operator){

                    case '+': sum = a + b; break;

                    case '-': sum = a - b; break;

                    case '*': sum = a * b; break;

                    case '/': sum = a / b; break;
                }

                total = sum;

            }

        }
    });

    return total;

}

function handleCalculatorEquals(display,output){

    const outputArray = output.textContent.split('');

    let operationString = ''

    let operatorFound = false;

    const operationArray = [];

    for(let i = 0; i < outputArray.length; i++){

        const inputValue = outputArray[i];

        if(isCalculatorOperator(inputValue)){

            if(operatorFound){

                operationArray.push(operationString);

                operationString = `${inputValue},`;

                operatorFound = false;

                continue;
            }

            operationString += `,${inputValue},`;

            operatorFound = true;

        }else{
            
            operationString += inputValue;
        }
    }

    operationArray.push(operationString);

    const result = calculateOperations(operationArray);

    clearCalculatorOutput(display);

    addToCalculatorOutput(display, result);

    addToCalculatorOperationOutput(display,result)

}


function handleCalculatorOperations(display,operator){

    const output = display.querySelector('.calculator-output');

    if(output.textContent === '0') return;


    if(isNaN(output.textContent[output.textContent.length - 1])){

        removeLastCharacterFromCalculatorOutput(display);

        removeLastCharacterFromCalculatorOperationOutput(display);
    }

    switch(operator){

        case '+':
        case '-':
        case '*':
        case '/':

            addToCalculatorOutput(display,operator);

            addToCalculatorOperationOutput(display, operator);

            removeCalculatorState(display,'equaled');

        break;

        case '=':

            addToCalculatorOperationOutput(display,operator);

            handleCalculatorEquals(display,output);

            setCalculatorState(display,'equaled');

        break;
    }
    
};

function handleCalculatorActions(display,action){

    switch(action){

        case 'backspace':

            removeLastCharacterFromCalculatorOutput(display);

        break;

        case 'clear':

            clearCalculatorOutput(display);

            clearToCalculatorOperationOutput(display);

            removeCalculatorState(display,'equaled');

        break;

        case 'percent':


        break;

        case 'a':

            clearCalculatorOutput(display);

            clearToCalculatorOperationOutput(display);

            removeCalculatorState(display,'equaled');

        break;
    }

};

function handleCalculatorDecimalPoint(display,point){

    const output = display.querySelector('.calculator-output');

    const operationOutput = display.querySelector('.calculator-operation-output');

    if(output.textContent.includes('.')) return;

    output.textContent += point;

    operationOutput.textContent += point;
}


function handleCalculatorKeys(event){

    const { currentTarget: display, target: button  } = event;


    if(!button.value && !button.dataset.keyType) return;

    if(event.type === 'click'){

        switch(button.dataset.keyType){

            case 'number':

                if(checkCalculatorState(display,'equaled')){

                    clearCalculatorOutput(display);

                    seperateOperationsInOperationsOutput(display);
                }

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

                handleCalculatorDecimalPoint(display,button.value);

            break;

        }

    }

    
};

export function calculatorController(){
    
    const calculatorDisplay = document.querySelector('.calculator-display');

    calculatorDisplay.addEventListener('click', handleCalculatorKeys);

    calculatorDisplay.addEventListener('keydown', handleCalculatorKeys);

    clearCalculatorOutput(calculatorDisplay);

    clearToCalculatorOperationOutput(calculatorDisplay);

};