function calcularIdade(dataNascimento) {
  var hoje = new Date();
  var nascimento = new Date(dataNascimento);

  var anos = hoje.getFullYear() - nascimento.getFullYear();
  var meses = hoje.getMonth() - nascimento.getMonth();
  var dias = hoje.getDate() - nascimento.getDate();

  // Verifica se o aniversário já ocorreu neste ano ou se ainda vai ocorrer.
  if (meses < 0 || (meses === 0 && dias < 0)) {
    anos--;
    meses += 12;
  }

  // Verifica se o dia do mês de nascimento é maior que o dia atual.
  if (dias < 0) {
    var ultimoDiaMesAnterior = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      0
    ).getDate();
    dias += ultimoDiaMesAnterior;
    meses--;
  }

  return { anos: anos, meses: meses, dias: dias };
}

function limitarCaracteres() {
  // Limitando caracteres (DD/MM/YYYY)
  const input1 = document.getElementById("day");
  const input2 = document.getElementById("month");
  const input3 = document.getElementById("year");

  const maxLengthInput1 = 2;
  const maxLengthInput2 = 2;
  const maxLengthInput3 = 4;

  input1.addEventListener("input", function () {
    if (input1.value.length > maxLengthInput1) {
      input1.value = input1.value.slice(0, maxLengthInput1);
    }
  });

  input2.addEventListener("input", function () {
    if (input2.value.length > maxLengthInput2) {
      input2.value = input2.value.slice(0, maxLengthInput2);
    }
  });

  input3.addEventListener("input", function () {
    if (input3.value.length > maxLengthInput3) {
      input3.value = input3.value.slice(0, maxLengthInput3);
    }
  });
}

function validarNumeros(input) {
  const valor = input.value.replace(/[^\d]/g, ""); // Remove todos os caracteres não numéricos

  if (valor !== "" && !/^\d+$/.test(valor)) {
    input.value = input.value.slice(0, -1); // Remove o último caractere digitado se não for um número válido
  } else {
    input.value = valor; // Atualiza o valor do input com os caracteres numéricos
  }
}

function verificar() {
  var nascimento = {
    // Pega os valores dos inputs e converte-os em número.
    ano: Number(document.getElementById("year").value),
    mes: Number(document.getElementById("month").value),
    dia: Number(document.getElementById("day").value),
  };
  // Pega os elementos onde vai a resposta para o usuário.
  const day = document.getElementById("result-day");
  const month = document.getElementById("result-month");
  const year = document.getElementById("result-year");

  // Elementos de erro
  const errorDay = document.getElementById("error-day");
  const errorMonth = document.getElementById("error-month");
  const errorYear = document.getElementById("error-year");
  const errorDia = document.getElementById("day");
  const errorMes = document.getElementById("month");
  const errorAno = document.getElementById("year");
  const erroTitleDay = document.getElementById("title-day");
  const erroTitleMonth = document.getElementById("title-month");
  const erroTitleYear = document.getElementById("title-year");

  // Pega o ano Atual para efetuar as verificações, através do objeto date.
  const data = new Date();
  const anoAtual = data.getFullYear();

  // Limpando mensagens de erro.
  errorDay.innerHTML = "";
  errorMonth.innerHTML = "";
  errorYear.innerHTML = "";
  errorDia.style.border = "1.5px solid rgb(226, 226, 226);";
  errorMes.style.border = "1.5px solid rgb(226, 226, 226);";
  errorAno.style.border = "1.5px solid rgb(226, 226, 226);";
  erroTitleDay.style.color = "grey;";
  erroTitleMonth.style.color = "grey;";
  erroTitleYear.style.color = "grey;";

  //Verificação se tudo está correto para prosseguimento.
  if (
    nascimento.ano <= anoAtual &&
    nascimento.mes >= 1 &&
    nascimento.mes <= 12 &&
    nascimento.dia >= 1 &&
    nascimento.dia <= 31
  ) {
    // Cálculo da data usando a função calcularIdade.
    let dataNascimento = `${nascimento.ano}-${nascimento.mes}-${nascimento.dia}`;
    let idade = calcularIdade(dataNascimento);

    // Escrevendo a resposta no HTML
    year.innerHTML = `${idade.anos}`;
    month.innerHTML = `${idade.meses}`;
    day.innerHTML = `${idade.dias}`;

    //Informa que há um valor inválido.
  } else {
    // Limpando valores
    year.innerHTML = "--";
    month.innerHTML = "--";
    day.innerHTML = "--";

    // Fazendo as verificações do erro
    if (nascimento.dia < 1 || nascimento.dia > 31 || nascimento.dia == "") {
      errorDay.innerHTML = "Must be a valid day";
      errorDia.style.border = "0.5px solid red;";
    }

    if (nascimento.mes < 1 || nascimento.mes > 12 || nascimento.dia == "") {
      errorMonth.innerHTML = "Must be a valid month";
      errorMes.style.border = "0.5px solid red;";
    }

    if (
      nascimento.ano > anoAtual ||
      nascimento.ano == "" ||
      nascimento.ano <= 0
    ) {
      errorYear.innerHTML = "Must be in the past";
      errorAno.style.border = "0.5px solid red;";
    }
  }
}
