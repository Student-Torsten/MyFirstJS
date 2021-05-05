//variables

// TODO: IDs der Buttons im HTML eindeutiger / sprechender gestalten
const generateColorButton = document.querySelector("#but1");
const saveColorButton = document.querySelector("#but2");

// Potentielle Gefahr, wenn mehr Header Elemente hinzukommen, z.B. ID anfügen
// Leiche aus Overengineering
const initHeadColor = document.querySelector("header");

// Bewusst einen initial Wert setzen
let headColor; // = undefined;

// Ermitteln von HTML Elementen gern auf einen Fleck ziehen
const colorValue = document.querySelector("#typoColor");
// Ungenutzte Variablen löschen
let currentColor = null;

let colors = [];

// TODO: ...
colorValue.textContent = headColor;

//functions for intial page setup
changeColor();
restoreFromLocal();
colors.forEach(restoreList);

/**
 * change color im header
 */
function changeColor() {
  //variables
  // Prüfen ob das eine globale Variable sein könnte
  const header = document.querySelector("header");
  // Unused variable (leiche)
  const currentBackgroundColor = header.style.backgroundColor.toLowerCase();

  //set color wiht value from random
  headColor = randomHexColor();
  header.style.backgroundColor = headColor;
  colorValue.textContent = headColor;

  //this is for check whether saveButton is diabled or not
  updateSaveButtonStatus();
}

/**
 * Toggle color of header
 * Generate random number between min and max
 */
function randomNumber(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return Math.floor(num);
}

/**
 * Generate random hex number for color
 */
function randomHexNumber() {
  let hex = randomNumber(0, 255).toString(16);
  if (hex.length === 1) {
    hex = "0" + hex;
  }
  return hex;
}

/**
 * Generate random hex color
 */
function randomHexColor() {
  const red = randomHexNumber();
  const green = randomHexNumber();
  const blue = randomHexNumber();

  return ("#" + red + green + blue).toUpperCase();
}

//save display color to list
function saveColor() {
  // TODO: gleich am anfang abfragen, ob es die Farbe schon gibt (ob die schon gespeichert ist)
  /*
  let check = colors.includes(currentColor);
  if (check === true) {
    return;
  }
  */

  //variables
  // Leiche
  const currentHeader = document.querySelector("header");
  const currentBgColor = currentHeader.style.backgroundColor.toLowerCase();

  // Create list element, delete button and text
  const list = document.querySelector("#colors");
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);

  //update currentcolor
  // Entweder currentColor oder headColor verwenden
  currentColor = headColor;

  //this is for check whether saveButton is diabled or not
  updateSaveButtonStatus();

  //duplicate check currentcolor vs. Array
  // write Color to Array, if not already included
  let check = colors.includes(currentColor);
  if (check === false) {
    colors.push(headColor);

    //push color to list

    // TODO: einhängen in den DOM immer am Ende machen, wenn alle Eigenschaften gesetzt sind
    list.appendChild(li);
    li.textContent = headColor;
    li.style.backgroundColor = headColor;
    li.setAttribute("data-color", headColor);
    li.style.marginBottom = "5px";
    li.style.padding = "10px";
    li.style.border = "10px, solid, yellow";
    li.style.color = "white";
    //li.style.border-radius = "20px";
    //li.style.display = block;
    li.appendChild(deleteBtn);
  }

  updateSaveButtonStatus();

  //update local storage with content from Array
  // saveColorsToLocalStorage();
  saveLocal();
}

/**
 * this is for check whether saveButton is diabled or not
 */
function updateSaveButtonStatus() {
  // TODO: da gibts ne globale variable
  const saveButton = document.querySelector("#but2");
  // TODO: leiche
  const list = document.querySelector("#colors");
  let check = colors.includes(headColor);

  if (check === true) {
    saveButton.setAttribute("disabled", "");
  } else {
    saveButton.removeAttribute("disabled");
  }
}

//buttons & EventListener
// TODO: prüfen ob man das addEventListener zur Deklaration der button variablen ziehen kann
generateColorButton.addEventListener("click", changeColor);
saveColorButton.addEventListener("click", saveColor);

//function to delete color list item
function deleteColor(event) {
  //variables
  const colorLiElement = event.target.parentElement;
  let colorValue = colorLiElement.getAttribute("data-color");

  // TODO: console logs langfristig entfernen
  console.log(colorValue);

  //get index of color in the Array
  // TODO: use colorValue
  let deleteColorIndex = colors.indexOf(colorLiElement);

  //delete the choosed color in the Array
  colors.splice(deleteColorIndex, 1);

  //update local storage with content from Array
  saveLocal();

  //delete Element from list
  colorLiElement.remove();

  //this is for check whether saveButton is diabled or not
  updateSaveButtonStatus();
}

//write the current Array to the local storage
function saveLocal() {
  //variables
  // TODO: variable wird nicht gebraucht
  const colorID = colors;

  //make a string from the Arry and store it in the brwoser local storage
  localStorage.setItem("arr", JSON.stringify(colorID));
}

//restore the page (list and Array) from the local storage
function restoreFromLocal() {
  //variables / get JSON-string and parse it
  let colorsFromStorage = JSON.parse(localStorage.getItem("arr"));

  //check whether the local storage is empty
  if (colorsFromStorage !== null) {
    //only if local storage is not empty, update the Array with the content
    colors = colorsFromStorage;
  }
}

//restore the list of memorized colors from the updated Array
function restoreList(color) {
  //variables
  const list = document.querySelector("#colors");
  const li = document.createElement("li");
  li.setAttribute("data-color", color);

  //add Color from restored array to the list
  list.appendChild(li);
  li.textContent = color;
  li.style.backgroundColor = color;
  li.style.marginBottom = "5px";
  li.style.padding = "10px";
  li.style.border = "10px, solid, yellow";
  li.style.color = "white";
  //li.style.border-radius = "20px";
  //li.style.display = block;

  //this is for check whether saveButton is diabled or not
  updateSaveButtonStatus();

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);
  li.appendChild(deleteBtn);
}
