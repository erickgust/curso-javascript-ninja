(function (document) {
  'use strict';
  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elemento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */

  function DOM(nodeString) {
    this.element = document.querySelectorAll(nodeString);
  }

  DOM.prototype.on = function (event, callback) {
    this.element.forEach(function (element) {
      element.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.off = function (event, callback) {
    this.element.forEach(function (element) {
      element.removeEventListener(event, callback, false);
    });
  };

  DOM.prototype.get = function () {
    return this.element;
  };

  DOM.prototype.forEach = function () {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function () {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function () {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function () {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function () {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function () {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function () {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.createIs = function (stringType) {
    return function (param) {
      return Object.prototype.toString.call(param) === stringType;
    };
  };

  DOM.createIsNull = function (stringType) {
    return function (param) {
      return Object.prototype.toString.call(param) === stringType
        || Object.prototype.toString.call(param) === '[object Undefined]';
    };
  };

  DOM.isArray = DOM.createIs('[object Array]');
  DOM.isObject = DOM.createIs('[object Object]');
  DOM.isFunction = DOM.createIs('[object Function]');
  DOM.isNumber = DOM.createIs('[object Number]');
  DOM.isString = DOM.createIs('[object String]');
  DOM.isBoolean = DOM.createIs('[object Boolean]');
  DOM.isNull = DOM.createIsNull('[object Null]');

  const $a = new DOM('[data-js="link"]');
  $a.forEach(function(item) {console.log(item.firstChild.nodeValue)});

  console.log(DOM.isArray([]));
  console.log(DOM.isObject({}));
  console.log(DOM.isFunction(function() {}));
  console.log(DOM.isNumber(1));
  console.log(DOM.isString('a'));
  console.log(DOM.isBoolean(false));
  console.log(DOM.isNull(null));
  console.log(DOM.isNull());
})(document);
