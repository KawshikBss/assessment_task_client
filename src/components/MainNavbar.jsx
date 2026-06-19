import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MainNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await logout();
        toast("Logged out successfully!");
        navigate("/login");
    };
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Product CRUD</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {user.name ?? "----"}
                    </Navbar.Text>
                    <Navbar.Text className="ms-4">
                        <Button onClick={onLogout}>Logout</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNavbar;
