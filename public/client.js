// let fields = document.querySelectorAll('.field');
let formInputs = document.querySelectorAll('.field input:not([type=radio])');

let ccInput = document.getElementById('cc-number');

const log = console.log;

formInputs.forEach(input => {
  input.addEventListener('focusin', e => {
    e.srcElement.parentNode.classList.add('activelabel');
  });
});

formInputs.forEach(input => {
  input.addEventListener('blur', (e) => {

    // add dirty class so we know it's been visitied
    e.srcElement.classList.add('dirty');

    // add activelabel class to adjust label position unless no value set
    if (e.srcElement.value == "")
      e.srcElement.parentNode.classList.remove('activelabel');
    else
      e.srcElement.parentNode.classList.add('activelabel');

    // if CC number, custom validation
    if (e.srcElement.id === 'cc-number') {
      if (!checkCardNumberValid(e.srcElement.value)) {
        // invalid card number, set custom validity message
        ccInput.setCustomValidity('Please enter a valid credit card number');
      } else {
        // valid card number, reset message
        ccInput.setCustomValidity('');
      }
    }

    // if not valid, display inline error mesasge and add error class tag
    if (!e.srcElement.checkValidity()) {
      log('here');
      let validationMessage;
      if (!e.srcElement.parentNode.hasAttribute('data-error')) {
        log('here2');
        e.srcElement.parentNode.setAttribute('data-error', e.srcElement.validationMessage);

      }
      // else
      // validationMessage = e.srcElement.validationMessage;
      e.srcElement.parentNode.classList.add('error');
    } else {
      e.srcElement.parentNode.classList.remove('error');
    }
  });
});

function checkCardNumberValid(number) {
  return Math.random() < .5 ? true : false;
}

let form = document.querySelector('form'); // getElementById('myform');

form.addEventListener("submit", function(evt) {
  // alert("Form submitted");
  console.log(evt);
  // handle validation failure
  if (form.checkValidity() === false) {
    evt.preventDefault();
    alert("Form is invalid - submission prevented!");
    return false;
  } else {

    form.querySelectorAll('input').forEach(input => {
      input.setAttribute("disabled", "true");
    });

    // handle validation success
    // evt.preventDefault();
    alert("Form is valid - submission prevented to protect privacy.");
    return false;
  }
});