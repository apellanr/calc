$(document).ready(newCalculation);


let calc = null;

function newCalculation() {
    calc = new Calculator();
    calc.init();
}

function Calculator() {
    this.currentInput = [''];
    this.decimalUsed = false;
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

    this.eventHandlers = function() {
        console.log("event happening!!!");
        this.number.on('click', )
    };

    this.displayInput = function(value) {
        this.displayDiv.text(value);
    };
}