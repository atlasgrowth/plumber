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
  const currentTime = Date.now();
  const timeSpent = currentTime - sessionData.lastActive;

  sessionData.pageViews.push({
    path: window.location.pathname,
    timestamp: currentTime,
    timeSpent: timeSpent,
    scrollDepth: scrollDepth,
    deviceInfo: sessionData.deviceInfo,
    location: sessionData.locationInfo || { country: '', region: '' }
  });

  sessionData.lastActive = currentTime;
}

// Record initial page view
recordPageView();

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
  fetch('https://46857e9e-2406-40c3-bca9-f7362a2cb1ca-00-pqda8yfb8d82.riker.replit.dev/api/businesses/' + sessionData.siteId + '/visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      duration: duration,
      source: document.referrer || 'direct',
      sessionData: sessionData
    })
  }).catch(console.error);

  // Send analytics data to the correct endpoint that matches backend route
  fetch(`https://58c346ae-af77-4e55-ba41-9155581eab85-00-145ia2zqoi1tq.picard.replit.dev/api/businesses/${sessionData.siteId}/analytics`, {
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