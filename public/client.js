// let fields = document.querySelectorAll('.field');
let formInputs = document.querySelectorAll('.field input:not([type=radio])');

let ccInput = document.getElementById('cc-number');

const log = console.log;

formInputs.forEach(input => {
  input.addEventListener('focusin', e => {
    e.srcElement.parentNode.classList.add('activelabel');
  });
});

function customCheckValidity(e) {
  log('customCheckValidity');
  // console.log(this);
  let srcElm = e;
console.log(srcElm);
  // if not valid, display inline error mesasge and add error class tag
  if (!srcElm.checkValidity()) {
    log('here');
    let validationMessage;
    if (!srcElm.parentNode.hasAttribute('data-error')) {
      log('here2');
      srcElm.parentNode.setAttribute('data-error', srcElm.validationMessage);
    } else {
      // e.srcElement.setCustomValidity(e.srcElement.parentNode.getAttribute('data-error'));
    }
    // else
    // validationMessage = e.srcElement.validationMessage;
    srcElm.parentNode.classList.add('error');
  } else {
    srcElm.parentNode.classList.remove('error');
    // e.srcElement.setCustomValidity("");
  }

}

formInputs.forEach(input => {
  log('adding custom validitiy');

  // input.checkValidity = customCheckValidity;
  // e.srcElement.checkValidity = customCheckValidity;

  input.addEventListener('blur', (e) => {
    log('blur');
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

    customCheckValidity(e.srcElement);
    // e.srcElement.checkValidity();

  });
});

function checkCardNumberValid(number) {
  return Math.random() < .5 ? true : false;
}

let form = document.querySelector('form'); // getElementById('myform');
let formInputsArry = Array.from(formInputs);

form.addEventListener("submit", function(evt) {
  // evt.preventDefault();
  // log("Form submitted");
  // console.log(evt);
  // handle validation failure
  // let res 
  if (form.checkValidity() === false) {
    evt.preventDefault();
    formInputsArry.forEach(input => { 
      customCheckValidity(input)
    });
    // alert("Form is invalid - submission prevented!");
    return false;
  } else {

    form.querySelectorAll('input').forEach(input => {
      input.setAttribute("disabled", "true");
    });

    // handle validation success
    // evt.preventDefault();
    // alert("Form is valid - submission prevented to protect privacy.");
    return false;
  }
});