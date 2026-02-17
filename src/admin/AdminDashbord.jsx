// src/layout/Dashboard.jsx
import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaHome, FaUsers, FaWallet, FaList, FaShoppingCart, FaAd } from "react-icons/fa"; // react-icons ইন্সটল করা থাকলে
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    // [TODO] এটি আমরা পরে ডাটাবেস থেকে ডাইনামিক করব।
    // আপাতত চেক করার জন্য true অথবা false করে দেখুন।
    const isAdmin = true; 

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            {/* Main Content Area (Right Side) */}
            <div className="drawer-content flex flex-col p-8">
                {/* Mobile Toggle Button */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">Open Menu</label>
                
                {/* Dashboard Page Content renders here */}
                <Outlet></Outlet>
            </div> 
            
            {/* Sidebar Area (Left Side) */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar Header */}
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold">My web</h2>
                        <p className="text-sm text-gray-500">Dashboard</p>
                    </div>

                    {
                        isAdmin ? 
                        <>
                            {/* ============ Admin Menu ============ */}
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome> Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-course">
                                    <FaBook></FaBook> Add Course
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-courses">
                                    <FaList></FaList> Manage Courses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers> All Users
                                </NavLink>
                            </li>
                        </>
                        :
                        <>
                            {/* ============ Student Menu ============ */}
                            <li>
                                <NavLink to="/dashboard/userHome">
                                    <FaHome></FaHome> User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mycart">
                                    <FaShoppingCart></FaShoppingCart> My Selected Courses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/history">
                                    <FaWallet></FaWallet> Payment History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-classes">
                                    <FaBook></FaBook> My Enrolled Classes
                                </NavLink>
                            </li>
                        </>
                    }

                    {/* ============ Shared/Common Menu ============ */}
                    <div className="divider"></div> 
                    
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            Contact Support
                        </NavLink>
                    </li>
                </ul>
            
            </div>
        </div>
    );
};

export default Dashboard;