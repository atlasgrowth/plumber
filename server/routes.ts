import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import fs from 'fs/promises';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/analytics', async (req, res) => {
    try {
      const analytics = req.body;
      const fileName = `analytics_${analytics.siteId}_${new Date().toISOString().split('T')[0]}.json`;
      await fs.appendFile(
        path.join(process.cwd(), 'analytics', fileName),
        JSON.stringify(analytics) + '\n'
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save analytics' });
    }
  });
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
