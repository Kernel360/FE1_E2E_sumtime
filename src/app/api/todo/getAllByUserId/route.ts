import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../../db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'UserID query parameter is required' }, { status: 400 });
  }

  console.log('Received id:');

  try {
    const todos = await db
      .select()
      .from(schema.todosTable)
      .where(eq(schema.todosTable.userId, parseInt(userId, 10)))
      .all();

    console.log('Query result:', todos);

    if (todos.length > 0) {
      return NextResponse.json({ todos });
    }
    return NextResponse.json({ error: 'Todos not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching Todo:', error);
    return NextResponse.json({ error: 'Failed to fetch Todos', details: (error as Error).message }, { status: 500 });
  }
}
