
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

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
      const data = req.body;
      console.log(data);
      res.status(200).json({ message: "Data received successfully", data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
