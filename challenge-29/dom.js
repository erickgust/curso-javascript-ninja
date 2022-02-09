(function (window, document) {
  'use strict';

  function DOM(nodeString) {
    if (!(this instanceof DOM))
      return new DOM(nodeString);

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

  DOM.prototype.get = function (index) {
    if (!index)
      return this.element[0];
    return this.element[index];
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

  window.DOM = DOM;
})(window, document);
