(function($) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  const app = function() {
    return {
      init() {
        this.companyInfo();
        this.initEvents();
      },

      initEvents() {
        $('[data-js="cars-form"]').on('submit', this.handleSubmit);
      },

      handleSubmit(event) {
        event.preventDefault();
        const $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar() {
        const $fragment = document.createDocumentFragment();
        const $tr = document.createElement('tr');
        const $tdModel = document.createElement('td');
        const $tdYear = document.createElement('td');
        const $tdPlate = document.createElement('td');
        const $image = this.createImage();
        const $color = this.createColor();

        $tdModel.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;

        $tr.appendChild($image);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($color);

        return $fragment.appendChild($tr);
      },

      createColor() {
        const $tdColor = document.createElement('td');
        const $divColor = document.createElement('div');

        $divColor.style.backgroundColor = $('[data-js="color"]').get().value;
        $divColor.style.width = '45px';
        $divColor.style.height = '45px';

        $tdColor.appendChild($divColor);
        return $tdColor;
      },

      createImage() {
        const $tdImage = document.createElement('td');
        const $imageRender = document.createElement('img');

        $imageRender.src = $('[data-js="image"]').get().value;
        $imageRender.alt = $('[data-js="brand-model"]').get().value;
        $imageRender.width = 100;

        $tdImage.appendChild($imageRender);
        return $tdImage;
      },

      companyInfo() {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', './company.json');
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo)
      },

      getCompanyInfo() {
        if(!app.isReadyOk.call(this))
          return;

        const response = JSON.parse(this.responseText);
        const $companyName = $('[data-js="company-name"]').get();
        const $companyPhone = $('[data-js="company-phone"]').get();

        $companyName.textContent = response.name;
        $companyPhone.textContent = response.phone;
      },

      isReadyOk() {
        return this.readyState === 4 && this.status === 200;
      }
    };
  }();

  app.init();
})(DOM);
