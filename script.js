//buttons & EventListener
const generateColorButton = document.querySelector("#GenerateColorButton");
const saveColorButton = document.querySelector("#SaveColorButton");
generateColorButton.addEventListener("click", changeColor);
saveColorButton.addEventListener("click", saveColor);

//variables
const headerFromDom = document.querySelector("#header");
const colorValue = document.querySelector("#typoColor");
const list = document.querySelector("#colors");
const li = document.createElement("li");
let headColor = null;
let colors = [];
///let currentColor = null;
colorValue.textContent = headColor;

//functions for intial page setup
changeColor();
restoreFromLocal();
colors.forEach(restoreList);

/**
 *  change color im header
 */
function changeColor() {
  //variables
  //const header = document.querySelector("header");
  //const currentBackgroundColor = headerFromDom.style.backgroundColor.toLowerCase();

  //set color wiht value from random
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

/**
 * save display color to list
 */
function saveColor() {
  //variables
  //const currentHeader = document.querySelector("header");
  //const currentBgColor = currentHeader.style.backgroundColor.toLowerCase();

  //duplicate check currentcolor vs. Array
  let check = colors.includes(headColor);
  // if color already included ignore the following code of this function
  if (check === true) {
    return;
  }

  //update currentcolor
  //currentColor = headColor;

  updateSaveButtonStatus();

  //write Color to Array
  colors.push(headColor);

  //push color to list
  li.textContent = headColor;
  li.style.backgroundColor = headColor;
  li.setAttribute("data-color", headColor);
  li.style.marginBottom = "5px";
  li.style.padding = "10px";
  li.style.border = "10px, solid, yellow";
  li.style.color = "white";
  //li.style.border-radius = "20px";
  //li.style.display = block;
  list.appendChild(li);

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);
  li.appendChild(deleteBtn);

  updateSaveButtonStatus();

  saveArrayToLocalStorage();
}

/**
 * this is for check whether saveButton is diabled or not
 */ function updateSaveButtonStatus() {
  //const saveButton = document.querySelector("#SaveColorButton");
  //const list = document.querySelector("#colors");
  let check = colors.includes(headColor);

  if (check === true) {
    saveColorButton.setAttribute("disabled", "");
  } else {
    saveColorButton.removeAttribute("disabled");
  }
}

//function to delete color list item
function deleteColor(event) {
  //variables
  const colorLiElement = event.target.parentElement;
  let colorValue = colorLiElement.getAttribute("data-color");
  console.log(colorValue);

  //get index of color in the Array
  let deleteColorIndex = colors.indexOf(colorValue);
  console.log(deleteColorIndex);

  //delete the choosed color in the Array
  colors.splice(deleteColorIndex, 1);

  saveArrayToLocalStorage();

  //delete Element from list
  colorLiElement.remove();

  updateSaveButtonStatus();
}

/**
 * write the current Array to the local storage
 */
function saveArrayToLocalStorage() {
  //make a string from the Arry and store it in the brwoser local storage
  localStorage.setItem("arr", JSON.stringify(colors));
}

/**
 * //restore the page (list and Array) from the local storage
 */
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

  updateSaveButtonStatus();

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);
  li.appendChild(deleteBtn);
}
