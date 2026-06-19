import { Request, Response } from 'express';
import { processChatQuery } from '../services/chat.service';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const response = await processChatQuery(query as string);
    res.status(200).json(response);
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Failed to process chat query' });
  }
};
