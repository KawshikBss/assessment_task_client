import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const navigate = useNavigate();

    const onLogin = async (data) => {
        const response = await login(data);
        toast(response.message);
        navigate("/");
    };

    return (
        <Form
            onSubmit={handleSubmit(onLogin)}
            className="text-center p-4 rounded-4 shadow w-25"
        >
            <h1 className="mb-4">Login</h1>
            <Form.Group className="mb-3 text-start" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />
                {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                )}
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: 8,
                    })}
                />
                {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                )}
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
