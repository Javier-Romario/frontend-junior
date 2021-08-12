// Get the cards
const cards = Array.from(document.querySelectorAll("[data-card]"));

const priceValueElement = document.querySelectorAll(".card__product--value");

const priceText = cards.map(
  (card) => card.querySelector(".card__product--value").innerText
);

const parsedPriceText = priceText.map((text) => parseInt(text));

let yearly = false;

// calculate the yearly prices from HTML text (for maintainability)
const yearlyPrices = parsedPriceText.map((price) => price * 12);

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

function changePricingValue() {
  // make Yearly
  if (!yearly) {
    // update those prices
    // const newPrices = yearlyPrices.forEach((price, i) => priceText[i] = price);
    yearlyPrices.forEach((price, i) => {
      return (priceValueElement[i].textContent = price);
    });

    yearly = true;
  } else {
    // // calculate the montly prices from HTML text (for maintainability)
    const monthlyPrices = parsedPriceText.map((price) => price / 12);

    // update those prices
    // const newPrices = yearlyPrices.forEach((price, i) => priceText[i] = price);
    priceText.forEach((price, i) => {
      return (priceValueElement[i].textContent = price);
    });

    yearly = false;
  }
}

function togglePricingValue(e) {
  const currentActiveButton = e.target;

  // Change the pricing values
  changePricingValue();

  // Change the active button
  toggleActiveButton(currentActiveButton);
}

// Add an event listener for each of the buttons
buttons.forEach((button) => {
  button.addEventListener("click", togglePricingValue);
});
