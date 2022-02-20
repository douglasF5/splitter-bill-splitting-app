//QUERY SELECTOR HELPER FUNCTIONS
function $(query) {
  return document.querySelector(query);
}

function $all(query) {
  return document.querySelectorAll(query);
}

//FORMAT CURRENCY
function formatValue(value) {
  let formattedValue = value
    ? parseInt(parseFloat(String(value).replace(/-/g, "")) * 100)
    : 0;
  return formattedValue;
}

function formatCurrency(value) {
  let amount = parseFloat(value / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return amount.replace("$", "$ ");
}

export { $, $all, formatValue, formatCurrency };
