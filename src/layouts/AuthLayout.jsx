import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
