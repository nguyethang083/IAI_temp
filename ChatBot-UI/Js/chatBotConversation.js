// Selecting element to view chat
var chatBotSession = document.querySelector(".chatBot .chatBody .chatSession");

// Selecting trigger elements of conversation
var chatBotSendButton = document.querySelector(
  ".chatBot .chatForm #sendButton"
);
var chatBotTextArea = document.querySelector(".chatBot .chatForm #chatTextBox");

// Default values for replies
var chatBotInitiateMessage = "Hello! I am ChatBot.";
var chatBotBlankMessageReply = "Type something!";
var chatBotReply = "{{ reply }}";

// Collecting user input
var inputMessage = "";

// Type of message
var messageType = "asking"

// This helps generate text containers in the chat
var typeOfContainer = "";

// Function to open ChatBot
chatBotSendButton.addEventListener("click", async (event) => {
  // Prevent page reload on form submission
  event.preventDefault();

  // Validate the message before sending it
  if (validateMessage()) {
    inputMessage = chatBotTextArea.value;

    // Create a container for the user's message
    typeOfContainer = "message";
    createContainer(typeOfContainer, inputMessage);

    // Create a reply container in advance (so we can update it later)
    typeOfContainer = "reply";
    const replyContainer = createContainer(typeOfContainer, "");

    // Send the message to the server and handle the streaming response
    await handleStreamingResponse(inputMessage, messageType, replyContainer);
  } else {
    typeOfContainer = "error";
    createContainer(typeOfContainer, chatBotBlankMessageReply);
  }

  // Clear the input field and focus on it
  chatBotTextArea.value = "";
  chatBotTextArea.focus();
});

// Function to create containers for message or reply
function createContainer(typeOfContainer, content = "") {
  var containerID = "";
  var textClass = "";

  switch (typeOfContainer) {
    case "message":
      // This creates a message container for the user's message
      containerID = "messageContainer";
      textClass = "message";
      break;
    case "reply":
    case "initialize":
    case "error":
      // This creates a reply container for the bot's reply
      containerID = "replyContainer";
      textClass = "reply";
      break;
    default:
      alert("Error! Please reload the website.");
  }

  // Create a new container
  var newContainer = document.createElement("div");
  newContainer.setAttribute("class", "container");

  if (containerID === "messageContainer")
    newContainer.setAttribute("id", "messageContainer");
  if (containerID === "replyContainer")
    newContainer.setAttribute("id", "replyContainer");

  chatBotSession.appendChild(newContainer);

  // Depending on the type of message, display the content
  var newMessage = document.createElement("p");
  newMessage.setAttribute("class", textClass + " animateChat");
  newMessage.innerHTML = content;
  newContainer.appendChild(newMessage);

  newContainer.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });

  return newMessage; // Return the message element so we can update it later
}

// Function to handle streaming response from the server
async function handleStreamingResponse(inputMessage, messageType, replyContainer) {
  // Send request to FastAPI server and handle the streaming response
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST", // Ensure this is POST
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: inputMessage, message_type : messageType }), // Send the input message
  });

  // Create a reader to read the stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let accumulatedResponse = ""; // Accumulate the response

  // Process the response stream in chunks
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;

    // Decode the chunk and append it to the accumulated response
    const chunk = decoder.decode(value, { stream: true });
    accumulatedResponse += chunk;

    // Update the reply container with the accumulated response
    replyContainer.innerHTML = accumulatedResponse;
  }
}

// Function to initiate conversation
function initiateConversation() {
  chatBotSession.innerHTML = "";
  typeOfContainer = "initialize";
  createContainer(typeOfContainer, chatBotInitiateMessage);
}

// Function to validate the input message
function validateMessage() {
  return chatBotTextArea.value.trim().length > 0;
}
