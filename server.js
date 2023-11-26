const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


const { Configuration, OpenAIApi} = require("openai")

const configuration = new Configuration({
    organization: "org-RXhSqGz82WKTM2FghSsJ8ezT",
    apiKey: "",
});

const openai = new  OpenAIApi(configuration);

//const completion = await openai.createChatCompletion({
/*  model: "gpt-3.5-turbo",
  messages: [
    {role : "user", content: "Hello world"}
  ]

})
console.log(completion.data.choices[0].message);
*/
//openAI
//const { OpenAIAPI } = require('openai');
//const openai = new OpenAIAPI({ key: process.env.API_KEY });
//Config is for deining things like api key
//Openapi interactign with api generating input


//console.log(process.env);
api_key = process.env.API_KEY;
//console.log(api_key);
// Serve static files (HTML, CSS, JS, and SVG)
app.use(express.static(path.join(__dirname, 'public')));

//new
//app.use(bodyParser.json());
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define a route for the root URL (Welcome Page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
  });

// Define a route for the Speech to Text application
app.get('/WiseNotes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'function.html'));
});

// Define a route for the Notes page
app.get('/Notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'note.html'));
  });

// Define a route for the Intro page
app.get('/Intro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'intro.html'));
  });

// Define a route for the Intro page
app.get('/Create', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'createNote.html'));
  });

  // Define a route for the response page
app.get('/Enhanced', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'response.html'));
});

//const configuration = new Configuration({
//  apiKey: process.env.API_KEY
//});

//const openai = new OpenAiApi(configuration)
  

// Handle Auto Note Enhancement request
app.post('/enhanceNote', async (req, res) => {
  //console.log("Button pressed")
  try {
    const { content } = req.body;
    //console.log(content)
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role : "user", content: `You are an advanced study helper whose job is to enhance study notes. Clarify and make the input neater into a neat and well organized study file. Add headings, boldings, or other styles to make it look pretty and be easily understandable. Summarize the content into study material. Here is the text: ${content}`}
      ]
    
    })

    res.json({
      completion: completion.data.choices[0].message
    })


    //const enhancedNote = completion.data.choices[0].message

    console.log(completion.data.choices[0].message);

    // Render the response.html page with the enhancedNote variable
    //res.render('response', { enhancedNote });
    // Implement logic to interact with OpenAI API or any other processing
    // You can use the 'content' variable to access the user input
    // For now, let's just send a success response
    //res.json({ success: true });
    /*return res.status(200).json({
      message: "Working",
    });*/
    
    const enhancedNote = completion.data.choices[0].message;

    // Send the enhancedNote as JSON response
    //res.json({ enhancedNote });
    // Send the result to /Enhanced and include the enhancedNote in the response.html file
    //res.sendFile(path.join(__dirname, 'public', 'response.html'), {
    //  enhancedNote,
    //});
  
    
  }

  catch (error) {
    console.log(error);
  }

});  










// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle download request
app.post('/download', express.json(), (req, res) => {
  const { text, filename } = req.body;

  // Implement logic to save the text to a file (e.g., speech.txt)
  // You can use fs module or any other method of your choice

  res.json({ success: true });
});
