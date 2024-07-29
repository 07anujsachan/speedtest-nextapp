import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { exec } from 'child_process';

// Initialize the cors middleware
const cors = Cors({
  methods: ['POST'],
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      exec(`fast --upload --json`, (err, stdout, stderr) => {
        if (err || stderr) {
          return res.status(400).json({ error: err || stderr, code: 400 });
        }
        const result = JSON.parse(stdout);
        res.status(200).json({ code: 200, data: result });
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}