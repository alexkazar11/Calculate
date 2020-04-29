class Calculator {
	constructor(lastOperandText, currentOperandText) {
		this.lastOperandText = lastOperandText;
		this.currentOperandText = currentOperandText;
		this.clear();
		this.resultIsShown = false;
	}

	clear() {
		this.currentOperand = '';
		this.lastOperand = '';
		this.operation = undefined;
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) {
			return;
		}
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	changeSign() {
		this.currentOperand = -this.currentOperand;
	}

	findPercentage() {
		this.currentOperand = this.currentOperand * 0.01;
		this.resultIsShown = true;
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') {
			return;
		}
		if (this.lastOperand !== '') {
			this.calculate();
		}
		this.operation = operation;
		this.lastOperand = this.currentOperand;
		this.currentOperand = '';
	}

	calculate() {
		let result;
		const last = parseFloat(this.lastOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(last) || isNaN(current)) {
			return;
		}

		switch (this.operation) {
			case '+':
				result = last + current;
				break;
			case '-':
				result = last - current;
				break;
			case 'x':
				result = last * current;
				break;
			case '÷':
				result = last / current;
				break;
			default:
				return;
		}

		this.resultIsShown = true;
		this.lastOperand = '';
		this.currentOperand = result;
		this.operation = undefined;
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.lastOperandText.innerText =
				`${this.getDisplayNumber(this.lastOperand)} ${this.operation}`;
		} else {
			this.lastOperandText.innerText = '';
		}

	}

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const percentButton = document.querySelector('[data-percent]');
const clearButton = document.querySelector('[data-clear]');
const changeSignButton = document.querySelector('[data-change-sign]');
const lastOperandText = document.querySelector('[data-last-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(lastOperandText, currentOperandText);

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		if (calculator.resultIsShown) {
			calculator.clear();
			calculator.resultIsShown = false;
		}
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', button => {
	calculator.calculate();
	calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
});

changeSignButton.addEventListener('click', button => {
	calculator.changeSign();
	calculator.updateDisplay();
});

percentButton.addEventListener('click', button => {
	calculator.findPercentage();
	calculator.updateDisplay();
});