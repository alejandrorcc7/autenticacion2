import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        console.log("Datos enviados:", form);  
    
        const data = await register(form);
    
        if (data?.error) {
            setError(data.error);
        } else {
            navigate('/login');
        }
    };
    
    return (
        <div className='w-50 mx-auto my-5'>
            <h2>Registro</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>
               
                <div className='form-group mb-3'>
                    <label htmlFor='email' className='form-label'>Correo Electrónico</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        className='form-control' 
                        placeholder='nombre@mail.com'
                        value={form.email}
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='password' className='form-label'>Contraseña</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        className='form-control' 
                        placeholder='********'
                        value={form.password}
                        onChange={handleChange} 
                        required
                    />
                </div>
                <button className='btn btn-primary btn-sm py-2 w-25'>
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
