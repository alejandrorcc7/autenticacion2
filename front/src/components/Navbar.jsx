import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Inicia sesion para saber el secreto</Link>

                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            !!user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/pagsecreta">Secreto</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login"><i className="bi bi-incognito"></i></Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                    
                    <ul className="navbar-nav ms-auto">
                        {
                            !!user ? (
                                <li className="nav-item">
                                    <button className="btn btn-danger btn-sm my-1" onClick={logout}>Logout</button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
