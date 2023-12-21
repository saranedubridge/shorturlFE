import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Style/Style.css";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store error messages
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset any previous error
        console.log('Registering user...');
        try {
            const response = await axios.post('http://localhost:3001/api/users', { name, email, password });
            if (response.status === 201) {
                console.log('Registration successful. Check email for activation link.');
                alert('Registration successful. Please check your email to activate your account.');
                navigate('/login'); // Navigate to login after registration
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Email already in use. Please choose a different email.');
            } else {
                setError('An error occurred while registering. Please try again.');
            }
            console.error('Registration Failed!');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-center mt-3">
                    Already Have an Account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
