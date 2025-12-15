import React, { useState } from 'react'
import './Adduser.css'

const Adduser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const addUser = async () => {
    if (!name || !email || !password) {
      alert("All fields are required")
      return
    }

    try {
      const response = await fetch('http://localhost:5001/adduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        alert('Failed to add user')
        return
      }

      setUsers([...users, { id: Date.now(), name, email }])
      setName('')
      setEmail('')
      setPassword('')
      alert('User added successfully 🚀')

    } catch (error) {
      console.error(error)
      alert('Server error')
    }
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className="active">Add User</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="main">
        <header className="header">
          <h2>User Dashboard</h2>
        </header>

        <section className="card">
          <h3>Add New User</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={addUser}>Add User</button>
        </section>

        <section className="card">
          <h3>Added Users</h3>

          {users.length === 0 && <p className="empty">No users added</p>}

          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default Adduser
