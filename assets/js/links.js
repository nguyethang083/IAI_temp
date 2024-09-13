// Function to send the absolute URL to the FastAPI server
async function postURLToServer(absoluteURL) {
    try {
        const response = await fetch("http://127.0.0.1:8000/save-url", { // Endpoint for saving URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: absoluteURL }), // Send the absolute URL
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error posting URL:', error);
    }
}

// Function to save the absolute URL
function saveURL(event) {
    // event.preventDefault();  // Prevent the default link action

    const relativeURL = event.currentTarget.getAttribute('href');  // Get the relative URL from href
    const absoluteURL = window.location.origin + relativeURL;  // Construct the absolute URL
    
    console.log('Saving Absolute URL:', absoluteURL);

    // Send the absolute URL to the server
    postURLToServer(absoluteURL);
}

// Function to retrieve the saved URL (if needed)
function getSavedURL() {
    // Optionally, you can retrieve the saved URL or perform other actions here
    console.log('Retrieving saved URL functionality can be added if needed');
}
