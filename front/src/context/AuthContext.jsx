import { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../config";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                setUser(null);
                return;
            }

            const response = await fetch(`${baseURL}/api/pagsecreta`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                sessionStorage.clear();
                setUser(null);
                return;
            }

            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.log("Error en checkAuth:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch(`${baseURL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('access_token', data.access_token);
                await checkAuth();
            }
            return data;
        } catch (error) {
            console.log("Error en login:", error.message);
            return { error: "Error de conexión con el servidor" };
        }
    };

    const register = async (datos) => {
        console.log("Enviando datos al backend:", datos); 
        try {
            const response = await fetch(`${baseURL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            const data = await response.json();

            if (!response.ok) {
                return { error: data.error || "Error al registrar usuario" };
            }
    
            return data;
        } catch (error) {
            console.error("Error en register:", error);
            return { error: "Error de conexión con el servidor" };
        }
    };

    const logout = async () => {
        sessionStorage.clear();
        setUser(null);
    };

    const updateSecreto = async (datos) => {
        try {
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                sessionStorage.clear();
                setUser(null);
                return;
            }

            const response = await fetch(`${baseURL}/api/pagsecreta`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });

            if (response.status === 401) {
                sessionStorage.clear();
                setUser(null);
                return;
            }

            const data = await response.json();
            setUser(data.user);
            return data;
        } catch (error) {
            console.log("Error en updateSecreto:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, register, checkAuth, updateSecreto }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
