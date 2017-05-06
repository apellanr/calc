$(document).ready(function(){
    applyClickHandlers();
});
var inputArray = [];
var tempArr = [];
var decimal = false;
var new_result;
var oldData = {
    oldOp : null,
    oldNum : null,
    lastOp : null,
    result : null
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
    if(inputArray[0] === "0" && inputArray.length === 1) { // prevention of leading zeros
        return;
    }
    if(typeof inputArray[0] === "number" && inputArray.length === 1) { // resolves repeat problem since when a new number is clicked
        inputArray = [];
    }
    if(!isNaN(inputArray[inputArray.length - 1])) {
        inputArray[inputArray.length - 1] += numberValue;
    } else {
        inputArray.push(numberValue);
    }
    console.log(inputArray);
    displayValues(inputArray);
}
// --------------- HANDLE OPERATOR CLICK --------------- //
function operatorClicked() {
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
    return;
}
// --------------- ORDER OF OPERATIONS [PEMDAS] --------------- //
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
    oldData.result = new_result.toString();
    tempArr.push(oldData.result);
    displayValues(tempArr);
    return new_result;
}
// --------------- EQUAL SIGN HANDLER --------------- //
function equalSignClick() {
    decimal = false;
    var len = inputArray.length;
    if(len === 0) { // missing operands
        $("#display-area").text("Ready");
        return;
    }
    // was using this for operation rollover but code seems to work w/o this snippet
    // if(tempArr.length == 2 && tempArr[0] === "string") {
    //     tempArr.push(oldData.oldOp, oldData.result);
    //     orderOfOperations(tempArr);
    //     return;
    // }
    if(typeof inputArray[0] == "number" && inputArray.length === 1 ) {
        inputArray.push(oldData.oldOp, oldData.oldNum);
    } else if(len === 1) { // missing operation
        return inputArray;
    }
    if(typeof inputArray[0] === "string" && len === 2) {
        inputArray[2] = inputArray[0];
    }
    if(typeof inputArray[0] == "number" && inputArray.length <= 2) {
        inputArray.push(oldData.result);
    }
    if(len > 3 && isNaN(inputArray[len - 1])) {
        var lastIndex = inputArray.pop();
        oldData.lastOp = lastIndex;
    }
    orderOfOperations(inputArray);
    displayValues(inputArray);
}
// --------------- CLEAR BUTTON OBJ --------------- //
var clearObj = {
    clearLastEntry : function() {
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