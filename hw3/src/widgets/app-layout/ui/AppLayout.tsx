import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import "./layout.css";

export function AppLayout() {
    return (
        <div className="layoutRoot">
            <Sidebar />
            <div className="main">
                <Header />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}