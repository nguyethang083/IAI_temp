// MDEditor function to convert markdown to HTML
const MDEditor = function() {
  const render = (content) => {
      let html = content;

      // Bold and italic
      html = html.replace(/(\*\*\*(.+?)\*\*\*)/g, "<strong><em>$2</em></strong>");
      html = html.replace(/(\*\*(.+?)\*\*)/g, "<strong>$2</strong>");
      html = html.replace(/(\*(.+?)\*)/g, "<em>$2</em>");

      // Headings
      html = html.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
      html = html.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
      html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
      html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
      html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
      html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

      // Code
      html = html.replace(/`(.+?)`/g, "<code>$1</code>");

      // Horizontal rule
      html = html.replace(/^---$/gm, "<hr>");

      // Links
      html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

      // Images
      html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');

      // Unordered list
      html = html.replace(/^- (.+)$/gm, "<ul><li>$1</li></ul>").replace(/<\/ul><ul>/g, "");

      // Blockquotes
      html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

      return html;
  };

  return { render };
};

// Selecting element to view chat
var chatBotSession = document.querySelector(".chatBot .chatBody .chatSession");

// Selecting trigger elements of conversation
var chatBotSendButton = document.querySelector(".chatBot .chatForm #sendButton");
var chatBotTextArea = document.querySelector(".chatBot .chatForm #chatTextBox");

// Default values for replies
var chatBotInitiateMessage = "Hello! I am ChatBot.";
var chatBotBlankMessageReply = "Type something!";

// Collecting user input
var inputMessage = "";

// Type of message
var messageType = "asking"

// This helps generate text containers in the chat
var typeOfContainer = "";

// Initialize MDEditor
const mdEditor = MDEditor();

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
          containerID = "messageContainer";
          textClass = "message";
          break;
      case "reply":
      case "initialize":
      case "error":
          containerID = "replyContainer";
          textClass = "reply";
          break;
      default:
          alert("Error! Please reload the website.");
  }

  // Create a new container
  var newContainer = document.createElement("div");
  newContainer.setAttribute("class", "container");
  newContainer.setAttribute("id", containerID);
  chatBotSession.appendChild(newContainer);

  // Depending on the type of message, display the content
  var newMessage = document.createElement("p");
  newMessage.setAttribute("class", textClass + " animateChat");
  
  // Format the content as Markdown for all types of messages
  newMessage.innerHTML = mdEditor.render(content);
  
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
  let accumulatedResponse = "";

  // Process the response stream in chunks
  while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      // Decode the chunk and append it to the accumulated response
      const chunk = decoder.decode(value, { stream: true });
      accumulatedResponse += chunk;

      // Update the reply container with the accumulated response
      replyContainer.innerHTML = mdEditor.render(accumulatedResponse);
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