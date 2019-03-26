let formInputs = document.querySelectorAll('.field input:not([type=radio])');
let form = document.querySelector('form'); // getElementById('myform');
let formInputsArry = Array.from(formInputs);
let taps = 0;

let timeStart = Math.round(performance.now());

const log = console.log;

function checkInputValid(e) {
  let srcElm = e.srcElement;
  let valid = srcElm.validity.valid;

  log(`[${srcElm.id}] valid = ${valid}`);
}

function checkCardNumberValid(number) {
  return Math.random() < .5 ? true : false;
}

function markEvent(id, event) {
  log(`[${id}] Event: ${event}`);
}

// input valid event
function inputValidEvent(e) {
  let srcElm = e.srcElement;
  markEvent(srcElm.id, "valid");

}

function sendEvent(action, label, value, category = form.id) {
  console.group();
  log(`Sending event category '${category}'`);
  log(`action = ${action}`);
  log(`label = ${label}`);
  log(`value = ${value}`);

  gtag('event', action, {
    'event_category': category,
    'event_label': label,
    'value': value
  });

  console.groupEnd();
}

// input invalid event
function inputInvalidEvent(e) {
  let srcElm = e.srcElement;
  markEvent(srcElm.id, "invalid");

  let validationMessage;
  if (!srcElm.parentNode.hasAttribute('data-error')) {
    // log('here2');
    srcElm.parentNode.setAttribute('data-error', srcElm.validationMessage);
    validationMessage = srcElm.validationMessage;
  } else {
    validationMessage = e.srcElement.parentNode.getAttribute('data-error');
  }

  srcElm.parentNode.classList.add('error');

  sendEvent('input_invalidation', e.srcElement.id, 1);
  sendEvent('input_invalidation_message', `${validationMessage}`, 1);

}

// enable floating label on focus
formInputs.forEach(input => {
  input.addEventListener('focusin', e => {
    log(`[${e.srcElement.id}] focusin`);
    e.srcElement.parentNode.classList.add('activelabel');
    taps++;
  });
});

// enable floating label on focus
formInputs.forEach(input => {
  input.addEventListener('valid', e => {
    inputValidEvent(e);
  });
});

// enable floating label on focus
formInputs.forEach(input => {
  input.addEventListener('invalid', e => {
    inputInvalidEvent(e);
  });
});

// // enable floating label on focus
// formInputs.forEach(input => {
//   input.addEventListener('change', e => {
//     log(`[${e.srcElement.id}] change, valid = ${e.srcElement.validity.valid}`);
//     if (!e.srcElement.validity.valid) {

//       e.srcElement.checkValidity();
//     }
//   });
// });

// enable floating label on focus
formInputs.forEach(input => {
  input.addEventListener('keyup', e => {
    log(`[${e.srcElement.id}] keyup, valid = ${e.srcElement.validity.valid}`);
    if (e.srcElement.validity.valid) {

      e.srcElement.checkValidity();
      e.srcElement.parentNode.classList.remove('error');
    }
  });
});

// set valid / invalid events
formInputs.forEach(input => {
  input.addEventListener('blur', e => {

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

    // check if input is valid
    if (e.srcElement.checkValidity()) {
      e.srcElement.parentNode.classList.remove('error');
    }

  });
});

// set valid / invalid events
formInputs.forEach(input => {
  input.addEventListener('blur', e => {
    e.srcElement.parentNode.classList.add('activelabel');
  });
});

form.addEventListener("submit", function(evt) {
  // evt.preventDefault();
  // log("Form submitted");
  // console.log(evt);
  // handle validation failure
  // let res 
  if (form.checkValidity() === false) {
    evt.preventDefault();
    // formInputsArry.forEach(input => { 
    //   customCheckValidity(input)
    // });
    // alert("Form is invalid - submission prevented!");

    // gtag('event', 'form_invalidation', {
    //   'event_category': 'invalidation',
    //   'event_label': `${form.id}`,
    //   'value': 1
    // });

    sendEvent('form_invalidation', null, 1);

    return false;
  } else {

    form.querySelectorAll('input').forEach(input => {
      input.setAttribute("disabled", "true");
    });
    let timeEnd = Math.round(performance.now());

    sendEvent('form_validation', null, 1);
    sendEvent('taps', null, taps);

    sendEvent('time_to_complete', null, timeEnd - timeStart);
    // handle validation success
    // evt.preventDefault();
    // alert("Form is valid - submission prevented to protect privacy.");
    return false;
  }
});