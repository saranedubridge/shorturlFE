import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Style/Style.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.post('https://shorturlbe.onrender.com/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { token, email, name } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('name', name);

                setSuccessMessage('Login successful. Redirecting...');
                setTimeout(() => navigate('/dashboard'), 1000); // Redirect after a delay
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred during login. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="text-center mt-3">
                    Don't Have an Account? <Link to="/">Register</Link>
                </p>
                <p className="text-center mt-3">
                    <Link to="/forget-password">Forget Password</Link>
                </p> <br />
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
            </div>
        </div>
    );
}

export default Login;
