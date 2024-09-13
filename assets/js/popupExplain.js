const popup = document.getElementById("popup-menu");
const explainBtn = document.getElementById("explainBtn");

function showPopupMenu(x, y) {
  popup.style.left = x + "px";
  popup.style.top = y + "px";
  popup.style.display = "block";
}

document.addEventListener("mouseup", (event) => {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    showPopupMenu(rect.left + window.scrollX, rect.bottom + window.scrollY);
  } else {
    popup.style.display = "none";
  }
});

document.addEventListener("click", (event) => {
  let animateChatBot = document.querySelector(".chatBot");
  let animateChatSeparater = document.querySelector(
    ".chatBot .chatBotHeading + hr"
  );
  let animateChatBody = document.querySelector(".chatBot .chatBody");
  let animateChatForm = document.querySelector(".chatBot .chatForm");

  //  // Selecting trigger elements of animation
  let chatOpenTrigger = document.querySelector(
    ".chatBot .chatBotHeading #chatOpenTrigger"
  );
  let chatCloseTrigger = document.querySelector(
    ".chatBot .chatForm #chatCloseTrigger"
  );

  //  // Setting up trigger for click event
  chatOpenTrigger.addEventListener("click", openChatBot);
  chatCloseTrigger.addEventListener("click", closeChatBot);

  //  // Selecting chat session to clear after conversation ends
  let chatSession = document.querySelector(".chatBot .chatBody .chatSession");

  //  // Count the iteration for opening the ChatBot,
  //  // If count is 0, Initialize chat
  //  // Else continue the chat
  // var chatBotIteration        = 0

  //  // Function to open ChatBot
  function openChatBot() {
    console.log("hi");
    setTimeout(function () {
      animateChatBot.classList.add("active");
    }, 0);
    setTimeout(function () {
      // // Animate ChatOpenTrigger
      chatOpenTrigger.classList.add("active");
    }, 250);
    setTimeout(function () {
      //  // Animate ChatSeperater
      animateChatSeparater.classList.add("active");
    }, 500);
    setTimeout(function () {
      //  // Animate ChatBody
      animateChatBody.classList.add("active");
    }, 750);
    setTimeout(function () {
      //  // Animate ChatForm
      animateChatForm.classList.add("active");
    }, 1000);
    // if( chatBotIteration == 0 )
    //     setTimeout(function(){
    //         //  // Initiate chat
    //         initiateConversation()
    //     }, 2000)
    // chatBotIteration++
  }
  function createContainer(typeOfContainer) {
    var containerID = "";
    var textClass = "";
    switch (typeOfContainer) {
      case "message":
        // This would create a message container for user's message
        containerID = "messageContainer";
        textClass = "message";
        break;
      case "reply":
      case "initialize":
      case "error":
        // This would create a reply container for bot's reply
        containerID = "replyContainer";
        textClass = "reply";
        break;
      default:
        alert("Error! Please reload the webiste.");
    }
    // Creating container
    var newContainer = document.createElement("div");
    newContainer.setAttribute("class", "container");
    if (containerID == "messageContainer")
      newContainer.setAttribute("id", "messageContainer");
    if (containerID == "replyContainer")
      newContainer.setAttribute("id", "replyContainer");
    chatBotSession.appendChild(newContainer);

    switch (textClass) {
      case "message":
        var allMessageContainers =
          document.querySelectorAll("#messageContainer");
        var lastMessageContainer =
          allMessageContainers[allMessageContainers.length - 1];
        var newMessage = document.createElement("p");
        newMessage.setAttribute("class", "message animateChat");
        newMessage.innerHTML = inputMessage;
        lastMessageContainer.appendChild(newMessage);
        lastMessageContainer.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
        break;
      case "reply":
        var allReplyContainers = document.querySelectorAll("#replyContainer");
        var lastReplyContainer =
          allReplyContainers[allReplyContainers.length - 1];
        var newReply = document.createElement("p");
        newReply.setAttribute("class", "reply animateChat accentColor");
        switch (typeOfContainer) {
          case "reply":
            newReply.innerHTML = chatBotReply;
            break;
          case "initialize":
            newReply.innerHTML = chatBotInitiateMessage;
            break;
          case "error":
            newReply.innerHTML = chatBotBlankMessageReply;
            break;
          default:
            newReply.innerHTML = "Sorry! I could not understannd.";
        }
        setTimeout(function () {
          lastReplyContainer.appendChild(newReply);
          lastReplyContainer.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }, 10);
        break;
      default:
        console.log("Error in conversation");
    }
  }
  if (event.target.id == "explainBtn") {
    openChatBot();
    inputMessage = window.getSelection().toString();
    typeOfContainer = "message";
    createContainer(typeOfContainer);
    setTimeout(function () {
      typeOfContainer = "reply";
      createContainer(typeOfContainer);
    }, 750);
    chatBotTextArea.value = "";
    chatBotTextArea.focus();
  }
});
