import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/layout/MainNavbar";

const MainLayout = () => {
    return (
        <div>
            <MainNavbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
