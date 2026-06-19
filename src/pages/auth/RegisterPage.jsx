import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const { register: authRegister } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const navigate = useNavigate();

    const onRegister = async (data) => {
        const response = await authRegister(data);
        toast(response.message);
        navigate("/");
    };
    return (
        <Form
            onSubmit={handleSubmit(onRegister)}
            className="text-center p-4 rounded-4 shadow w-25"
        >
            <h1 className="mb-4">Register</h1>
            <Form.Group className="mb-3 text-start" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="name"
                    placeholder="Enter name"
                    {...register("name", {
                        required: "Name is required",
                    })}
                />
                {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                )}
            </Form.Group>

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
                    })}
                />
                {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                )}
            </Form.Group>

            <Form.Group
                className="mb-3 text-start"
                controlId="password_confirmation"
            >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    {...register("password_confirmation", {
                        required: "Confirming your password is required",
                    })}
                />
                {errors.password_confirmation && (
                    <p className="text-danger">
                        {errors.password_confirmation.message}
                    </p>
                )}
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
