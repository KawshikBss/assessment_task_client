import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import ClientProvider from "./api/ClientProvider";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <ClientProvider>
            <AuthProvider>
                <RouterProvider router={router} />
                <ToastContainer />
            </AuthProvider>
        </ClientProvider>
    );
}

export default App;
