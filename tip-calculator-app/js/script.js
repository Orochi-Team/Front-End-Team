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

  // Puxando elementos necessários CSS
  const style_people = document.getElementById("inputPeople");
  const style_bill = document.getElementById("inputNum");

  // Limpando elementos de erro
  style_bill.style.border = "none";
  style_people.style.border = "none";

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
      style_bill.style.border = "2px solid red";
    }
    if (tot_people <= 0 || isNaN(tot_people)) {
      style_people.style.border = "2px solid red";
    }

    if (percentage <= 0 || isNaN(percentage)) {
    }
  }
}
function reset() {
  // Reset na página
  location.reload();
}
