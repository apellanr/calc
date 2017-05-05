$(document).ready(function(){
    applyClickHandlers();
});
var inputArray = [];
var decimal = false;
var operatorArr = ['*', '÷', '+', '-'];
var equalCount = 0;
var new_result;
var oldData = {
    oldOp : null,
    oldNum : null
};

// --------------- CLICK HANDLER FUNCTION --------------- //
function applyClickHandlers() {
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
    if(equalCount >= 1){ // Jinwoo's genius idea
        inputArray=[];
    }
    if(inputArray[0] === "0" && inputArray.length === 1) { // prevention of leading zeros
        return;
    } else if(!isNaN(inputArray[inputArray.length - 1])) {
        inputArray[inputArray.length - 1] += numberValue;
    } else {
        inputArray.push(numberValue);
    }
    equalCount = 0;
    console.log(inputArray);
    displayValues(inputArray);
}
// --------------- HANDLE OPERATOR CLICK --------------- //
function operatorClicked() {
    console.log("operator has been clicked");
    decimal = false; //back to false if operator added. resolves multiple decimals
    var operator = $(this).text();
    var lastIndexVal = inputArray.length - 1;
    if(inputArray.length === 0) return; // prevents adding op to beginning of inputArr
    if(!isNaN(inputArray[lastIndexVal])) { // !isNaN have different behavior for non-numeric arguments
        inputArray.push(operator); // when arg is not of type Number, it is attempted to be coerced into a number
    } else {
        inputArray[lastIndexVal] = operator;
    }
    console.log(inputArray);
    displayValues();
}
// --------------- DECIMAL HANDLER --------------- //
function handleDecimals() {
    console.log('decimal pressed');
    var decimalValue = $(this).text();
    if (decimal === false) {
        inputArray[inputArray.length - 1] += decimalValue;
        decimal = true;
    }
    displayValues();
}
// --------------- DISPLAY INPUT --------------- //
function displayValues() {
    var values = inputArray.join('');
    if(values === "Infinity") {
        values = 'Error';
    }
    $('#display-area').text(values);
}
// --------------- ORDER OF OPERATIONS [PEMDAS] --------------- //
/*
 - order of associativity : multiply > divide > add > subtract
 - notes: loop through array and check to see if operator is found
 */
function orderOfOperations(values) {
    oldData.oldNum = values[values.length-1];
    for (var i = 1; i < values.length; i += 2) {
        if (values[i] === "*") {
            new_result = (parseFloat(values[i - 1]) * parseFloat(values[i + 1]));
            oldData.oldOp = values[i];
            values.splice(i - 1, 3, (new_result));
            i -= 2;
        }
        if (values[i] === "÷") {
            new_result = (parseFloat(values[i - 1]) / parseFloat(values[i + 1]));
            oldData.oldOp = values[i];
            values.splice(i - 1, 3, (new_result));
            i -= 2;
        }
    }
    for(var i = 1; i < values.length; i+=2) {
        if (values[i] === '+') {
            new_result = (parseFloat(values[i-1]) + parseFloat(values[i + 1]));
            oldData.oldOp = values[i];
            values.splice(i-1,3,new_result);
            i -= 2;
        }
        if(values[i] === "-") {
            new_result = parseFloat(values[i-1]) - parseFloat(values[i+1]);
            oldData.oldOp = values[i];
            values.splice(i-1,3,new_result);
            i -= 2;
        }
    }
    inputArray[0] = new_result;
    displayValues(inputArray);
}

// --------------- EQUAL SIGN HANDLER --------------- //
function equalSignClick() {
    console.log('equal sign clicked');
    if(typeof inputArray[0] == "number") {
        inputArray.push(oldData.oldOp, oldData.oldNum);
        orderOfOperations(inputArray);
    }
    var len = inputArray.length;
    if(len === 0) {
        $("#display-area").text("Ready");
        return;
    }
    if(len === 1) return inputArray; // missing operation
    if(len === 2) inputArray[2] = inputArray[0]; // partial operand
    if(len > 3) {
        inputArray.push(new_result);
    }
    equalCount++;
    orderOfOperations(inputArray);
    displayValues(inputArray);
    // inputArray = [];
    console.log(inputArray);
}

// --------------- GLOBAL VARIABLES && CLEAR BUTTON OBJ --------------- //
var clearObj = {
    clearLastEntry : function() {
         // checks to see if there is a value in array
        inputArray.pop();
        oldData.oldOp = null;
        oldData.oldNum = null;
        decimal = false;
        displayValues();
    },
    deleteAll : function() {
        console.log('CE has been clicked');
        inputArray = [];
        oldData.oldOp = null;
        oldData.oldNum = null;
        decimal = false;
        displayValues();
    }
};