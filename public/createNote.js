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


noteBtn.addEventListener("click", function () {
    
  const content = userInput.value;
 
    // Send the content to the server using fetch
    fetch("/enhanceNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then(response => response.json())
      .then(data => {
        //window.location.href = "/Enhanced";
       
        console.log(data.completion.content);
        console.log("hello")
          // Handle the response from the server
        const enhancedNote = data.completion.content;
        
            // Redirect to /Enhanced with enhancedNote as a query parameter
        window.location.href = `/Enhanced?enhancedNote=${encodeURIComponent(enhancedNote)}`;

        
      })
      .catch(error => {
        console.error("Error:", error);
      });
      
  });

  function goToHomePage() {
    window.location.href = "/Intro";
  }
