import { useState, useEffect, createContext, useContext } from 'react';
import { registerUser, loginUser, logoutUser, getCurrentUser } from './appwriteClient'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const register = async (email, password, name, role) => {
        try {
            const newUser = await registerUser(email, password, name, role);
            setUser(newUser);
            return newUser;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const loggedInUser = await loginUser(email, password);
            setUser(loggedInUser);
            return loggedInUser;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
