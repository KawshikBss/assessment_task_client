import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <Form className="text-center p-4 rounded-4 shadow w-25">
            <h1 className="mb-4">Register</h1>
            <Form.Group className="mb-3 text-start" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group
                className="mb-3 text-start"
                controlId="password_confirmation"
            >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>

            <p className="mt-4">
                Already have an account?{" "}
                <Link className="text-decoration-none" to={"/login"}>
                    Login
                </Link>
            </p>
        </Form>
    );
};

export default RegisterPage;
