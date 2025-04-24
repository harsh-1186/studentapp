import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Registration() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('success'); // 'success' or 'danger'

    async function sendData(e) {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch("https://studentapp-backend-gi2i.onrender.com/", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            const res = await response.json();
            if (response.ok) {
                setAlertType('success');
                setMessage(res.msg || 'Registration successful!');
            } else {
                setAlertType('danger');
                setMessage(res.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setAlertType('danger');
            setMessage('An error occurred. Please try again later.');
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card shadow p-4">
                <h3 className="card-title text-center mb-4">Registration</h3>
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            id="name" 
                            placeholder="Enter your name" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter your email" 
                            required 
                        />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100" 
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
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

export default Registration;
