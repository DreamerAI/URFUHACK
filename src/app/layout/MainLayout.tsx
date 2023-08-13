import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";


export const Layout = () => (
    <div className="flex flex-col">
        <Navbar />
        <Outlet />
    </div>
);
