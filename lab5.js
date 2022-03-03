const sliderRange = document.getElementById('sliderRange');

const getSize = () => {
  return sliderRange.value;
}

const _getChecked = (elementId) => {
  const nodes = document.getElementById(elementId).getElementsByTagName('input');
  const checkArr = [];
  for(let i=0; i<nodes.length; ++i) {
    if(nodes[i].checked) {
      checkArr.push(nodes[i].value);
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
      return nodes[i].value;
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

const ChangePizzaSize = (sliderValue) => {
  const pizzaSizeAndPriceText = document.getElementById('pizzaSizeAndPriceText');
  const pizzaImg = document.getElementById('pizzaImg');
  if (sliderValue === '1') {
    pizzaSizeAndPriceText.textContent = 'Small ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '100px';
    pizzaImg.style.height = '100px';
  } else if (sliderValue === '2') {
    pizzaSizeAndPriceText.textContent = 'Medium ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '150px';
    pizzaImg.style.height = '150px';
  } else if (sliderValue === '3') {
    pizzaSizeAndPriceText.textContent = 'Large ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '200px';
    pizzaImg.style.height = '200px';
  } else if (sliderValue === '4') {
    pizzaSizeAndPriceText.textContent = 'X-Large ' + _getSizePrice(sliderValue) + '$';
    pizzaImg.style.width = '250px';
    pizzaImg.style.height = '250px';
  }
}

sliderRange.addEventListener('change', () => {
  ChangePizzaSize(sliderRange.value);
});

const calculateTotal = () => {
  return _getSizePrice(sliderRange.value) + getMeat().length*2 + getVeg().length + (getCheese() === '3' ? 3 : 0);
}

const fillSummary = () => {
  
}

console.log(getSize())
console.log(getMeat())
console.log(getVeg())
console.log(getCheese())
console.log(calculateTotal())
