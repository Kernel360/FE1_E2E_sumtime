'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const addUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('User added successfully');
    } else {
      const errorData = await response.json();
      alert(`Failed to add user: ${errorData.error}`);
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

  return (
    <div>
      <div>
        <h1>Add User</h1>
        <form onSubmit={addUser}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Add User</button>
        </form>
        <h1>Email Validation</h1>
        <form onSubmit={emailValidation}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <button type="submit">Get User ID</button>
        </form>
        <h1>Login Validation</h1>
        <form onSubmit={loginValidation}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
