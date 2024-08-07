import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../../db';

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
  }

  try {
    const result = await db
      .delete(schema.usersTable)
      .where(eq(schema.usersTable.userId, parseInt(userId, 10)))
      .execute();

    if (result.rowsAffected > 0) {
      return NextResponse.json({ message: 'User deleted successfully' });
    }
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to delete User', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to delete User', details: 'Unknown error occurred' }, { status: 500 });
  }
}