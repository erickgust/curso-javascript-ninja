(function (document) {
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
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

  const $cepForm = new DOM('[data-js="cep-form"]');
  const $cepInput = new DOM('[data-js="cep-input"]');
  const $logradouro = new DOM('[data-js="logradouro"]');
  const $bairro = new DOM('[data-js="bairro"]');
  const $estado = new DOM('[data-js="estado"]');
  const $cidade = new DOM('[data-js="cidade"]');
  const $cep = new DOM('[data-js="cep"]');
  const $status = new DOM('[data-js="status"]');
  const ajax = new XMLHttpRequest();

  $cepForm.on('submit', handleFormSubmit);
  $cepInput.on('input', handleCEPInput);

  function handleFormSubmit(event) {
    event.preventDefault();
    const cepValue = getCEP();
    const url = `https://ws.apicep.com/cep/${cepValue}.json`;
    ajax.open('GET', url);
    ajax.send();
    getMessage('loading');
    ajax.addEventListener('readystatechange', handleReadyStateChange);
  }

  function handleCEPInput() {
    return $cepInput.get()[0].value = cepMask(getCEP());
  }

  function getCEP() {
    return $cepInput.get()[0].value;
  }

  function cepMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  }

  function handleReadyStateChange() {
    if (isReadyOk()) {
      getMessage('success');
      fillTheInputFields();
    }
  }

  function fillTheInputFields() {
    const response = JSON.parse(ajax.responseText);
    if (!response.ok)
      getMessage('error');

    $logradouro.get()[0].value = response.address || '';
    $bairro.get()[0].value = response.district || '';
    $estado.get()[0].value = response.state || '';
    $cidade.get()[0].value = response.city || '';
    $cep.get()[0].value = response.code || '';
  }

  function getMessage(type) {
    const messages = {
      error: `Não encontramos o endereço para o CEP ${getCEP()}.`,
      loading: `Buscando informações para o CEP ${getCEP()}...`,
      success: `Endereço referente ao CEP ${getCEP()}:`
    };

    $status.get()[0].textContent = messages[type];
  }

  function isReadyOk() {
    return ajax.readyState === 4 && ajax.status === 200;
  }
})(document);
