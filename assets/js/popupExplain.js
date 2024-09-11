const popup = document.getElementById('popup-menu');
const explainBtn = document.getElementById('explainBtn');
const similarBtn = document.getElementById('similarBtn');
const closeBtn = document.getElementById('closeBtn');

function showPopupMenu(x, y) {
  popup.style.left = x + 'px';
  popup.style.top = y + 'px';
  popup.style.display = 'block';
}

document.addEventListener('mouseup', (event) => {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    showPopupMenu(rect.left + window.scrollX, rect.bottom + window.scrollY);
  } else {
    popup.style.display = 'none';
  }
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

similarBtn.addEventListener('click', () => {
  const selection = window.getSelection().toString();
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(selection)}`;
  window.open(googleUrl, '_blank');
  popup.style.display = 'none';
});

document.addEventListener("click", (event) => {
  let animateChatBot          = document.querySelector( ".chatBot" )
  let animateChatSeparater    = document.querySelector( ".chatBot .chatBotHeading + hr" )
  let animateChatBody         = document.querySelector( ".chatBot .chatBody" )
  let animateChatForm         = document.querySelector( ".chatBot .chatForm" )

  //  // Selecting trigger elements of animation
  let chatOpenTrigger         = document.querySelector( ".chatBot .chatBotHeading #chatOpenTrigger" )
  let chatCloseTrigger        = document.querySelector( ".chatBot .chatForm #chatCloseTrigger" )

  //  // Setting up trigger for click event
  chatOpenTrigger .addEventListener( "click" , openChatBot  )
  chatCloseTrigger.addEventListener( "click" , closeChatBot )

  //  // Selecting chat session to clear after conversation ends
  let chatSession             = document.querySelector( ".chatBot .chatBody .chatSession" )

  //  // Count the iteration for opening the ChatBot,
  //  // If count is 0, Initialize chat
  //  // Else continue the chat
  var chatBotIteration        = 0

  //  // Function to open ChatBot
  function openChatBot() {
    setTimeout(function(){ animateChatBot.classList.add( "active" )}, 0)
    setTimeout(function(){
        // // Animate ChatOpenTrigger
        chatOpenTrigger.classList.add( "active" )
    }, 250)
    setTimeout(function(){
        //  // Animate ChatSeperater
        animateChatSeparater.classList.add( "active" )
    }, 500)
    setTimeout(function(){
        //  // Animate ChatBody
        animateChatBody.classList.add( "active" )
    }, 750)
    setTimeout(function(){
        //  // Animate ChatForm
        animateChatForm.classList.add( "active" )
    }, 1000)
    if( chatBotIteration == 0 )
        setTimeout(function(){
            //  // Initiate chat
            initiateConversation()
        }, 2000)
    chatBotIteration++

  }
  if (event.target.id == 'explainBtn') {
    openChatBot;
    inputMessage = window.getSelection().toString();
    typeOfContainer = "message";
    createContainer( typeOfContainer );
    setTimeout(function(){
      typeOfContainer = "reply"
      createContainer( typeOfContainer )
    }, 750);
    chatBotTextArea.value = "";
    chatBotTextArea.focus();
  }
})