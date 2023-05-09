//getting access to the button, the input, and the ul DOM elements
const buttonEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('ul');

//defining a function for the click event lister
function addGoal() {
  //getting whatever value the user entered
  const enteredValue = inputEl.value;

  //creating a new DOM element
  const listItemEl = document.createElement('li');

  //setting the list item's text content
  listItemEl.textContent = enteredValue;

  //adding the new value to the existing list
  listEl.appendChild(listItemEl);

  //resetting the input
  inputEl.value = '';
}

//click event lister
buttonEl.addEventListener('click', addGoal);
