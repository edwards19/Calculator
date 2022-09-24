const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display');
const calculatorButtonsDiv = document.querySelector('.calculator__keys');

calculatorButtonsDiv.addEventListener('click', (event) => {
  if (!event.target.closest('button')) return;
  const button = event.target;
  const { buttonType, key } = button.dataset;
  const { previousButtonType } = calculator.dataset;
  const displayValue = display.textContent;
  
  if (buttonType === 'number') {
    if (displayValue === '0') {
      display.textContent = key;
    } else {
      display.textContent = displayValue + key;
    }

    if (previousButtonType === 'operator') {
      display.textContent = key;
    }
  }

  if (buttonType === 'decimal') {
    if (!displayValue.includes('.')) {
      display.textContent = displayValue + '.';
    }
  }

  if (buttonType === 'operator') {
    calculator.dataset.firstValue = displayValue;
    calculator.dataset.operator = key;
  }

  calculator.dataset.previousButtonType = buttonType;
})