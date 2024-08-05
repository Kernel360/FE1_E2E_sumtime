'use client';

import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createUser, emailValidation, getUserIdByEmail, loginValidation } from '@/app/apiTest/calls/userCalls';
import { createTodo, getAllByUserId, getOneByTodoId, remove, update } from '@/app/apiTest/calls/todoCalls';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('');
  const [todoId, setTodoId] = useState('');

  const getUserIdByEmailQuery = useQuery({ queryKey: ['userId', email], queryFn: () => getUserIdByEmail(email) });

  const createUserHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    alert(await createUser(email, password, nickname));
    // alert(JSON.stringify(await createUser(email, password, nickname), null, 2));
  };

  const getUserIdHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    alert(await getUserIdByEmailQuery.data);
  };

  const emailValidationHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    alert(await emailValidation(email));
  };
  const loginValidationHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    alert(await loginValidation(email, password));
  };
  const todoSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const { name } = submitter;

    switch (name) {
      case 'create':
        alert(JSON.stringify(await createTodo(userId, title, content, startTime, endTime, color), null, 2));
        break;
      case 'getAllByUserId':
        alert(JSON.stringify(await getAllByUserId(userId), null, 2));
        break;
      case 'getOneByTodoId':
        alert(JSON.stringify(await getOneByTodoId(todoId), null, 2));
        break;
      case 'update':
        alert(JSON.stringify(await update(todoId, title, content, startTime, endTime, color), null, 2));
        break;
      case 'delete':
        alert(await remove(todoId));
        break;
      default:
        alert('Unknown action');
    }
  };

  return (
    <div>
      <h1 style={{ color: 'orange' }}>Create User</h1>
      <form onSubmit={createUserHandler}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" required />
        <button type="submit">Add User</button>
      </form>
      <h1>Get UserId</h1>
      <form onSubmit={getUserIdHandler}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Get UID</button>
      </form>
      <h1>Email Validation</h1>
      <form onSubmit={emailValidationHandler}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Can I Use This Email?</button>
      </form>

      <h1>Login Validation</h1>
      <form onSubmit={loginValidationHandler}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Can I Login?</button>
      </form>
      <h1 style={{ color: 'orange' }}>Todo Control</h1>
      <form onSubmit={todoSubmitHandler} style={{ display: 'flex', flexDirection: 'column', width: '335px' }}>
        <div style={{ display: 'flex' }}>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="UserId" />
          <input type="text" value={todoId} onChange={(e) => setTodoId(e.target.value)} placeholder="todoId" />
        </div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content(optional)" />
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="StartTime(optional)" />
        <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="endTime(optional)" />
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="color(optional)" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" name="create">
            Create Todo
          </button>
          <button type="submit" name="getAllByUserId">
            Read Todo By UserId
          </button>
          <button type="submit" name="getOneByTodoId">
            Read Todo By TodoId
          </button>
          <button type="submit" name="update">
            Update Todo
          </button>
          <button type="submit" name="delete">
            Delete Todo
          </button>
        </div>
      </form>
    </div>
  );
}
