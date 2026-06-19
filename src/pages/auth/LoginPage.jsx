import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <Form className="text-center p-4 rounded-4 shadow w-25">
            <h1 className="mb-4">Login</h1>
            <Form.Group className="mb-3 text-start" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>

            <p className="mt-4">
                Don't have an account?{" "}
                <Link className="text-decoration-none" to={"/register"}>
                    Register
                </Link>
            </p>
        </Form>
    );
};

export default LoginPage;
