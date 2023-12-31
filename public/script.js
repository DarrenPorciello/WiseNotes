const recordBtn = document.querySelector(".record"),
  result = document.querySelector(".result"),
  downloadBtn = document.querySelector(".download"),
  inputLanguage = document.querySelector("#language"),
  clearBtn = document.querySelector(".clear"),
  noteBtn = document.querySelector(".note");


let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;

function populateLanguages() {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.innerHTML = lang.name;
    inputLanguage.appendChild(option);
  });
}

populateLanguages();

function speechToText() {
  try {
    recognition = new SpeechRecognition();
    recognition.lang = inputLanguage.value;
    recognition.interimResults = true;
    recordBtn.classList.add("recording");
    recordBtn.querySelector("p").innerHTML = "Listening...";
    recognition.start();


    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
    
      // Function to capitalize the first letter of a string
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    
      // Detect when interim results
      if (event.results[0].isFinal) {
        // Capitalize the first letter of the speech result and append a period
        result.innerHTML += " " + capitalizeFirstLetter(speechResult.trim()) + ".";
        result.querySelector("p").remove();
      } else {
        // Create a p with class interim if not already there
        if (!document.querySelector(".interim")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          result.appendChild(interim);
        }
        // Update the p with the speech result
        document.querySelector(".interim").innerHTML =
          " " + capitalizeFirstLetter(speechResult.trim());
      }
      downloadBtn.disabled = false;
      noteBtn.disabled = false;
    };
    


    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
      stopRecording();
      if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  } catch (error) {
    recording = false;

    console.log(error);
  }
}

recordBtn.addEventListener("click", () => {
  if (!recording) {
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  recordBtn.querySelector("p").innerHTML = "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
}

function download() {
  const text = result.innerText;
  const filename = "lecture.txt";

  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


downloadBtn.addEventListener("click", download);


//function autoNote() 
    // Redirect to the "/Notes" page
    //const noteText = result.innerText;
    //Send data to next page
    //window.location.href = `/Notes?noteText=${encodeURIComponent(noteText)}`;


// Add an event listener to the Auto Note Enhancement button
noteBtn.addEventListener("click", function () {
    
  const content = result.innerText;
  console.log(content);
  //window.location.href = "/Enhanced";
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
        window.location.href = "/Enhanced";
        // Handle the response from the server if needed
        console.log(data.completion.content);
        console.log("hello")
              // Handle the response from the server
        const enhancedNote = data.completion.content;
        //console.log(enhancedNote);
        // Redirect to /Enhanced 
        window.location.href = `/Enhanced?enhancedNote=${encodeURIComponent(enhancedNote)}`;
        // Display the enhanced note on the screen
        //resultContainer.innerHTML = `<p>${enhancedNote}</p>`;
        
      })
      .catch(error => {
        console.error("Error:", error);
      });
      
  });


  function goToHomePage() {
    window.location.href = "/Intro";
  }




clearBtn.addEventListener("click", () => {
  result.innerHTML = "";
  downloadBtn.disabled = true;
  noteBtn.disabled = true;
});