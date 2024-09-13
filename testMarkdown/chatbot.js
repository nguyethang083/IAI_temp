document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('closeChatBtn').addEventListener('click', function() {
    document.querySelector('.chatbot-container').style.display = 'none';
});

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return;

    // Append user message to the chatbox
    appendMessage('user', userInput);

    // Clear input field
    document.getElementById('userInput').value = '';

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{"role": "user", "content": userInput}],
            max_tokens: 100
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Append bot message to the chatbox
    appendMessage('bot', botMessage);
}

function appendMessage(sender, message) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    // Use `marked` to parse markdown
    const formattedMessage = marked.parse(message);
    messageElement.innerHTML = `<div class="text">${formattedMessage}</div>`;
    
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}