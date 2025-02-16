
// Analytics code for your website

function getSiteIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('site_id');
}

function collectDeviceInfo() {
  return {
    browser: navigator.userAgent,
    os: navigator.platform,
    screenSize: {
      width: window.screen.width,
      height: window.screen.height
    }
  };
}

let sessionData = {
  siteId: getSiteIdFromUrl(),
  startTime: Date.now(),
  lastActive: Date.now(),
  deviceInfo: collectDeviceInfo(),
  pageViews: [],
  clicks: [],
  navigationPath: [window.location.pathname]
};

// Track page views
function recordPageView() {
  sessionData.pageViews.push({
    path: window.location.pathname,
    timestamp: Date.now(),
    timeSpent: Date.now() - sessionData.lastActive,
    scrollDepth: (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100,
    deviceInfo: sessionData.deviceInfo,
    location: { country: '', region: '' }
  });
}

// Track clicks
document.addEventListener('click', (e) => {
  sessionData.clicks.push({
    path: window.location.pathname,
    timestamp: Date.now(),
    elementId: e.target.id,
    elementText: e.target.textContent,
    position: {
      x: e.clientX,
      y: e.clientY
    }
  });
});

// Send data to pipeline
function sendAnalytics() {
  const duration = Math.floor((Date.now() - sessionData.startTime) / 1000);
  
  fetch('https://68b567d0-2dff-4889-a730-3be8bf5583f5-00-2ld48qpl02xwb.worf.replit.dev/api/businesses/' + sessionData.siteId + '/visits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      duration: duration,
      source: document.referrer || 'direct',
      sessionData: sessionData
    })
  })
  .catch(console.error);
}

// Send analytics when user leaves
window.addEventListener('beforeunload', () => {
  recordPageView();
  sendAnalytics();
});

// Periodic updates
setInterval(() => {
  recordPageView();
  sendAnalytics();
  sessionData.lastActive = Date.now();
}, 5 * 60 * 1000);
