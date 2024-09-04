import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { categoriesTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function getServerDataAboutCategory() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unAuthorized Error' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.userId, userId)).all();

    if (categories.length === 0) {
      throw new Error('카테고리가 존재하지 않습니다.');
    }

    // 필요한 필드만 선택해서 반환
    const filteredCategories = categories.map(({ createdAt, updatedAt, ...category }) => category);

    return filteredCategories;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
}
