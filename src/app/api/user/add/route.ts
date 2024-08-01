import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '../../../../db';

export async function POST(req: NextRequest) {
  const { email, password, nickname } = await req.json();

  try {
    await db.insert(schema.usersTable).values({
      email,
      password,
      nickname,
    });

    return NextResponse.json({ message: 'User added successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to add user', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to add user', details: 'Unknown error occurred' }, { status: 500 });
  }
}
