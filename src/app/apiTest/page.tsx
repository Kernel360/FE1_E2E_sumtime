'use client';

import { useState, FormEvent } from 'react';

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

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, nickname }),
    });

    if (response.ok) {
      alert('User added successfully');
    } else {
      const errorData = await response.json();
      alert(`Failed to add user: ${errorData.error}`);
    }
  };
  const getUserIdByEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/user/getIdByEmail?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      alert(`UID: ${data.userId}`);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };
  const emailValidation = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/user/emailValidation?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Validation: ${data.isValid}`);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };
  const loginValidation = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/user/loginValidation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Validation: ${data.isValid}`);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };
  const todoSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const { name } = submitter;

    let endpoint = '';
    let method = '';
    let body: string | undefined;

    switch (name) {
      case 'create':
        endpoint = '/api/todo/create';
        method = 'POST';
        body = JSON.stringify({ userId, title, content, startTime, endTime, color });
        break;
      case 'read':
        endpoint = `/api/todo/read?userId=${userId}`;
        method = 'GET';
        break;
      case 'update':
        endpoint = '/api/todo/update';
        method = 'PUT';
        body = JSON.stringify({ userId, title, content, startTime, endTime, color });
        break;
      case 'delete':
        endpoint = '/api/todo/delete';
        method = 'DELETE';
        body = JSON.stringify({ userId, title, content, startTime, endTime, color });
        break;
      default:
        alert('Unknown action');
        return;
    }
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.ok) {
      const data = await response.json();
      alert(`${name.charAt(0).toUpperCase() + name.slice(1)} action was successful`);
      alert(JSON.stringify(data, null, 2));
      if (name === 'read' || name === 'update') {
        setUserId(data.todos[0].userId);
        setTodoId(data.todos[0].todoId);
        setTitle(data.todos[0].title);
        setContent(data.todos[0].content);
        setStartTime(data.todos[0].startTime);
        setEndTime(data.todos[0].endTime);
        setColor(data.todos[0].color);
      }
    } else {
      const errorData = await response.json();
      alert(`Failed to ${name} Todo: ${errorData.error}`);
    }
  };

  return (
    <div>
      <h1 style={{ color: 'orange' }}>Create User</h1>
      <form onSubmit={createUser}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" required />
        <button type="submit">Add User</button>
      </form>
      <h1>Get UserId</h1>
      <form onSubmit={getUserIdByEmail}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Get UID</button>
      </form>
      <h1>Email Validation</h1>
      <form onSubmit={emailValidation}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Can I Use This Email?</button>
      </form>

      <h1>Login Validation</h1>
      <form onSubmit={loginValidation}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Can I Login?</button>
      </form>
      <h1 style={{ color: 'orange' }}>Todo Control</h1>
      <form onSubmit={todoSubmitHandler} style={{ display: 'flex', flexDirection: 'column', width: '335px' }}>
        <div style={{ display: 'flex' }}>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="UserId" required />
          <input type="text" value={todoId} onChange={(e) => setTodoId(e.target.value)} placeholder="todoId(delete only)" />
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
          <button type="submit" name="read">
            Read Todo
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
