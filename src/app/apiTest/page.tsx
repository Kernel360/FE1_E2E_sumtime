'use client';

import { useState } from 'react';

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

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/user/add', {
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
  const createTodo = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/todo/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, title, content, startTime, endTime, color }),
    });

    if (response.ok) {
      alert('Todo added successfully');
    } else {
      const errorData = await response.json();
      alert(`Failed to add Todo: ${errorData.error}`);
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
      <h1 style={{ color: 'orange' }}>Create Todo</h1>
      <form onSubmit={createTodo} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input type="text" onChange={(e) => setUserId(e.target.value)} placeholder="UserId" required />
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" onChange={(e) => setContent(e.target.value)} placeholder="Content(optional)" />
        <input type="text" onChange={(e) => setStartTime(e.target.value)} placeholder="StartTime(optional)" />
        <input type="text" onChange={(e) => setEndTime(e.target.value)} placeholder="endTime(optional)" />
        <input type="text" onChange={(e) => setColor(e.target.value)} placeholder="color(optional)" />
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
}
