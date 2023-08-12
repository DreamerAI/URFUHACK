import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";


export const Layout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
    </div>
);
