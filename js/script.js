// Get the cards
const cards = Array.from(document.querySelectorAll("[data-card]"));

const priceValueElement = document.querySelectorAll(".card__product--value");

let billingIndicators = document.querySelectorAll(".card__product--price-period");

const montlyPrices = cards.map(
  (card) => card.querySelector(".card__product--value").innerText
);

const parsedPriceText = montlyPrices.map((text) => parseInt(text));

let monthlyBilling = false;


// calculate the monthlyBilling prices from HTML text (for maintainability)
const monthlyBillingPrices = parsedPriceText.map((price) => price * 12);

// Get the buttons
const buttons = Array.from(document.querySelectorAll("[data-pricing-toggle]"));

// Get the active button
const activeButton = buttons.filter((button) =>
  button.classList.contains("active")
);

// get each price field
const prices = cards.forEach((card) => {
  card.getElementsByClassName("card__product--price");
});

function addActiveClass(element) {
  return element.classList.contains("active")
    ? element.classList.remove("active")
    : element.classList.add("active");
}

function toggleActiveButton(currentButton) {
  buttons.forEach((button) =>
    currentButton === button
      ? addActiveClass(currentButton)
      : addActiveClass(button)
  );
}

function calculateYearlyPricing(num) {
  return num * 12;
}

function toggleBillingIndicator() {
  if (monthlyBilling) {
    billingIndicators.forEach(indicator => {
      return indicator.textContent = '/yr'
    });
  } else {
    billingIndicators.forEach(indicator => indicator.textContent = '/mo'); 
  }
}

function changePricingValue() {
  if (monthlyBilling) {
    // update the prices: Montly values
    montlyPrices.forEach((price, i) => {
      return (priceValueElement[i].textContent = price);
    });

    monthlyBilling = false;
  } else {
    // update the prices: Yearly Values
    monthlyBillingPrices.forEach((price, i) => {
      return (priceValueElement[i].textContent = price);
    });

    monthlyBilling = true;
  }
}

function togglePricingValue(e) {
  const currentActiveButton = e.target;

  changePricingValue();

  toggleBillingIndicator();

  toggleActiveButton(currentActiveButton);
}

// Add an event listener for each of the buttons
buttons.forEach((button) => {
  button.addEventListener("click", togglePricingValue);
});
