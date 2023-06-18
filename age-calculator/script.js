function calcularIdade(dataNascimento) {
  var hoje = new Date();
  var nascimento = new Date(dataNascimento);

  var anos = hoje.getFullYear() - nascimento.getFullYear();
  var meses = hoje.getMonth() - nascimento.getMonth();
  var dias = hoje.getDate() - nascimento.getDate();

  // Verifica se o aniversário já ocorreu neste ano ou se ainda vai ocorrer
  if (meses < 0 || (meses === 0 && dias < 0)) {
    anos--;
    meses += 12;
  }

  // Verifica se o dia do mês de nascimento é maior que o dia atual
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

function verificar() {
  var nascimento = {
    // Pega os valores dos inputs e converte-os em número
    ano: Number(document.getElementById("year").value),
    mes: Number(document.getElementById("month").value),
    dia: Number(document.getElementById("day").value),
  };
  // Pega os elementos onde vai a resposta para o usuário
  let day = document.getElementById("result-day");
  let month = document.getElementById("result-month");
  let year = document.getElementById("result-year");

  // Elementos de erro
  let errorDay = document.getElementById("error-day");
  let errorMonth = document.getElementById("error-month");
  let errorYear = document.getElementById("error-year");
  let errorDia = document.getElementById("day");
  let errorMes = document.getElementById("month");
  let errorAno = document.getElementById("year");
  erroTitleDay = document.getElementById("title-day");
  erroTitleMonth = document.getElementById("title-month");
  erroTitleYear = document.getElementById("title-year");

  // Pega o ano Atual para efetuar as verificações, através do objeto date
  let data = new Date();
  let anoAtual = data.getFullYear();

  //Verificação se tudo está correto para prosseguimento
  if (
    nascimento.ano <= anoAtual &&
    nascimento.mes >= 1 &&
    nascimento.mes <= 12 &&
    nascimento.dia >= 1 &&
    nascimento.dia <= 31
  ) {
    // Cálculo da data usando a função calcularIdade
    let dataNascimento = `${nascimento.ano}-${nascimento.mes - 1}-${
      nascimento.dia
    }`;

    let idade = calcularIdade(dataNascimento);

    // Escrevendo a resposta no HTML
    year.innerHTML = `${idade.anos}`;
    month.innerHTML = `${idade.meses}`;
    day.innerHTML = `${idade.dias}`;

    // Limpar mensagens de erro e classes de estilo inválido
    errorDay.textContent = "";
    errorMonth.textContent = "";
    errorYear.textContent = "";
    errorDia.style = "border: 1.5px solid rgb(226, 226, 226);";
    errorMes.style = "border: 1.5px solid rgb(226, 226, 226);";
    errorAno.style = "border: 1.5px solid rgb(226, 226, 226);";
    erroTitleDay.style = "color: grey;";
    erroTitleMonth.style = "color: grey;";
    erroTitleYear.style = "color: grey;";

    //Informa que há um valor inválido
  } else {
    if (nascimento.dia < 1 || nascimento.dia > 31) {
      errorDay.textContent = "Must be a valid day";
      document.getElementById("title-day").classList.add("invalid");
      document.getElementById("day").classList.add("error");
      var borderDay = document.createElement("borderday");
      borderDay.innerHTML = "border: 0.5px solid red;";
      document.head.appendChild(borderDay);
      document.getElementById("day").classList.add("style");
    } else {
      return;
    }

    if (nascimento.mes < 1 || nascimento.mes > 12) {
      errorMonth.textContent = "Must be a valid month";
      document.getElementById("title-month").classList.add("invalid");
      document.getElementById("month").classList.add("error");
      var borderMonth = document.createElement("bordermonth");
      borderMonth.innerHTML = "border: 0.5px solid red;";
      document.head.appendChild(borderMonth);
      document.getElementById("month").classList.add("style");
    } else {
      return;
    }

    if (nascimento.ano > anoAtual) {
      errorYear.textContent = "Must be in the past";
      document.getElementById("title-year").classList.add("invalid");
      document.getElementById("year").classList.add("error");
      var borderYear = document.createElement("borderyear");
      borderYear.innerHTML = "border: 0.5px solid red;";
      document.head.appendChild(borderYear);
      document.getElementById("month").classList.add("style");
    } else {
      return;
    }
  }
}
