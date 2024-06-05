chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const hourlyRate = request.hourlyRate;

    // Function to convert duration string to minutes
    function getMinutes(duration) {
        const parts = duration.split(':').map(Number);
        if (parts.length === 2) {
            return parts[0] + parts[1] / 60;
        } else if (parts.length === 3) {
            return parts[0] * 60 + parts[1] + parts[2] / 60;
        }
        return 0;
    }

    // Find all video durations on the page
    const videoDurations = document.querySelectorAll('.badge-shape-wiz__text');

    videoDurations.forEach(durationElement => {
        const durationText = durationElement.textContent.trim();
        const minutes = getMinutes(durationText);
        const equivalentMoney = (minutes / 60) * hourlyRate;

        // Create a container div for the money equivalent and duration text
        const container = document.createElement('div');
        container.className = 'money-duration-container';

        // Create a div for the money equivalent
        const moneyElement = document.createElement('div');
        moneyElement.textContent = ` | ৳${equivalentMoney.toFixed(2)}`;


        // Append the money and duration text to the container
        container.appendChild(moneyElement);

        // Append the container to the thumbnail
        durationElement.parentElement.appendChild(container);
    });
});
