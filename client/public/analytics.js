// Add this code to your website's analytics.js file

function sendViewAnalytics(duration) {
  // Replace this with your business siteId (e.g., '1stcallplumbing', 'oglesplumbing')
  const siteId = '1stcallplumbing'; // Change this to your business ID

  fetch('https://68b567d0-2dff-4889-a730-3be8bf5583f5-00-2ld48qpl02xwb.worf.replit.dev/api/businesses/' + siteId + '/visits', {
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