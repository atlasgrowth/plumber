
// Add this code to your website's analytics.js file

function sendViewAnalytics(duration) {
  const urlParams = new URLSearchParams(window.location.search);
  const businessId = urlParams.get('business_id');

  if (!businessId) return;

  fetch('https://68b567d0-2dff-4889-a730-3be8bf5583f5-00-2ld48qpl02xwb.worf.replit.dev/api/businesses/' + businessId + '/visits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      duration: duration,
      source: document.referrer || 'direct'
    })
  })
  .catch(console.error);
}

// Track time spent on page
let startTime = Date.now();

// Send analytics when user leaves the page
window.addEventListener('beforeunload', () => {
  const duration = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
  sendViewAnalytics(duration);
});

// Optional: Send periodic updates for long visits
setInterval(() => {
  const duration = Math.floor((Date.now() - startTime) / 1000);
  sendViewAnalytics(duration);
  startTime = Date.now(); // Reset timer
}, 5 * 60 * 1000); // Every 5 minutes
