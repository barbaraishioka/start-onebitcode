const billInput = document.getElementById("bill");
const serviceQuality = document.getElementById("serviceQuality");
const amountOfPeople = document.getElementById("amountOfPeople");
const totalTip = document.getElementById("totalTip");
const tip = document.getElementById("tip");
const each = document.querySelectorAll(".each");
const totalBill = document.getElementById("totalBill");
const totalBillValue = document.getElementById("totalBillValue");

billInput.addEventListener("input", function (event) {
  if (event.target.dataset.type === "currency") {
    formatCurrencyInput(event.target);
  }
});

function formatCurrencyInput(input) {
  const value = input.value.replace(/\D/g, "");
  const formattedValue = formatCurrency(value);
  input.value = formattedValue;
}

function formatCurrency(value) {
  if (!value) return "";

  const numericValue = parseFloat(value) / 100;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
}

function calculateTip(event) {
  event.preventDefault();
  let billRemoveCaracteres = billInput.value.replace(/[^0-9,-]/g, "");
  let billFormatToNumber = parseFloat(billRemoveCaracteres.replace(",", "."));

  let calculateTip;
  let calculateTotalBill;

  if (serviceQuality.value === "?") {
    alert("Por favor, escolha uma opção sobre a qualidade do nosso serviço.");
    return;
  }

  if (serviceQuality.value <= 0) {
    calculateTip = 0;
    calculateTotalBill = billFormatToNumber / amountOfPeople.value;
  }

  if (serviceQuality.value > 0) {
    calculateTip =
      (billFormatToNumber * serviceQuality.value) / amountOfPeople.value;

    calculateTotalBill =
      (billFormatToNumber + calculateTip) / amountOfPeople.value;
  }

  tip.innerHTML = calculateTip;
  totalBillValue.innerHTML = calculateTotalBill;

  if (amountOfPeople.value > 1) {
    each.forEach((each) => {
      each.style.display = "inline";
    });
  }

  totalTip.style.display = "block";
  totalBill.style.display = "block";
}

document.getElementById("tipsForm").addEventListener("submit", calculateTip);
