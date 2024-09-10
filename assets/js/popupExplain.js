document.addEventListener('mouseup', function (e) {
    var selectedText = window.getSelection().toString().trim();
    var popupMenu = document.getElementById('popup-menu');
    
    if (selectedText.length > 0) {
        var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        popupMenu.style.left = rect.left + window.scrollX + 'px';
        popupMenu.style.top = rect.bottom + window.scrollY + 'px';
        popupMenu.style.display = 'block';
    } else {
        popupMenu.style.display = 'none';
    }
});

document.addEventListener('mousedown', function (e) {
    var popupMenu = document.getElementById('popup-menu');
    
    // Hide the popup if the click is outside of it
    if (!popupMenu.contains(e.target)) {
        popupMenu.style.display = 'none';
    }
});