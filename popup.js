// popup.
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const copyBtn = document.getElementById('copyBtn');
    const searchBtn = document.getElementById('searchBtn');
    const closeBtn = document.getElementById('closeBtn');

    // Function to show the popup at the selected text position
    function showPopupMenu(x, y) {
      popup.style.left = x + 'px';
      popup.style.top = y + 'px';
      popup.style.display = 'block';
    }

    // Detect text selection
    document.addEventListener('mouseup', (event) => {
      const selection = window.getSelection();
      if (selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Show popup near the selected text
        showPopupMenu(rect.left + window.scrollX, rect.bottom + window.scrollY);
      } else {
        popup.style.display = 'none';
      }
    });

    // Close the popup menu
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    // Copy selected text to clipboard
    copyBtn.addEventListener('click', () => {
      const selection = window.getSelection().toString();
      navigator.clipboard.writeText(selection);
      alert('Text copied: ' + selection);
      popup.style.display = 'none';
    });

    // Search selected text on Google
    searchBtn.addEventListener('click', () => {
      const selection = window.getSelection().toString();
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(selection)}`;
      window.open(googleUrl, '_blank');
      popup.style.display = 'none';
    });
});
