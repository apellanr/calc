$(document).ready(newCalculation);


let calc = null;

function newCalculation() {
    calc = new Calculator();
    calc.init();
}

function Calculator() {
    var self = this;
    this.inputArray = [''];
    this.firstOperand = null;
    this.lastOperand = null;
    this.decimalUsed = false;
    this.operator = ['+', '-', '*', '/'];
    this.displayDiv = null;
    this.init = function() {
        this.number = $(".number");
        console.log("init number pressed: ", this);
        this.operator = $(".operator");
        this.decimal = $(".decimal");
        this.equals = $(".equals");
        this.backspace = $(".backspace");
        this.clearAll = $(".clearAll");
        this.displayDiv = $("#display-area");
        this.eventHandlers();
    };

    this.eventHandlers = function() {
        // .bind changes context of this manually
        this.number.on('click', this.numberClicked);
    };

    // when number was being pressed was receiving an error of 'text' undefined
    // this was referring to the constructor object rather than the button
    this.numberClicked = function() {
        console.log("number has been clicked");
        this.currentNumber = this.number.text();
        console.log(this.currentNumber);
    };

    this.displayInput = function() {
        // this.displayDiv.text();
    };


}