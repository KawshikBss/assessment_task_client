import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

const MainLayout = () => {
    return (
        <div>
            <MainNavbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
