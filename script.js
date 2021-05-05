/*
- neues
array true oder false auswerten
*/

//Variablen
const but1 = document.querySelector("#but1");
const but2 = document.querySelector("#but2");
const initHeadColor = document.querySelector("header");
let headColor;
let colors = [];
let currentColor = null;
const colorValue = document.querySelector("#typoColor");
colorValue.textContent = headColor;

//init change
changeColor();
restoreFromLocal();
colors.forEach(restoreList);

//change color im header
function changeColor() {
  const header = document.querySelector("header");
  const currentBackgroundColor = header.style.backgroundColor.toLowerCase();

  headColor = randomHexColor();
  header.style.backgroundColor = headColor;
  colorValue.textContent = headColor;
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
  const currentHeader = document.querySelector("header");
  const currentBgColor = currentHeader.style.backgroundColor.toLowerCase();
  const list = document.querySelector("#colors");
  const li = document.createElement("li");

  currentColor = headColor;

  //duplicate check

  let check = colors.includes(currentColor);
  updateSaveButtonStatus();

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);

  // const deleteButton = document.createElement("BUTTON"); // Create a <button> element
  //deleteButton.innerHTML = "Delete Color"; // Insert text

  //kein doppelter Farbwert ins array zufügen
  if (check === false) {
    colors.push(headColor);
    //push color to list
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
    li.appendChild(deleteBtn); // Delete Button
  }
  updateSaveButtonStatus();
  saveLocal();
}

//update saveButton
function updateSaveButtonStatus() {
  const saveButton = document.querySelector("#but2");
  const list = document.querySelector("#colors");
  let check = colors.includes(headColor);

  if (check === true) {
    saveButton.setAttribute("disabled", "");
  } else {
    saveButton.removeAttribute("disabled");
  }
}

//buttons
but1.addEventListener("click", changeColor);
but2.addEventListener("click", saveColor);

// Function to delete color list item
function deleteColor(event) {
  const colorLiElement = event.target.parentElement;
  let colorValue = colorLiElement.getAttribute("data-color");
  console.log(colorValue);
  // Get color

  let deleteColorIndex = colors.indexOf(colorLiElement);
  console.log(deleteColorIndex);

  colors.splice(deleteColorIndex, 1);

  // Delete Element
  colorLiElement.remove();
  updateSaveButtonStatus();
}
function saveLocal() {
  const colorID = colors;
  //const json = JSON.stringify(colorID);
  console.log(colorID);
  //localStorage.setItem("savedColors", "json");
  localStorage.setItem("arr", JSON.stringify(colorID));
}

function restoreFromLocal() {
  let colorsFromStorage = JSON.parse(localStorage.getItem("arr"));

  if (colorsFromStorage !== null) {
    colors = colorsFromStorage;
  }
}

function restoreList(color) {
  // const currentHeader = document.querySelector("#typoColor");
  //const selectedColor = currentHeader.innerText;
  //const currentBgColor = currentHeader.style.backgroundColor.toLowerCase();
  const list = document.querySelector("#colors");
  const li = document.createElement("li");
  li.setAttribute("data-color", color);

  //kein doppelter Farbwert ins array zufügen
  list.appendChild(li);
  li.textContent = color;
  li.style.backgroundColor = color;
  li.style.marginBottom = "5px";

  updateSaveButtonStatus();

  //Daten in JSON ablegen
  saveLocal();

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);
  li.appendChild(deleteBtn);
  //apppendChild immer nach innerText!!
}
