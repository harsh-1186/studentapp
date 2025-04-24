import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('danger');

  async function sendData(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:3005/login", { // Make sure backend is running on this URL
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const res = await response.json();

      if (response.ok && res.msg === "success") {
        localStorage.setItem("authenticated", "true"); // ✅ Store authentication status
        setAlertType('success');
        setMessage('Login successful!');
        setTimeout(() => navigate("/dashboard"), 1000); // Redirect to dashboard
      } else {
        setAlertType('danger');
        setMessage(res.msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      setAlertType('danger');
      setMessage('An error occurred. Please try again later.');
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow p-4">
        <h3 className="card-title text-center mb-4">Login</h3>
        
        <form onSubmit={sendData}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              required
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <div className={`alert alert-${alertType} mt-3`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
