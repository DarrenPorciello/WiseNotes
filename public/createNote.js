const noteBtn = document.querySelector(".note");
const userInput = document.querySelector(".userInput");

// Add an event listener to the textarea
userInput.addEventListener("input", function () {
  // Check if the textarea is not empty
  if (userInput.value.trim() !== "") {
    // Enable the button
    noteBtn.disabled = false;
  } else {
    // Disable the button if the textarea is empty
    noteBtn.disabled = true;
  }
});



