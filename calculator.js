$(document).ready(function () { //when page loads run jQuery
    clickHandlers();
    arithmetic();
});

//*** GLOBAL VARS ***//
var inputArray = [""];
// var index = 0; // index position start is 0
// var operatorVal = ['*', '/', '+', '-'];
var calcDisplay; //for display input

function clickHandlers() {
    $('.number').click(numbersClicked);
    $('.operator').click(operatorClicked);
    $('.equals').click(equalSignClick);
    $('.clear_everything').click(clearEntry);
}

// WHEN NUMBER BUTTONS CLICKED

function numbersClicked() {
    // console.log('number was pressed');
    var numberValue = $(this).text(); // value of number stored
    // console.log('number clicked: ', numberValue);
    console.log(inputArray);
    var valueLastIndex = inputArray.length - 1;
    if (!isNaN(inputArray[valueLastIndex])) { // IS NOT NaN, checks last index
        inputArray[valueLastIndex] += numberValue;
        console.log(inputArray);
    }
    else {
        inputArray.push(numberValue); //pushed into array
        console.log(inputArray);
    }
    displayInput();
}

//OPERATOR CLICK
function operatorClicked() {
    var smoothOperator = $(this).text();
    console.log('operator button click: ', smoothOperator);
    // if(inputArray.length === 3) {
    //
    // }
    var valueLastIndex = inputArray.length - 1;
    if (!isNaN(inputArray[valueLastIndex])) { //check if last index is a number
        inputArray.push(smoothOperator);
    }
    else {
        inputArray[valueLastIndex] = smoothOperator;
    }
    displayInput();
}


// BASIC MATH FUNCTIONS
function arithmetic(num1, num2, op) {
    num1 = parseInt(num1); //parse string and return floating point num
    num2 = parseInt(num2); //same method for num2
    // op = arrayForInput[1];

    // divide by zero
    if (num2 === 0 && op === "/") {
        console.log("Input Error");
        $('#display-area').text(answer);
        return;
    }
    switch (op) {
        case '+':
            return num1 + num2;
            break;
        case '-':
            return num1 - num2;
            break;
        case '/':
            return num1 / num2;
            break;
        case '*':
        case 'X':
        case 'x':
            return num1 * num2;
            break;
        case '√':
            return Math.sqrt(num1);
            break;
        case '^':
            return Math.pow(num1);
            break;
    }
    displayInput();
}

// TOTAL || EQUALS
function equalSignClick() {
    console.log("here comes some values");
    if (inputArray === 2) { //takes care of operator repeat
        inputArray[2] === inputArray[0];
    }
    if (inputArray.length < 3) { //need to work on this code
        console.log("need more for math");
    }
    if (inputArray.length >= 3) {
        console.log(inputArray);
    }
    var num1 = inputArray[0];
    var num2 = inputArray[2];
    var op = inputArray[1];
    var result = arithmetic(num1, num2, op);
    inputArray.splice(0,3, result);
    displayInput();
}


// DISPLAY VALUES
function displayInput() {
    calcDisplay = inputArray.join(''); //will join indexes in array into string
    $('#display-area').text(calcDisplay); // target display area and will emit joined str into calc area
}

// CLEAR EVERYTHING
function clearEntry() {
    console.log("you cleared everything");
    $('#display-area').text('0');
    inputArray = [""];
    // index = 0; //resets index back to 0 on clear entry button click
    // console.log('clean everything: ', arrayForInput + 'index #: ', index);
    displayInput();
}
