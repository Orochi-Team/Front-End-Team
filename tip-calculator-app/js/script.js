// Variável de escopo Global
let percentage = 0;

function percent(selectedPercentage) {
  const customPercentage = parseFloat(document.getElementById("custom").value);
  percentage = !isNaN(customPercentage)
    ? customPercentage
    : parseFloat(selectedPercentage);
}

function calculate() {
  // Puxando elementos necessários HTML
  const ResTip = document.getElementById("TipAmount");
  const ResTotal = document.getElementById("TotalPerson");
  const Bill = parseFloat(document.getElementById("inputNum").value);
  const tot_people = parseInt(document.getElementById("inputPeople").value);

  // Elementos de erro HTML
  const bill_error = document.getElementById("bill-error");
  const tip_error = document.getElementById("tip-error");
  const people_error = document.getElementById("people-error");

  // Puxando elementos necessários CSS
  const style_people = document.getElementById("inputPeople");
  const style_bill = document.getElementById("inputNum");

  // Limpando elementos de erro
  style_bill.style.border = "none";
  style_people.style.border = "none";
  bill_error.innerHTML = "";
  tip_error.innerHTML = "";
  people_error.innerHTML = "";

  if (Bill > 0 && tot_people > 0 && percentage > 0) {
    // Fazendo o cálculo
    const total_tip = Bill * (percentage / 100);
    const total = Bill + total_tip;
    const tip_people = total_tip / tot_people;
    const total_people = total / tot_people;

    // Exibindo os resultados
    ResTip.innerHTML = `${tip_people.toFixed(2)}`;
    ResTotal.innerHTML = `${total_people.toFixed(2)}`;
  } else {
    // Limpando valores
    ResTip.innerHTML = "0.00";
    ResTotal.innerHTML = "0.00";

    if (Bill <= 0 || isNaN(Bill)) {
      bill_error.innerHTML = "Invalid Bill";
      style_bill.style.border = "1.5px solid red";
    }
    if (tot_people <= 0 || isNaN(tot_people)) {
      people_error.innerHTML = "Invalid Value";
      style_people.style.border = "1.5px solid red";
    }

    if (percentage <= 0 || isNaN(percentage)) {
      tip_error.innerHTML = "Invalid %";
    }
  }
}
function reset() {
  // Reset na página
  location.reload();
}
