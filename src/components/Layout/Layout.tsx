import { Outlet } from "react-router";
import Header from "../Header/Header";
import "./Layout.css";




export default function Layout(){
    return (
        <div className="layout">
            <div className="layout-panel">
                <Header title="רשימת משימות" />
                <Outlet />
            </div>
            <footer />
        </div>
    );
}
