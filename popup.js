document.getElementById('calculateBtn').addEventListener('click', () => {
    const hourlyRate = document.getElementById('hourlyRate').value;
    if (!hourlyRate) {
        alert('Please enter your hourly rate.');
        return;
    }

    // Send hourly rate to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { hourlyRate: parseFloat(hourlyRate) });
    });
});