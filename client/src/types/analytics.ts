
export interface PageView {
  path: string;
  timestamp: number;
  timeSpent: number;
  scrollDepth: number;
  deviceInfo: {
    browser: string;
    os: string;
    screenSize: {
      width: number;
      height: number;
    }
  };
  location: {
    country: string;
    region: string;
  };
}

export interface ClickEvent {
  path: string;
  timestamp: number;
  elementId: string;
  elementText: string;
  position: {
    x: number;
    y: number;
  }
}

export interface SessionData {
  siteId: string;
  startTime: number;
  lastActive: number;
  deviceInfo: {
    browser: string;
    os: string;
    screenSize: {
      width: number;
      height: number;
    }
  };
  pageViews: PageView[];
  clicks: ClickEvent[];
  navigationPath: string[];
}

export interface AnalyticsData {
  totalVisits: number;
  averageSessionDuration: number;
  pageViews: { [path: string]: number };
  averageScrollDepth: { [path: string]: number };
  averageTimeSpent: { [path: string]: number };
  popularPaths: string[];
  deviceStats: {
    browsers: { [browser: string]: number };
    screenSizes: { [size: string]: number };
  };
  locationStats: {
    countries: { [country: string]: number };
    regions: { [region: string]: number };
  };
}
