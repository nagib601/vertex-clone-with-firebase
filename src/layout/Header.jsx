import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/UseAdmin';
import { FaSignOutAlt } from "react-icons/fa"; // আইকন ইমপোর্ট করা হয়েছে

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        
        {
            user && isAdmin && <li><Link to="/admin/home">Admin Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/my-courses">My Courses</Link></li>
        }
    </>

    return (
        <div className="w-full fixed z-10 bg-opacity-30 bg-black text-white backdrop-blur-sm">
            <div className="navbar max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">MY <span className='text-yellow-400'>WEB</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <span className='mr-4 font-semibold hidden md:block text-gray-300'>{user?.displayName}</span>
                            
                            {/* [PREMIUM LOG OUT BUTTON] */}
                            <button 
                                onClick={handleLogOut} 
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] group"
                            >
                                <span className="text-sm">Log Out</span>
                                <FaSignOutAlt className="group-hover:translate-x-1 transition-transform duration-300 text-sm" />
                            </button>

                        </> : <>
                            <Link to="/login" className="btn btn-primary btn-sm px-6">Login</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;