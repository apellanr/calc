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
    console.log("operator has been clicked");
    decimal = false; //back to false if operator added. resolves multiple decimals
    var operator = $(this).text();
    var lastIndexVal = inputArray.length - 1;
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
        inputArray[inputArray.length -1] += decimalValue;
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
    for (var i = 1; i < values.length; i += 2) {
        if (values[i] === "*") {
            var new_result = (parseFloat(values[i - 1]) * parseFloat(values[i + 1])).toFixed(2);
            values.splice(i - 1, 3, new_result);
            i -= 2;
        }
        if (values[i] === "÷") {
            new_result = (parseFloat(values[i - 1]) / parseFloat(values[i + 1])).toFixed(2);
            values.splice(i - 1, 3, new_result);
            i -= 2;
        }
    }
    for(var i = 1; i < values.length; i+=2) {
        if (values[i] === '+') {
            new_result = (parseFloat(values[i-1]) + parseFloat(values[i + 1]));
            values.splice(i-1,3,new_result);
            i -= 2;
        }
        if(values[i] === "-") {
            new_result = parseFloat(values[i-1]) - parseFloat(values[i+1]);
            values.splice(i-1,3,new_result);
            i -= 2;
        }
    }
    return new_result;
}
// --------------- EQUAL SIGN HANDLER --------------- //
function equalSignClick() {
    if(inputArray.length === 0) {
        $("#display-area").text("Ready"); return;
    } else if(inputArray.length === 2) {

    }
    // if(inputArray.length === 3 && !isNaN(inputArray[inputArray.length - 1])) {
    //
    // }
    orderOfOperations(inputArray);
    displayValues();
    inputArray = [];
    console.log(inputArray);
}

function validateKeypress(event) {
    console.log('keypress test');
    if(event.keyCode === 13) {
        $("#equalButton").click()
    }
}
// --------------- GLOBAL VARIABLES && CLEAR BUTTON OBJ --------------- //
var clearObj = {
    clearLastEntry : function() {
        if(inputArray[inputArray.length - 1] !== undefined) { // checks to see if there is a value in array
            inputArray.pop();
        }
        displayValues();
    },
    deleteAll : function() {
        console.log('CE has been clicked');
        inputArray = [];
        decimal = false;
        displayValues();
    }
};