$(document).ready(function(){
    applyClickHandlers();
});

var inputArray = [];
var decimal = false;
var operators = ['+', '-', 'x', '/'];


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
function numberClicked(number) {
    console.log('number clicked');
    inputArray.push($(this).text());
    if(typeof inputArray[0] === "number") {
        inputArray[inputArray[0].length] += number;
    }
    displayValues();
}

// --------------- HANDLE OPERATOR CLICK --------------- //
function operatorClicked() {
    console.log('operator clicked');
    inputArray.push($(this).text());
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
 order of associativity : multiply > divide > add > subtract
 trying to stray away from using a switch statement. will try to use this function to perform solving calculations
 notes: loop through array and check to see if operator is found
 if found, target character to the left of the operator then target character to the right of the operator
 keep that value and replace the operator position in array - return to baseline
 */
function orderOfOperations() {

}


// --------------- EQUAL SIGN HANDLER --------------- //
function equalSignClick() {
    console.log('equal sign clicked');

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

// --------------- CLEAR BUTTONS --------------- //
// function clearLastEntry() {
//     console.log('backspace clicked. removing last input');
//     if(inputArray[inputArray.length - 1] !== undefined) { // checks to see if there is a value in array
//         inputArray.pop();
//     }
//     displayValues();
// }
//
// function deleteAll() {
//     console.log('CE button pressed');
//     inputArray = [];
//     decimal = false;
//     displayValues();
// }