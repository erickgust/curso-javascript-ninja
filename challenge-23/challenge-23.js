(function (document) {
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */
  const $inputScreen = document.querySelector('[data-js="screen"]');
  const $buttonsNumbers = document.querySelectorAll('[data-js="button-number"]');
  const $buttonsOperations = document.querySelectorAll('[data-js="button-operation"]');
  const $buttonEqual = document.querySelector('[data-js="button-equal"]');
  const $buttonCE = document.querySelector('[data-js="button-ce"]');
  const allOperations = {
    '+': function([number1, number2]) {return +number1 + +number2},
    '-': function([number1, number2]) {return +number1 - +number2},
    'x': function([number1, number2]) {return +number1 * +number2},
    '÷': function([number1, number2]) {return +number1 / +number2}
  };

  function handleClickCE() {
    $inputScreen.value = 0;
  }

  function handleClickNumber(button) {
    return function () {
      const isZeroAtStart = +$inputScreen.value === 0;
      return isZeroAtStart
        ? $inputScreen.value = button.value
        : $inputScreen.value += button.value;
    };
  }

  function handleClickOperation(button) {
    return function() {
      return $inputScreen.value = isLastItemAnOperator()
        ? $inputScreen.value.replace(/[+\-x÷]$/, button.value)
        : $inputScreen.value += button.value;
    };
  }

  function isLastItemAnOperator() {
    const lastItem = $inputScreen.value.slice(-1);
    const isLastItemOperator = /[+\-x÷]/.test(lastItem);
    return isLastItemOperator;
  }

  function handleClickEqual() {
    $inputScreen.value = isLastItemAnOperator()
      ? $inputScreen.value.slice(0, -1)
      : $inputScreen.value;
    const newOperation = handleOperationSignal($inputScreen.value, /\d+([x÷])\d+/);
    $inputScreen.value = handleOperationSignal(newOperation, /\d+([-+])\d+/);
  }

  function handleOperationSignal(operation, regex) {
    const hasSignal = regex.test(operation);
    return hasSignal
      ? solveOperation(operation, regex)
      : operation;
  }

  function solveOperation(operation, regex) {
    const [operationMatch, operationSignal] = operation.match(regex);
    const operationResult = allOperations[operationSignal](operationMatch.split(operationSignal));
    const addResultInOperation = operation.split(operationMatch).join(operationResult);
    return handleOperationSignal(addResultInOperation, regex);
  }

  $buttonCE.addEventListener('click', handleClickCE, false);

  $buttonsNumbers.forEach(function (button) {
    const addNumber = handleClickNumber(button);
    button.addEventListener('click', addNumber, false);
  });

  $buttonsOperations.forEach(function (button) {
    const addOperator = handleClickOperation(button);
    button.addEventListener('click', addOperator, false);
  });

  $buttonEqual.addEventListener('click', handleClickEqual, false);
})(document);
