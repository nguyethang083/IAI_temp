// // Include marked.js in your HTML file
// // <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

// function renderMarkdown(text) {
//     // Parse markdown and return HTML
//     return marked.parse(text);
//   }
  
//   // Use this function when adding messages to the chat
//   function addMessageToChat(message, isReply = false) {
//     const chatSession = document.querySelector('.chatSession');
//     const container = document.createElement('div');
//     container.className = `container ${isReply ? 'replyContainer' : 'messageContainer'}`;
    
//     const paragraph = document.createElement('p');
//     paragraph.className = isReply ? 'reply' : 'message';
    
//     // Use the renderMarkdown function here
//     paragraph.innerHTML = renderMarkdown(message);
    
//     container.appendChild(paragraph);
//     chatSession.appendChild(container);
//     chatSession.scrollTop = chatSession.scrollHeight;
//   }

function renderMarkdown() {
  const markdownString = document.getElementById('markdown-input').value;
  const htmlContent = marked(markdownString);
  document.getElementById('content').innerHTML = htmlContent;
}