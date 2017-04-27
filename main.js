$(document).ready(newCalculation);

let calculation = null;

function newCalculation() {
    calculation = new Calculator();
    calculation.init();
}

function Calculator() {
    var self = this;
    this.inputArray = [];
    this.firstOperand = null;
    this.lastOperand = null;
    this.decimalUsed = false;
    this.operator = ['+', '-', '*', '/'];
    this.displayDiv = null;
    this.init = function() {
        this.number = $(".number");
        this.operator = $(".operator");
        this.decimal = $(".decimal");
        this.equals = $(".equals");
        this.backspace = $(".backspace");
        this.clearAll = $(".clearAll");
        this.displayDiv = $("#display-area");
        this.eventHandlers();
    };

    // **** EVENT HANDLERS **** //
    this.eventHandlers = function() {
        // .bind changes context of this manually
        this.number.on('click', this.numberClicked);
        this.operator.on('click', this.operatorClicked);
        this.equals.click(this.solveCalculation);
        this.backspace.click()
    };

    // **** HANDLE NUMBER CLICK **** //
    this.numberClicked = function(number) {
        console.log("number was clicked ");
        self.inputArray.push($(this).text()); // this was referring to the button clicked rather than the constructor object
        self.displayInput(); // needed to use 'self' to reference the constructor again
    };

    // **** HANDLE OPERATOR CLICK **** //
    this.operatorClicked = function() {
        console.log("operator was clicked");
        self.inputArray.push($(this).text());
        // this.displayInput();
    };

    // **** PERFORM LOGIC **** //
    this.doMath = function(num1, num2, operator) {
    var num1 = parseFloat(num1);
    var num2 = parseFloat(num2);

    switch(operator) {
        case '+':
            var result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        default:
            console.log("invalid entry");
            break;
    }
    return result;
};

    // **** HANDLE OUTPUT **** //
    this.displayInput = function() {
        // console.log('displaying output');
        var calcDisplay = self.inputArray.join('');
        this.displayDiv.text(calcDisplay);
    };

    // **** HANDLE EQUAL SIGN CLICK **** //
    this.solveCalculation = function() {

    };

    // **** ADVANCED OPERATIONS **** //

}