import { Request, Response } from 'express';
import { getMarketInsights } from '../services/insights.service';

export const getInsights = async (req: Request, res: Response) => {
  try {
    const insights = await getMarketInsights();
    res.json(insights);
  } catch (error) {
    console.error('Error fetching market insights:', error);
    res.status(500).json({ error: 'Failed to fetch market insights' });
  }
};
