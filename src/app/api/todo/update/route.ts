import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../../db';

export async function PUT(req: NextRequest) {
  const { todoId, title, content, startTime, endTime, color } = await req.json();

  try {
    const result = await db
      .update(schema.todosTable)
      .set({
        title,
        content,
        startTime,
        endTime,
        color,
      })
      .where(eq(schema.todosTable.todoId, todoId))
      .execute();

    if (result.rowsAffected > 0) {
      return NextResponse.json({ message: 'todo updated successfully' });
    }
    return NextResponse.json({ error: 'Todo not found or no changes made' }, { status: 404 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to update todo', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to update todo', details: 'Unknown error occurred' }, { status: 500 });
  }
}
