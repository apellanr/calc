$(document).ready(function(){
    applyClickHandlers();
});
var inputArray = [];
var historyArr = [];
var decimal = false;
var new_result;

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
// ============ LFZ START ============
function orderOfOperations(values) { // values represents the inputArray passed in on line 112
    // for loop that iterates through parameter length. start at index 1 increment every 2 indexes

        // if statement - values at a specific index equals the multiply operator, then do next line

            // global var "new_result" = value of character to the left of the operator times value of right of the operator. Fixed to two positions

            // splice values (position to the left of the operator found, removes 3, returns new_result);

            // decrement i by 2


        // if values at index is equal to division ("÷"), do work

            // global var "new_result" = value of character to the left of the operator divided by value of right of the operator. Fixed to two positions

            // splice values (position to the left of the operator found, removes 3, returns new_result);

            // decrement i by 2



    // for loop that iterates through parameter length. start at index 1 increment every 2 indexes for(var i = 1; i < values.length; i+=2) {

        // if values at index is equal to addition ("+"), do work

            // global var "new_result" = value of character to the left of the operator added to the value of right of the operator. Fixed to two positions

            // splice values (position to the left of the operator found, removes 3, returns new_result);

            // decrement i by 2

        // if values at index is equal to subtraction ("-"), do work

            // global var "new_result" = value of character to the left of the operator subtracted by value of right of the operator. Fixed to two positions

            // splice values (position to the left of the operator found, removes 3, returns new_result);

            // decrement i by 2



    // return new_result

}
// ============ LFZ END ============

// --------------- EQUAL SIGN HANDLER --------------- //
function equalSignClick() {
    var len = inputArray.length;
    if(len === 0) {
        $("#display-area").text("Ready");
        return;
    }
    if(len === 1) return inputArray; // missing operation
    if(len === 2) inputArray[2] = inputArray[0]; // partial operand
    if(len === 3) {
        historyArr.push(inputArray);
    }
    orderOfOperations(inputArray);
    displayValues();
    inputArray = [];
    console.log(inputArray);
}

// --------------- GLOBAL VARIABLES && CLEAR BUTTON OBJ --------------- //
var clearObj = {
    clearLastEntry : function() {
         // checks to see if there is a value in array
        inputArray.pop();
        displayValues();
    },
    deleteAll : function() {
        console.log('CE has been clicked');
        inputArray = [];
        decimal = false;
        displayValues();
    }
};