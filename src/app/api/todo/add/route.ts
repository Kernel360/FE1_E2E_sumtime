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

    return NextResponse.json({ message: 'Todo added successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to add Todo', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to add Todo', details: 'Unknown error occurred' }, { status: 500 });
  }
}
