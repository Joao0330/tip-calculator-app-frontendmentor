//! DOM elements
const billPriceInput = document.getElementById('bill');
const peopleNumber = document.getElementById('billPeople');

const tipOptions = document.querySelectorAll('.tipButton');
const customTipOption = document.getElementById('customTip');

const peopleNumberContainer = document.querySelector('.formInput:last-of-type');

const totalTipResult = document.getElementById('totalTipDisplay');
const totalPriceResult = document.getElementById('totalPriceDisplay');

const resetBtn = document.querySelector('.resetButton');

let tipPercentage = 0;
resetBtn.disabled = true;

const validatePeopleNumber = (billPrice, numberPeople) => {
	if (billPrice <= 0 || numberPeople <= 0) {
		peopleNumberContainer.classList.add('error');
		return false;
	}

	peopleNumberContainer.classList.remove('error');
	return true;
};

const calculateTotalPrice = () => {
	const bill = Number(billPriceInput.value);
	const amountPeople = Number(peopleNumber.value);

	if (!validatePeopleNumber(bill, amountPeople)) return;

	const tipAmount = bill * tipPercentage;
	const totalWithTip = bill + tipAmount;

	const tipPerPerson = tipAmount / amountPeople;
	const totalPerPerson = totalWithTip / amountPeople;

	totalTipResult.textContent = '$' + tipPerPerson.toFixed(2);
	totalPriceResult.textContent = '$' + totalPerPerson.toFixed(2);
};

const calculateTipPrice = button => {
	tipPercentage = Number(button.dataset.tip);
	tipOptions.forEach(btn => btn.classList.remove('selected'));
	button.classList.add('selected');

	calculateTotalPrice();
};

const calculateCustomTip = () => {
	tipPercentage = Number(customTipOption.value) / 100;
	tipOptions.forEach(btn => btn.classList.remove('selected'));

	calculateTotalPrice();
};

const resetCalculator = () => {
	billPriceInput.value = '';
	peopleNumber.value = '';
	customTipOption.value = '';

	tipPercentage = 0;

	totalTipResult.textContent = '$0.00';
	totalPriceResult.textContent = '$0.00';

	tipOptions.forEach(btn => btn.classList.remove('selected'));

	peopleNumberContainer.classList.remove('error');

	resetBtn.disabled = true;
};

//! *** Event Listeners ***
[billPriceInput, peopleNumber].forEach(input =>
	input.addEventListener('input', () => {
		resetBtn.disabled = false;
		calculateTotalPrice();
	}),
);

tipOptions.forEach(btn =>
	btn.addEventListener('click', () => {
		resetBtn.disabled = false;
		calculateTipPrice(btn);
	}),
);

customTipOption.addEventListener('input', () => {
	resetBtn.disabled = false;
	calculateCustomTip();
});

resetBtn.addEventListener('click', resetCalculator);
