$(document).ready(function(){
    applyClickHandlers();
});

var inputArray = [];
var decimal = false;
var operators = ['+', '-', 'x', '/'];

function applyClickHandlers() {
    $(".number").on('click', numberClicked);
    $(".operator").on('click', operatorClicked);
    $('.decimal').click(handleDecimals);
    $('.equals').click(equalSignClick);
    $('.backspace').click(clearLastEntry);
    $('.clearAll').click(deleteAll);
}

function numberClicked() {
    console.log('number clicked');
    inputArray.push($(this).text());
    console.log(inputArray);
    displayValues();
}

function operatorClicked() {
    console.log('operator clicked');
    inputArray.push($(this).text());
    displayValues();
}

// **** DECIMAL HANDLER **** //
function handleDecimals() {
    console.log('decimal pressed');
}

// **** DISPLAY INPUT **** //
function displayValues() {
    var values = inputArray.join('');
    $('#display-area').text(values);
}

// **** CALCULATE INPUTS **** //
function calculateValues(num1, num2, operator) {
    var firstIndex = parseFloat(num1);
    var lastIndex
}

// **** EQUAL SIGN HANDLER **** //
function equalSignClick() {
    console.log('equal sign clicked');

}

// **** CLEAR BUTTONS **** //
function clearLastEntry() {

}

function deleteAll() {

}