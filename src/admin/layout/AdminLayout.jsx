import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUsers, FaBook, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider"; // পাথ ঠিক করে নেবেন

const AdminLayout = () => {
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            {/* ============ ডান পাশের অংশ (Header + Content) ============ */}
            <div className="drawer-content flex flex-col bg-gray-100 min-h-screen">
                
                {/* [NEW] Admin Header (শুধুমাত্র অ্যাডমিন প্যানেলের জন্য) */}
                <div className="w-full navbar bg-white shadow-md px-10">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <FaBars className="text-xl"/>
                        </label>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-700">Admin Dashboard</h2>
                    </div>
                    <div className="flex-none gap-4">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="admin" />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Main Page Content */}
                <div className="p-8">
                    <Outlet></Outlet>
                </div>
            </div> 
            
            {/* ============ বাম পাশের অংশ (Sidebar) ============ */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-[#1e293b] text-white">
                    {/* Sidebar Logo/Title */}
                    <div className="mb-8 mt-4 text-center">
                        <h2 className="text-3xl font-bold text-yellow-500">Vertex<span className="text-white">BCS</span></h2>
                        <p className="text-xs text-gray-400 tracking-widest mt-1">ADMIN CONTROL</p>
                    </div>

                    {/* Menu Items */}
                    <li className="mb-2">
                        <NavLink to="/admin/home" className={({ isActive }) => isActive ? "bg-primary text-white" : ""}>
                            <FaHome /> Dashboard Home
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/admin/all-users" className={({ isActive }) => isActive ? "bg-primary text-white" : ""}>
                            <FaUsers /> Manage Users
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/admin/add-course" className={({ isActive }) => isActive ? "bg-primary text-white" : ""}>
                            <FaBook /> Add New Course
                        </NavLink>
                    </li>

                    <div className="divider bg-gray-600 h-[1px] my-6"></div>
                    
                    <li className="mb-2">
                        <NavLink to="/">
                            <FaHome /> Back to Main Website
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogOut} className="bg-red-600 hover:bg-red-700 text-white mt-4">
                            <FaSignOutAlt /> Log Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminLayout;