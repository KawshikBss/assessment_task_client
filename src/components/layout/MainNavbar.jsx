import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/">Products</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/categories">Categories</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {user.name ?? "----"}
                    </Navbar.Text>
                    <Navbar.Text className="ms-4">
                        <Button onClick={onLogout} variant="danger">
                            Logout
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNavbar;
