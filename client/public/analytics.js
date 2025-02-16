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
  siteId: new URLSearchParams(window.location.search).get('site_id'),
  startTime: Date.now(),
  lastActive: Date.now(),
  deviceInfo: collectDeviceInfo(),
  pageViews: [],
  clicks: [],
  navigationPath: [window.location.pathname]
};

function recordPageView() {
  const scrollDepth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
  sessionData.pageViews.push({
    path: window.location.pathname,
    timestamp: Date.now(),
    timeSpent: Date.now() - sessionData.lastActive,
    scrollDepth,
    deviceInfo: sessionData.deviceInfo,
    location: { country: '', region: '' }
  });
}

document.addEventListener('click', (e) => {
  sessionData.clicks.push({
    path: window.location.pathname,
    timestamp: Date.now(),
    elementId: e.target.id || '',
    elementText: e.target.textContent || '',
    position: {
      x: e.clientX,
      y: e.clientY
    }
  });
});

function sendAnalytics() {
  const duration = Math.floor((Date.now() - sessionData.startTime) / 1000);
  fetch('https://68b567d0-2dff-4889-a730-3be8bf5583f5-00-2ld48qpl02xwb.worf.replit.dev/api/businesses/' + sessionData.siteId + '/visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      duration: duration,
      source: document.referrer || 'direct',
      sessionData: sessionData
    })
  }).catch(console.error);

  // Send analytics data to the correct endpoint that matches backend route
  fetch(`https://68b567d0-2dff-4889-a730-3be8bf5583f5-00-2ld48qpl02xwb.worf.replit.dev/api/businesses/${sessionData.siteId}/analytics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionData), // Sending sessionData directly
    keepalive: true
  }).catch(console.error);
}

window.addEventListener('beforeunload', () => {
  recordPageView();
  sendAnalytics();
});

setInterval(() => {
  recordPageView();
  sendAnalytics();
  sessionData.lastActive = Date.now();
}, 5 * 60 * 1000);