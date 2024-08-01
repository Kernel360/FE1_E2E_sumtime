import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '../../../../db';

export async function POST(req: NextRequest) {
  const { userId, title, content, startTime, endTime, color } = await req.json();

  try {
    await db.insert(schema.todosTable).values({
      title,
      content,
      startTime,
      endTime,
      color,
      userId,
    });

    return NextResponse.json({ message: 'User added successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to add user', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to add user', details: 'Unknown error occurred' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await db
      .select({
        userId: schema.usersTable.userId,
        email: schema.usersTable.email,
        password: schema.usersTable.password,
      })
      .from(schema.usersTable)
      .all();
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to add user', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to add user', details: 'Unknown error occurred' }, { status: 500 });
  }
}
