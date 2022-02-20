import { $, $all, formatValue, formatCurrency } from "./utils.js";

//FIELDS
const billField = $("[data-field-bill]");
const peopleField = $("[data-field-people]");
const optionFields = $all("[data-tip-option]");

//FIELDS RAW VALUES
let fieldValues = {
  bill: formatValue(billField.value),
  people: Number(peopleField.value),
  tip: Number(getTipPercent(optionFields)),
};

//TIP HANDLERS
function getTipPercent(data) {
  let checkedValue = "";

  data.forEach((field) => {
    if (field.checked) {
      checkedValue = field.value;
    }
  });

  return checkedValue;
}

function calculateTip(tipPercent) {
  return (fieldValues.tip / 100) * fieldValues.bill;
}

//INPUT HANDLERS
billField.oninput = () => {
  updateValues();
  updateUI();
};

peopleField.oninput = () => {
  if (peopleField.value === "0") peopleField.value = 1;
  updateValues();
  updateUI();
};

optionFields.forEach((field) => {
  field.addEventListener("click", () => {
    updateValues();
    updateUI();
  });
});

function updateValues() {
  fieldValues.bill = formatValue(billField.value);
  fieldValues.people = Number(peopleField.value);
  fieldValues.tip = Number(getTipPercent(optionFields));
}

//UI HANDLER
function updateUI() {
  $("[data-bill-amount]").innerHTML = formatCurrency(fieldValues.bill);
  $("[data-tip-amount]").innerHTML = formatCurrency(calculateTip());
  $("[data-total-sum-amount]").innerHTML = formatCurrency(
    fieldValues.bill + calculateTip()
  );
  $("[data-total-per-person-amount]").innerHTML = formatCurrency(
    (fieldValues.bill + calculateTip()) / (fieldValues.people || 1)
  );
}

const resetButton = $("[data-reset]");
resetButton.onclick = reset;

function reset() {
  billField.value = "";
  peopleField.value = "";

  optionFields.forEach((field) => {
    if (field.checked) field.checked = false;
  });

  updateValues();
  updateUI();
}
