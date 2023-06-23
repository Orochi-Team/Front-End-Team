// Variáveis de escopo global
let vTitular = undefined;
let vCNumber = undefined;
const data = new Date();
const anoAtual = data.getFullYear().toString().slice(-2);

function formatarEntrada() {
  const inputCardNumber = document.getElementById("card-number");

  let cNumber = inputCardNumber.value;

  // Remove todos os espaços em branco
  cNumber = cNumber.replace(/\s/g, "");

  // Limita o valor a no máximo 16 caracteres
  cNumber = cNumber.slice(0, 16);

  // Adiciona espaço a cada 4 caracteres
  cNumber = cNumber.replace(/(.{4})/g, "$1 ");

  // Atualiza o valor do campo de entrada
  inputCardNumber.value = cNumber;

  // Valida a entrada
  validarEntrada();
}

function validarEntrada() {
  const regexNumber = /^\d+$/; // Expressão regular para validar números (apenas dígitos)
  const regexString = /^[a-zA-ZÀ-ÿ ]+$/; // Expressão regular pra validar se contém apenas letras.
  const stringTitular = document
    .getElementById("titular")
    .value.replace(/\s/g, "")
    .trim(); // Remove espaços em branco
  const stringcNumber = document
    .getElementById("card-number")
    .value.replace(/\s/g, "")
    .trim(); // Remove espaços em branco

  // Verifica se a string está vazia ou contém apenas números
  vTitular = stringTitular.length > 0 && regexString.test(stringTitular);
  vCNumber = stringcNumber.length > 0 && regexNumber.test(stringcNumber);
}

function validarNumeros(input) {
  const valor = input.value.replace(/[^\d]/g, ""); // Remove todos os caracteres não numéricos

  if (valor !== "" && !/^\d+$/.test(valor)) {
    input.value = input.value.slice(0, -1); // Remove o último caractere digitado se não for um número válido
  } else {
    input.value = valor; // Atualiza o valor do input com os caracteres numéricos
  }
}

function limitarCaracteres() {
  // Limitando caracteres Exp. Card (MM/YY/CVC)
  const input1 = document.getElementById("expiration-month");
  const input2 = document.getElementById("expiration-year");
  const input3 = document.getElementById("cvc");

  const maxLengthInput1 = 2;
  const maxLengthInput2 = 2;
  const maxLengthInput3 = 3;

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

function buttons() {
  // Desabilita o botão "continue"
  const continueButton = document.getElementById("confirm-button");
  continueButton.style.display = "none";
  continueButton.disabled = true;

  // Exibe o botão "remake"
  const remakeButton = document.getElementById("remake");
  remakeButton.style.display = "block";
  remakeButton.disabled = false;
}

function refreshPage() {
  // Refresh na página
  location.reload();
}

function verificar() {
  // Puxando os elementos necessários do HTML.
  const titular = document.getElementById("titular").value;
  const cardNum = document.getElementById("card-number").value;
  const expMonth = document.getElementById("expiration-month").value;
  const expYear = document.getElementById("expiration-year").value;
  const cvc = document.getElementById("cvc").value;
  const numCard = document.getElementById("num-card");
  const titularCard = document.getElementById("card-titular");
  const expDate = document.getElementById("exp-date");
  const cvcCard = document.getElementById("cvc-number");
  const button = document.getElementById("continue-button");
  const errorTitular = document.getElementById("error-titular");
  const errorCNumber = document.getElementById("error-cNumber");
  const errorMonth = document.getElementById("error-month");
  const errorYear = document.getElementById("error-year");
  const errorCVC = document.getElementById("error-cvc");

  // Limpando elementos de erro, HTML
  errorTitular.innerHTML = "";
  errorCNumber.innerHTML = "";
  errorMonth.innerHTML = "";
  errorYear.innerHTML = "";
  errorCVC.innerHTML = "";

  // Puxando elementos necessários pra modificar o CSS.
  const titularElement = document.getElementById("titular");
  const labels = document.querySelectorAll("label");
  const cNumberElement = document.getElementById("card-number");
  const expContainer = document.querySelectorAll(".expiration-container");
  const completElement = document.querySelectorAll(".complet");
  const styleTitular = document.getElementById("titular");
  const styleCNumber = document.getElementById("card-number");
  const styleMonth = document.getElementById("expiration-month");
  const styleYear = document.getElementById("expiration-year");
  const styleCVC = document.getElementById("cvc");

  // Limpando os elementos de erro, CSS
  styleTitular.style.border = "1px solid #ccc";
  styleCNumber.style.border = "1px solid #ccc";
  styleMonth.style.border = "1px solid #ccc";
  styleYear.style.border = "1px solid #ccc";
  styleCVC.style.border = "1px solid #ccc";

  if (
    vTitular == true &&
    vCNumber == true &&
    expMonth >= 1 &&
    expMonth <= 12 &&
    expYear >= anoAtual &&
    expYear < 100 &&
    cvc > 0 &&
    cvc.length == 3
  ) {
    //Modificando elementos CSS
    buttons();
    titularElement.style.display = "none";
    labels.forEach((label) => {
      label.style.display = "none";
    });
    cNumberElement.style.display = "none";
    expContainer.forEach((container) => {
      container.style.display = "none";
    });
    completElement.forEach((element) => {
      element.style.display = "flex"; // ou element.style.display = "inline";
    });

    // Passando valores do Input para o Card.
    numCard.innerHTML = `${cardNum}`;
    titularCard.innerHTML = `${titular}`;
    expDate.innerHTML = `${expMonth}/${expYear}`;
    cvcCard.innerHTML = `${cvc}`;
  } else {
    // Validação de erros Input Titular
    if (titular == "") {
      styleTitular.style.border = "0.5px solid red";
      errorTitular.style.color = "red";
      errorTitular.innerHTML = `Can't be blank`;
    }
    if (vTitular == false) {
      styleTitular.style.border = "0.5px solid red";
      errorTitular.style.color = "red";
      errorTitular.innerHTML = `Wrong format, letters only`;
    }

    // Validação de erros Input Card Number
    if (cardNum == "") {
      styleCNumber.style.border = "0.5px solid red";
      errorCNumber.style.color = "red";
      errorCNumber.innerHTML = `Can't be blank`;
    }
    if (vCNumber == false) {
      styleCNumber.style.border = "0.5px solid red";
      errorCNumber.style.color = "red";
      errorCNumber.innerHTML = `Wrong format, numbers only`;
    }

    // Validação de erros Input Exp Card
    if (expMonth == "") {
      styleMonth.style.border = "0.5px solid red";
      errorMonth.style.color = "red";
      errorMonth.innerHTML = `Cant't be blank`;
    }
    if (expMonth > 12 || expMonth < 1) {
      styleMonth.style.border = "0.5px solid red";
      errorMonth.style.color = "red";
      errorMonth.innerHTML = `Invalid month`;
    }
    if (expYear == "") {
      styleYear.style.border = "0.5px solid red";
      errorYear.style.color = "red";
      errorYear.innerHTML = `Cant't be blank`;
    }
    if (expYear < anoAtual) {
      styleYear.style.border = "0.5px solid red";
      errorYear.style.color = "red";
      errorYear.innerHTML = `Invalid year`;
    }
    if (cvc == "" || cvc <= 0 || cvc.length < 3) {
      styleCVC.style.border = "0.5px solid red";
      errorCVC.style.color = "red";
      errorCVC.innerHTML = `Invalid CVC`;
    }
  }
}
