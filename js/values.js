import { $, $all, formatValue, formatCurrency } from "./utils.js";

//FIELDS
const billField = $("[data-field-bill]");
const peopleField = $("[data-field-people]");
const optionFields = $all("[data-tip-option]");

//FIELDS RAW VALUES
let fieldValues = {
  bill: billField.value,
  people: peopleField.value,
  tip: getTipPercent(optionFields),
};

function getTipPercent(data) {
  let checkedValue = "";

  data.forEach((field) => {
    if (field.checked) {
      checkedValue = field.value;
    }
  });

  return checkedValue;
}
