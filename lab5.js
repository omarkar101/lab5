const sliderRange = document.getElementById('sliderRange');
document.getElementById('addressDetailsForm').style.display='none';
document.getElementById('orderSummaryForm').style.display='none';
document.body.style.backgroundColor = '#01dddd';

const getSize = () => {
  return sliderRange.value;
}

const _getChecked = (elementId) => {
  const nodes = document.getElementById(elementId).getElementsByTagName('input');
  const checkArr = [];
  for(let i=0; i<nodes.length; ++i) {
    if(nodes[i].checked) {
      checkArr.push(nodes[i]);
    }
  }
  return checkArr;
}

const getMeat = () => {
  return _getChecked('meatFieldSet');
}

const getVeg = () => {
  return _getChecked('veggiesFieldSet');
}

const getCheese = () => {
  const nodes = document.getElementsByName('cheeseRadio');
  for(let i = 0; i < nodes.length; ++i) {
    if (nodes[i].checked) {
      if (nodes[i].value === 'Regular Cheese') return 1;
      if (nodes[i].value === 'No Cheese') return 2;
      if (nodes[i].value === 'Extra Cheese') return 3;
    }
  }
  return 0;
}

const _getSizePrice = (sliderValue) => {
  if (sliderValue === '1') {
    return 6;
  }
  if (sliderValue === '2') {
    return 10;
  }
  if (sliderValue === '3') {
    return 14;
  }
  if (sliderValue === '4') {
    return 16;
  }
}

const _getPizzaSize = (sliderValue) => {
  if (sliderValue === '1') {
    return 'Small';
  } else if (sliderValue === '2') {
    return 'Medium';
  } else if (sliderValue === '3') {
    return 'Large';
  } else if (sliderValue === '4') {
    return 'X-Large';
  }
}

const ChangePizzaSize = (sliderValue) => {
  const pizzaSizeAndPriceText = document.getElementById('pizzaSizeAndPriceText');
  const pizzaImg = document.getElementById('pizzaImg');
  if (sliderValue === '1') {
    pizzaSizeAndPriceText.textContent = _getPizzaSize(sliderValue) + ' ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '100px';
    pizzaImg.style.height = '100px';
  } else if (sliderValue === '2') {
    pizzaSizeAndPriceText.textContent = _getPizzaSize(sliderValue) + ' ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '150px';
    pizzaImg.style.height = '150px';
  } else if (sliderValue === '3') {
    pizzaSizeAndPriceText.textContent = _getPizzaSize(sliderValue) + ' ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '200px';
    pizzaImg.style.height = '200px';
  } else if (sliderValue === '4') {
    pizzaSizeAndPriceText.textContent = _getPizzaSize(sliderValue) + ' ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '250px';
    pizzaImg.style.height = '250px';
  }
}

sliderRange.addEventListener('change', () => {
  ChangePizzaSize(sliderRange.value);
});

const calculateTotal = () => {
  return _getSizePrice(sliderRange.value) + getMeat().length*2 + getVeg().length + (getCheese() === 3 ? 3 : 0);
}

const fillSummary = () => {
  const orderSummaryPTag = document.getElementById('dlvrTo');
  const firstNameField = document.getElementById('firstNameField');
  const lastNameField = document.getElementById('lastNameField');
  const emailField = document.getElementById('emailField');
  const phoneNumberField = document.getElementById('phoneNumberField');
  const citySelect = document.getElementById('citySelect');
  const addressTextArea = document.getElementById('addressTextArea');
  orderSummaryPTag.textContent = firstNameField.value + ' ' + lastNameField.value +
    ', ' + emailField.value + ', ' + phoneNumberField.value + ', ' + citySelect.value +
    '-' + addressTextArea.value;

  const orderList = document.getElementById('orderList');
  orderList.innerHTML = ""
  let li = document.createElement("li");
  li.appendChild(document.createTextNode('-' + _getPizzaSize(sliderRange.value) + ' size'))
  orderList.append(li);
  const checkedArr = _getChecked('ex1');
  for(let i = 0; i < checkedArr.length; ++i) {
    if (checkedArr[i].getAttribute('name') != 'paymentRadio') {
      li = document.createElement("li");
      li.appendChild(document.createTextNode(checkedArr[i].value));
      orderList.appendChild(li);
    }
  }
  const total = document.getElementById('total');
  total.innerHTML = 'Total: ' + calculateTotal() + ' $';
}

const gotoPage = (pageNumber) => {
  if (pageNumber === 1) {
    document.getElementById('ex1').style.display='inherit';
    document.getElementById('addressDetailsForm').style.display='none';
    document.getElementById('orderSummaryForm').style.display='none';
    document.body.style.backgroundColor = '#01dddd';
  } else if (pageNumber === 2) {
    document.getElementById('ex1').style.display='none';
    document.getElementById('addressDetailsForm').style.display='inherit';
    document.getElementById('orderSummaryForm').style.display='none';
    document.body.style.backgroundColor = '#e93a57';
  } else if (pageNumber === 3) {
    document.getElementById('ex1').style.display='none';
    document.getElementById('addressDetailsForm').style.display='none';
    document.getElementById('orderSummaryForm').style.display='inherit';
    document.body.style.backgroundColor = '#3fc38e';
  }
}

const checkInfo = () => {
  const addressDetailsForm = document.getElementById('addressDetailsForm');
  const inputs = addressDetailsForm.getElementsByClassName('addressDetailsFormFields');
  for(let i = 0; i < inputs.length; ++i) {
    if (inputs[i].value === '') return false;
  }
  return true;
}

const ex1NextButton = document.getElementById('ex1NextButton');
ex1NextButton.addEventListener('click', (e) => {
  e.preventDefault();
  gotoPage(2);
})

const addressDetailsFormBackButton = document.getElementById('addressDetailsFormBackButton')
addressDetailsFormBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  gotoPage(1);
})

const addressDetailsFormNextButton = document.getElementById('addressDetailsFormNextButton')
addressDetailsFormNextButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!checkInfo()) {
    alert('You have to fill all the form!');
    return;
  }
  gotoPage(3);
  fillSummary();
})

const orderSummaryBackButton = document.getElementById('orderSummaryBackButton')
orderSummaryBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  gotoPage(2);
})


