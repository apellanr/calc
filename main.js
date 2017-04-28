$(document).ready(function(){
    applyClickHandlers();
});

var inputArray = [];
var decimal = false;

// --------------- CLICK HANDLER FUNCTION --------------- //
function applyClickHandlers() {
    $('#equalButton').keypress(validateKeypress);
    $(".number").on('click', numberClicked);
    $(".operator").on('click', operatorClicked);
    $('.decimal').click(handleDecimals);
    $('.equals').click(equalSignClick);
    $('.backspace').click(clearObj.clearLastEntry);
    $('.clearAll').click(clearObj.deleteAll);
}

// --------------- HANDLE NUMBER CLICK --------------- //
function numberClicked() {
    var numberValue = $(this).text();
    // inputArray.push(numberValue);
    if(!isNaN(inputArray[inputArray.length - 1])) {
        inputArray[inputArray.length - 1] += numberValue;
    } else {
        inputArray.push(numberValue);
    }
    console.log(inputArray);
    displayValues();
}

// --------------- HANDLE OPERATOR CLICK --------------- //
function operatorClicked() {
    inputArray.push($(this).text());
    console.log(inputArray);
    displayValues();
}

// --------------- DECIMAL HANDLER --------------- //
function handleDecimals() {
    console.log('decimal pressed');
}

// --------------- DISPLAY INPUT --------------- //
function displayValues() {
    var values = inputArray.join('');
    $('#display-area').text(values);
}

// --------------- ORDER OF OPERATIONS [PEMDAS] --------------- //
/*
 - order of associativity : multiply > divide > add > subtract
 - trying to stray away from using a switch statement. will try to use this function to perform solving calculations
 - notes: loop through array and check to see if operator is found
 - if found, target character to the left of the operator then target character to the right of the operator
 - keep that value and replace the operator position in array - return to baseline
 */
function orderOfOperations(values) {
    for(var i = 1; i < values.length; i+=2) {
        if(values[i] === "*") {
            var new_result = parseFloat(values[i-1]) * parseFloat(values[i + 1]);
            values.splice(i-1,3,new_result);
            i -= 2;
        }
        if(values[i] === "÷") {
            new_result = parseFloat(values[i-1]) / parseFloat(values[i+1]);
            values.splice(i-1,3,new_result);
            i -= 2;
        }
    }
    for(var i = 1; i < values.length; i+=2) {
        if (values[i] === '+') {
            new_result = parseFloat(values[i-1]) + parseFloat(values[i + 1]);
            values.splice(i-1,3,new_result);
            i -= 2;
        }
        if(values[i] === "-") {
            new_result = parseFloat(values[i-1]) - parseFloat(values[i+1]);
            values.splice(i-1,3,new_result);
            i -= 2;
        }
    }
    var toFixed = new_result.toFixed(2);
    return toFixed;
}


// --------------- EQUAL SIGN HANDLER --------------- //
function equalSignClick() {
    console.log('equal sign clicked');
    orderOfOperations(inputArray);
    displayValues();
}

function validateKeypress(event) {
    console.log('keypress test');
    if(event.keyCode === 13) {
        $("#equalButton").click()
    }
}

// --------------- CLEAR BUTTON OBJ --------------- //
var clearObj = {
    clearLastEntry : function() {
        console.log('backspace clicked. removing last input');
        if(inputArray[inputArray.length - 1] !== undefined) { // checks to see if there is a value in array
            inputArray.pop();
        }
        displayValues();
    },
    deleteAll : function() {
        console.log('CE button pressed');
        inputArray = [];
        decimal = false;
        displayValues();
    }
};