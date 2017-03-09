$(document).ready(function(){ //when page loads run jQuery
    clickHandlers();
});

//*** GLOBAL VARS ***//
var arrayForInput = [""];
var index = 0; // index position start is 0
var validateOperator = [['*'], ['/'], ['+'], ['-']];
var display; //for display input

function clickHandlers(){
    $('.number').click(numbersClicked);

}

// WHEN NUMBER BUTTONS CLICKED

function numbersClicked() {
    // console.log('number was pressed');
    if(arrayForInput.length === 1) {
        // hopefully will store number in input array
        arrayForInput[index] += $(this).text();
        console.log('first number click ', arrayForInput);
        displayInput(); // call display input
    } else if(validateOperator.indexOf(arrayForInput[arrayForInput.length - 1]) !== -1){
        index++; //increment index position if validate operator DOES NOT equal not found (-1)
        arrayForInput[index] = ""; //next position will be new string
        arrayForInput[index] += $(this).text();
        //console.log('arrayForInput test 2', arrayForInput);
        displayInput();
    } else {
        arrayForInput[index] += $(this).text();
        displayInput();
    }
}

// TOTAL || EQUALS



// DISPLAY VALUES

function displayInput() {
    display = arrayForInput.join(''); //will join indexes in array into string
    $('#display-area').text(display); // target display area and will emit joined str into calc area
}

