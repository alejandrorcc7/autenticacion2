import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { user, login, checkAuth } = useAuth();

    const [error, setError] = useState(null);
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        console.log("Datos enviados al backend:", { email, password }); 
    
        const data = await login({ email, password });
    
        if (data?.error) {
            setError(data.error);
        } else {
            sessionStorage.setItem('access_token', data.access_token);
            await checkAuth();
            navigate('/pagsecreta');
        }
    };
    

    if (user) return <Navigate to="/pagsecreta" replace />;
    return (
        <div className='w-50 mx-auto my-5'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="mail" className="form-label">Mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-control" 
                        placeholder='nombre@mail.com'
                        onChange={e => setMail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        placeholder='********'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary btm-sm py-2 w-25">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
