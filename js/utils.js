//CREATE HTML ELEMENTS
function createComponent(props) {
  const element = document.createElement(props.element);
  for (let attr in props.attr) {
    element.setAttribute(camelToKebabCase(attr), props.attr[attr]);
  }
  element.innerHTML = props.content;

  return element;
}

//CONVERT STRING TO KEBAB CASE
function camelToKebabCase(string) {
  return string.replace(/([A-Z])/g, "-$&").toLowerCase();
}

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

export {
  $,
  $all,
  formatValue,
  formatCurrency,
  createComponent,
  camelToKebabCase,
};
