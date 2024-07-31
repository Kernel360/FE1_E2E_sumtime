import { db, schema } from '..';

async function addUser() {
  await db.insert(schema.usersTable).values({
    email: 'john@example.com',
    password: 'securepassword123',
  });
}

async function addTodo() {
  await db.insert(schema.todosTable).values({
    title: 'My First Todo',
    content: 'This is a todo item',
    startTime: '2024-01-01 09:00:00',
    endTime: '2024-01-01 10:00:00',
    userId: 1, // 예시 사용자 ID
  });
}

addUser().catch(console.error);
// addTodo().catch(console.error);
