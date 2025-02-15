export interface PageView {
  path: string;
  timestamp: number;
}

export interface SessionData {
  siteId: string;
  startTime: number;
  lastActive: number;
  pageViews: PageView[];
}

export interface AnalyticsData {
  totalVisits: number;
  averageSessionDuration: number;
  pageViews: { [path: string]: number };
}
