// Selecting elements to validate
var chatBotTextArea = document.querySelector( ".chatBot .chatForm #chatTextBox" )

function validateMessage() {
    if( chatBotTextArea.value == "")
        return false
    else
        return true
}