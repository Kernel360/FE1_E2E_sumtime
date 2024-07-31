'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const handleSubmit = async (event: React.FormEvent) => {
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
  const handleGetUserIdByEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/user/getIdByEmail?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      setUserId(data.userId);
      alert(`User ID: ${data.userId}`);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };

  return (
    <div>
      <hr />
      <div>
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Add User</button>
        </form>
        <h1>Get User ID by Email</h1>
        <form onSubmit={handleGetUserIdByEmail}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Get User ID</button>
        </form>

        {userId && <p>User ID: {userId}</p>}
      </div>
    </div>
  );
}
