import { createContext, useContext, useEffect, useState } from "react";
import {
    login as authLogin,
    register as authRegister,
    logout as authLogout,
    getUser,
} from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("api-token");

        async function loadUser() {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await getUser();
                console.log(response);

                setUser(response.data.user);
            } catch (err) {
                localStorage.removeItem("api-token");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

    async function login(credentials) {
        const response = await authLogin(credentials);

        if (response.success) {
            localStorage.setItem("api-token", response.data.token);

            setUser(response.data.user);
        }

        return response;
    }

    async function register(data) {
        const response = await authRegister(data);

        if (response.success) {
            localStorage.setItem("api-token", response.data.token);

            setUser(response.data.user);
        }

        return response;
    }

    async function logout() {
        try {
            await authLogout();
        } finally {
            localStorage.removeItem("api-token");
            setUser(null);
        }
    }
    const isAuthenticated = !!user && !!localStorage.getItem("api-token");

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated: isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
