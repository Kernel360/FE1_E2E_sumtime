import { db } from '@/db';
import { categoriesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { categoryId: string } }) {
  try {
    const id = Number(params.categoryId);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: '유효한 카테고리 ID를 제공해 주세요.' }, { status: 400 });
    }

    const category = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id)).get();

    if (!category) {
      return NextResponse.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }

    const filteredCategory = {
      id: category.id,
      title: category.title,
      color: category.color,
      isDisplayed: category.isDisplayed,
    };

    return NextResponse.json(filteredCategory, { status: 200 });
  } catch (error) {
    console.error('카테고리 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '카테고리 조회 중 오류 발생' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { categoryId: string } }) {
  try {
    const id = Number(params.categoryId);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: '유효한 id를 제공해주세요.' }, { status: 400 });
    }

    const body = await request.json();
    const { title, color, isDisplayed } = body;

    const updatedCategory: Partial<typeof categoriesTable.$inferInsert> = {};

    if (title) updatedCategory.title = title;
    if (color) updatedCategory.color = color;
    if (typeof isDisplayed === 'number') updatedCategory.isDisplayed = isDisplayed;

    if (Object.keys(updatedCategory).length === 0) {
      return NextResponse.json({ error: '수정할 필드가 없습니다.' }, { status: 400 });
    }

    const result = await db
      .update(categoriesTable)
      .set(updatedCategory)
      .where(eq(categoriesTable.id, id))
      .returning({
        id: categoriesTable.id,
        title: categoriesTable.title,
        color: categoriesTable.color,
        isDisplayed: categoriesTable.isDisplayed,
        isDefault: categoriesTable.isDefault,
      })
      .get();

    if (!result) {
      return NextResponse.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }
    if (result.isDefault === 1) {
      return NextResponse.json({ error: '기본 카테고리는 수정할 수 없습니다.' });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: '카테고리 수정에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { categoryId: string } }) {
  try {
    // userId 검증 코드 추가
    const id = Number(params.categoryId);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: '유효한 id를 제공해주세요.' }, { status: 400 });
    }

    const existingCategory = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id)).get();

    if (!existingCategory) {
      return NextResponse.json({ error: '삭제할 카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }

    const category = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id)).get();

    if (!category) {
      return NextResponse.json({ error: '카테고리 정보를 가져오는 데 실패했습니다.' }, { status: 500 });
    }

    if (category.isDefault === 1) {
      return NextResponse.json({ error: '기본 카테고리는 삭제할 수 없습니다.' }, { status: 400 });
    }

    await db.delete(categoriesTable).where(eq(categoriesTable.id, id)).run();

    return NextResponse.json({ message: '카테고리가 성공적으로 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: '카테고리 삭제에 실패했습니다.' }, { status: 500 });
  }
}
