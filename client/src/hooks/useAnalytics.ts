
import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { SessionData, PageView, ClickEvent } from '@/types/analytics';

const STORAGE_KEY = 'site_analytics';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function getDeviceInfo() {
  return {
    browser: navigator.userAgent,
    os: navigator.platform,
    screenSize: {
      width: window.screen.width,
      height: window.screen.height
    }
  };
}

async function getLocationInfo() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      country: data.country_name,
      region: data.region
    };
  } catch (error) {
    return { country: 'Unknown', region: 'Unknown' };
  }
}

export function useAnalytics(siteId: string | null) {
  const [location] = useLocation();
  const pageStartTime = useRef(Date.now());
  const maxScrollRef = useRef(0);

  useEffect(() => {
    if (!siteId) return;

    const loadSession = (): SessionData => {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${siteId}`);
      if (stored) {
        const session = JSON.parse(stored) as SessionData;
        if (Date.now() - session.lastActive > SESSION_TIMEOUT) {
          return createNewSession(siteId);
        }
        return session;
      }
      return createNewSession(siteId);
    };

    const createNewSession = async (siteId: string): Promise<SessionData> => {
      const locationInfo = await getLocationInfo();
      return {
        siteId,
        startTime: Date.now(),
        lastActive: Date.now(),
        deviceInfo: getDeviceInfo(),
        pageViews: [],
        clicks: [],
        navigationPath: []
      };
    };

    const saveSession = (session: SessionData) => {
      localStorage.setItem(`${STORAGE_KEY}_${siteId}`, JSON.stringify(session));
      // Also save to a file using fetch
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
      });
    };

    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      maxScrollRef.current = Math.max(maxScrollRef.current, scrollPercent);
    };

    const handleClick = (e: MouseEvent) => {
      const session = loadSession();
      const target = e.target as HTMLElement;
      const clickEvent: ClickEvent = {
        path: location,
        timestamp: Date.now(),
        elementId: target.id || 'unknown',
        elementText: target.textContent || 'unknown',
        position: { x: e.clientX, y: e.clientY }
      };
      session.clicks.push(clickEvent);
      saveSession(session);
    };

    // Track initial page view
    const session = loadSession();
    session.navigationPath.push(location);
    saveSession(session);

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    // Cleanup function
    return () => {
      const timeSpent = Date.now() - pageStartTime.current;
      const session = loadSession();
      const pageView: PageView = {
        path: location,
        timestamp: pageStartTime.current,
        timeSpent,
        scrollDepth: maxScrollRef.current,
        deviceInfo: getDeviceInfo(),
        location: { country: 'Unknown', region: 'Unknown' } // Will be updated by API
      };
      session.pageViews.push(pageView);
      session.lastActive = Date.now();
      saveSession(session);

      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [siteId, location]);
}
