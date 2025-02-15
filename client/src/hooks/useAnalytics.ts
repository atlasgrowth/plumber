import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { SessionData, PageView } from '@/types/analytics';

const STORAGE_KEY = 'site_analytics';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function useAnalytics(siteId: string | null) {
  const [location] = useLocation();

  useEffect(() => {
    if (!siteId) return;

    // Load or initialize session data
    const loadSession = (): SessionData => {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${siteId}`);
      if (stored) {
        const session = JSON.parse(stored) as SessionData;
        // Check if the session has timed out
        if (Date.now() - session.lastActive > SESSION_TIMEOUT) {
          return createNewSession(siteId);
        }
        return session;
      }
      return createNewSession(siteId);
    };

    const createNewSession = (siteId: string): SessionData => ({
      siteId,
      startTime: Date.now(),
      lastActive: Date.now(),
      pageViews: [],
    });

    const saveSession = (session: SessionData) => {
      localStorage.setItem(`${STORAGE_KEY}_${siteId}`, JSON.stringify(session));
    };

    // Track page view
    const session = loadSession();
    const pageView: PageView = {
      path: location,
      timestamp: Date.now(),
    };
    
    session.pageViews.push(pageView);
    session.lastActive = Date.now();
    saveSession(session);

    // Update last active time periodically
    const interval = setInterval(() => {
      const currentSession = loadSession();
      currentSession.lastActive = Date.now();
      saveSession(currentSession);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [siteId, location]);
}

export function getAnalytics(siteId: string): AnalyticsData {
  const stored = localStorage.getItem(`${STORAGE_KEY}_${siteId}`);
  if (!stored) {
    return {
      totalVisits: 0,
      averageSessionDuration: 0,
      pageViews: {},
    };
  }

  const session = JSON.parse(stored) as SessionData;
  const pageViews = session.pageViews.reduce((acc, view) => {
    acc[view.path] = (acc[view.path] || 0) + 1;
    return acc;
  }, {} as { [path: string]: number });

  return {
    totalVisits: 1, // For now, just counting current session
    averageSessionDuration: (session.lastActive - session.startTime) / 1000, // in seconds
    pageViews,
  };
}
