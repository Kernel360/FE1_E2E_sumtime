import { NextApiRequest, NextApiResponse } from 'next';
import { db, schema } from '../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await db.insert(schema.usersTable).values({
        email,
        password,
      });

      res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
