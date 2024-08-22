import { NextResponse } from 'next/server';
import { db } from '@/db';
import { categoriesTable, InsertCategory } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const userId = Number(params.userId);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: '유효한 user ID를 제공해 주세요.' }, { status: 400 });
  }

  try {
    const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.userId, userId)).all();

    if (categories.length === 0) {
      return NextResponse.json({ error: '카테고리가 존재하지 않습니다.' }, { status: 404 });
    }

    const filteredCategories = categories.map(({ createdAt, updatedAt, ...category }) => category);

    return NextResponse.json({ categories: filteredCategories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, color, isDisplayed } = body;

    if (!title) {
      return NextResponse.json({ error: 'title 값을 입력해주세요' }, { status: 400 });
    }

    const newCategory: InsertCategory = {
      title,
      color: color || null,
      isDisplayed: isDisplayed !== undefined ? isDisplayed : 1,
      userId: 0,
    };

    const insertedCategory = await db.insert(categoriesTable).values(newCategory).returning({
      id: categoriesTable.id,
      title: categoriesTable.title,
      color: categoriesTable.color,
      isDisplayed: categoriesTable.isDisplayed,
    });

    return NextResponse.json(insertedCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
