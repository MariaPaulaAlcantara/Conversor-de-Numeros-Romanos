class ConversorRomanos {
  constructor() {
    this.tabelaConversao = {
      'M̅': 1000000,
      'D̅': 500000,
      'C̅': 100000,
      'L̅': 50000,
      'X̅': 10000,
      'V̅': 5000,
      'M': 1000,
      'CM': 900,
      'D': 500,
      'CD': 400,
      'C': 100,
      'XC': 90,
      'L': 50,
      'XL': 40,
      'X': 10,
      'IX': 9,
      'V': 5,
      'IV': 4,
      'I': 1
    };
  }

  converterParaRomano(numero) {
    let romano = '';
    for (let chave in this.tabelaConversao) {
      while (numero >= this.tabelaConversao[chave]) {
        romano += chave;
        numero -= this.tabelaConversao[chave];
      }
    }
    return romano;
  }

  converterParaDecimal(romano) {
    let numero = 0;
    let i = 0;
    while (i < romano.length) {
      let caractere1 = romano[i];
      let caractere2 = romano[i + 1];
      let doisCaracteres = caractere1 + caractere2;
      let valor1 = this.tabelaConversao[caractere1] || 0;
      let valor2 = this.tabelaConversao[doisCaracteres] || 0;
      if (valor2 > valor1) {
        numero += valor2;
        i += 2;
      } else {
        numero += valor1;
        i++;
      }
    }
    return numero;
  }

  corrigirNumeroRomano(romano) {
    return this.converterParaRomano(this.converterParaDecimal(romano));
  }

  validarDecimal(numero) {
    return !isNaN(numero) && numero >= 1 && numero <= 399999;
  }

  mostrarAlerta(mensagem, tipo = 'error') {
    Swal.fire({
      icon: tipo,
      title: tipo === 'error' ? 'Erro' : 'Informação',
      text: mensagem
    });
  }
}

class InterfaceConversor {
  constructor() {
    this.conversor = new ConversorRomanos();
    this.inicializarEventos();
  }

  inicializarEventos() {
    $("#converter_decimal").click(() => this.converterDecimal());
    $("#converter_romano").click(() => this.converterRomano());
  }

  converterDecimal() {
    let numero = parseInt($("#entrada_numero_decimal").val(), 10);
    if (this.conversor.validarDecimal(numero)) {
      $("#entrada_numero_romano").val(this.conversor.converterParaRomano(numero));
    } else {
      $("#entrada_numero_romano").val('');
      this.conversor.mostrarAlerta('O valor deve estar entre 1 e 399999.');
    }
  }

  converterRomano() {
    let romano = $("#entrada_numero_romano").val().toUpperCase();
    let numero = this.conversor.converterParaDecimal(romano);
    let romanoCorrigido = this.conversor.corrigirNumeroRomano(romano);

    if (!this.conversor.validarDecimal(numero)) {
      $("#entrada_numero_decimal").val('');
      $("#entrada_numero_romano").val('');
      this.conversor.mostrarAlerta('O número Romano inserido é inválido.');
    } else {
      $("#entrada_numero_decimal").val(numero);
      if (romano !== romanoCorrigido) {
        this.conversor.mostrarAlerta(`O número Romano inserido foi corrigido para ${romanoCorrigido} e corresponde ao valor ${numero}.`, 'info');
        $("#entrada_numero_romano").val(romanoCorrigido);
      }
    }
  }
}

$(document).ready(() => {
  new InterfaceConversor();
});
