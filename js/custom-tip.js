import { $, createComponent } from "./utils.js";
import { updateValues, updateUI, fieldValues, optionFields } from "./main.js";

const radioButtonsContainer = $(".tip-options");

//RADIO INPUT BUTTON
function customTipRadioField(flag, label, value = 0) {
  let component = createComponent({
    element: "label",
    attr: {
      class: "btn",
      for: "opt6",
      id: "custom-tip-radio-input",
    },
    content: inputRadioHTML(flag, label, value),
  });

  component.onclick = () => {
    optionFields.forEach((field) => {
      if (field.checked) field.checked = false;
    });
    updateValues();
    updateUI();
    $("#custom-tip-radio-input").remove();
    radioButtonsContainer.append(customTipTextField(value));
    $("#custom-tip-text-input").focus();
  };

  component;

  return component;
}

function inputRadioHTML(flag, label, value) {
  let checked = flag ? "checked" : "";

  let html = `<input
    class="tip-option-field"
    id="opt6"
    type="radio"
    name="tip"
    value="${value}"
    data-tip-option
    ${checked}
  />
  <div class="tip-option">
    <span class="tip-option-label">${label}</span>
    <svg class="tip-option-icon">
      <use xlink:href="assets/icons.svg#pencil-icon" />
    </svg>
  </div>`;

  return html;
}

//TEXT INPUT BUTTON
function customTipTextField(value = 0) {
  let component = createComponent({
    element: "div",
    attr: {
      class: "input-wrapper",
      id: "custom-input-wrapper",
    },
    content: inputTextHTML(value),
  });

  component.oninput = () => {
    updateValues();
    updateUI();
  };

  component.addEventListener("focusout", settleCustomTipField);

  return component;
}

function inputTextHTML(value) {
  let finalValue = value ? value : "";

  let html = `
  <input
    class="input"
    id="custom-tip-text-input"
    name="custom-tip"
    type="number"
    step="1"
    placeholder="0"
    data-tip-custom-option
    value="${finalValue}"
  />
  <div class="btn custom-tip-input-field-icon">
    <svg>
      <use xlink:href="assets/icons.svg#check-circle-filled-icon" />
    </svg>
  </div>`;

  return html;
}

//SETTLE CUSTOM TIP FIELD
function settleCustomTipField() {
  const customTipInputTextWrapper = $("#custom-input-wrapper");

  if (!!customTipInputTextWrapper) {
    const customTipInputText = $("#custom-tip-text-input");
    let checkValue = false;
    let labelValue = "Custom";

    if (customTipInputText.value) {
      checkValue = true;
      labelValue = `${fieldValues.tip}%`;
    }

    customTipInputTextWrapper.remove();

    radioButtonsContainer.append(
      customTipRadioField(checkValue, labelValue, customTipInputText.value)
    );
  }
}

radioButtonsContainer.append(customTipRadioField(false, "Custom"));

export { settleCustomTipField, radioButtonsContainer, customTipRadioField };
