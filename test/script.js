// Chatbot toggle
document.getElementById('open-chatbot').onclick = function() {
    document.getElementById('chatbot').style.display = 'block';
    this.style.display = 'none';
};

document.getElementById('chatbot-header').onclick = function() {
    document.getElementById('chatbot').style.display = 'none';
    document.getElementById('open-chatbot').style.display = 'block';
};

// Highlight feature and "Explain" button handling
let highlightedText = '';
document.getElementById('content-paragraph').onmouseup = function() {
    let selection = window.getSelection().toString();
    if (selection) {
        highlightedText = selection;
        const explainButton = document.getElementById('explain-button');
        explainButton.style.display = 'inline';
        explainButton.style.position = 'absolute';
        explainButton.style.left = `${window.getSelection().getRangeAt(0).getBoundingClientRect().left}px`;
        explainButton.style.top = `${window.getSelection().getRangeAt(0).getBoundingClientRect().top + window.scrollY + 25}px`;
    } else {
        document.getElementById('explain-button').style.display = 'none';
    }
};

// Integrate highlight with chatbot
document.getElementById('explain-button').onclick = function() {
    if (highlightedText) {
        document.getElementById('chatbot').style.display = 'block';
        document.getElementById('open-chatbot').style.display = 'none';
        document.getElementById('chatbot-messages').innerHTML += `<div><strong>User:</strong> Explain the ${highlightedText}</div>`;
        document.getElementById('chatbot-input-field').value = `Explain the ${highlightedText}`;
        highlightedText = ''; // Reset after use
        document.getElementById('explain-button').style.display = 'none';
    }
};

// Chatbot message sending (for demonstration)
document.getElementById('send-button').onclick = function() {
    let message = document.getElementById('chatbot-input-field').value;
    if (message) {
        document.getElementById('chatbot-messages').innerHTML += `<div><strong>You:</strong> ${message}</div>`;
        document.getElementById('chatbot-input-field').value = ''; // Clear input field
    }
};