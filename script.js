// Select elements
const add = document.getElementById("add-button");
const ticker = document.getElementById("enter-ticker");

// New item template and item list
const template = document.getElementById("box-template");
const list = document.getElementById("list");

// Define constants for local storage
const LOCAL_STORAGE_PREFIX = "STOCK_TRACKER";
const ITEM_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-items`;

// Initialize array of items and render them
let items = loadItems();
items.forEach(renderItems);

// Temporary array for storing fetch dataset
const temp = [];

// Add stock information to items array on button click
add.addEventListener("click", () => {
  if (ticker.value == undefined) return;

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker.value}&apikey=${config}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result["Global Quote"]["01. symbol"] === undefined) return;

      temp.push(result["Global Quote"]);

      // Counter for array assignment
      let i = temp.length - 1;

      // Template for new box
      const newBox = {
        symbol: temp[i]["01. symbol"],
        open: temp[i]["02. open"],
        high: temp[i]["03. high"],
        low: temp[i]["04. low"],
        price: temp[i]["05. price"],
        volume: temp[i]["06. volume"],
        latestTradingDay: temp[i]["07. latest trading day"],
        close: temp[i]["08. previous close"],
        change: temp[i]["09. change"],
        changePercent: temp[i]["10. change percent"],
        id: new Date().valueOf().toString()
      };

      // Add the item to the items array and local storage
      items.push(newBox);
      renderItems(newBox);
      saveItems();
    })
    .catch((err) => {
      alert("Slow down! Only 5 requests can be made per minute.");
      return;
    });

  // Clear the question and answer inputs
  ticker.value = "";
});

// Function to load items currently stored in local storage
function loadItems() {
  const itemString = localStorage.getItem(ITEM_STORAGE_KEY);
  return JSON.parse(itemString) || [];
}

// Function to save items in local storage
function saveItems() {
  localStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
}

function renderItems(item) {
  // Create a clone of box template from HTML and assign an Id
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.getElementById("box-list");
  listItem.dataset.listId = item.id;

  // Add the question and answer text to their corresponding span elements
  const symbol = templateClone.getElementById("symbol");
  const open = templateClone.getElementById("open");
  const high = templateClone.getElementById("high");
  const low = templateClone.getElementById("low");
  const price = templateClone.getElementById("price");
  const volume = templateClone.getElementById("volume");
  const latest = templateClone.getElementById("latest");
  const close = templateClone.getElementById("close");
  const change = templateClone.getElementById("change");
  const percent = templateClone.getElementById("percent");

  // Add text to span elements and round numbers to 2 decimal places
  symbol.innerText = item.symbol;
  price.innerText = parseFloat(item.price).toFixed(2);
  open.innerText = `Open: ${parseFloat(item.open).toFixed(2)}`;
  high.innerText = `High: ${parseFloat(item.high).toFixed(2)}`;
  low.innerText = `Low: ${parseFloat(item.low).toFixed(2)}`;
  volume.innerText = `Volume: ${item.volume}`;
  latest.innerText = `Last Traded: ${item.latestTradingDay}`;
  close.innerText = `Previous Close: ${parseFloat(item.close).toFixed(2)}`;
  change.innerText = `Change: ${parseFloat(item.change).toFixed(2)}`;
  percent.innerText = `Change: ${parseFloat(item.changePercent).toFixed(2)}%`;

  // Change the colour of the text depending on price changes
  if (item.price > item.open) {
    price.classList.add("price-positive");
    change.classList.add("price-positive");
    percent.classList.add("price-positive");
  } else {
    price.classList.add("price-negative");
    change.classList.add("price-negative");
    percent.classList.add("price-negative");
  }

  // Append the template clone onto the list element
  list.appendChild(templateClone);
}

// Remove items from local storage and array on click
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest("#box-list");
  const listId = parent.dataset.listId;
  parent.remove();
  items = items.filter((item) => item.id !== listId);
  saveItems();
});

// Execute a function when the user releases a key on the keyboard
ticker.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();

    // Trigger the button element with a click
    add.click();
  }
});
