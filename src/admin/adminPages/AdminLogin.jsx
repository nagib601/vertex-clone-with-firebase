import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
// Swal ইমপোর্ট সরিয়ে ফেলা হয়েছে
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase.config.js";
import { FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";

const AdminLogin = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdminLogin = async (event) => {
        event.preventDefault(); 
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await signIn(email, password);
            const user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                
                if (userData.role === 'admin') {
                    // ✅ SweetAlert সরানো হয়েছে
                    // শুধু একটি ছোট টোস্ট মেসেজ এবং রিডাইরেক্ট
                    toast.success("Welcome Back, Administrator!");
                    navigate('/admin/home', { replace: true });

                } else {
                    toast.error("Access Denied! You are not an Admin.");
                    navigate('/'); 
                }
            } else {
                toast.error("User not found in database!");
            }
        } catch (error) {
            console.error(error); 
            toast.error("Login Failed: " + error.message);
        }
    }

    return (
        // প্রিমিয়াম ব্যাকগ্রাউন্ড (Dark Gradient)
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black font-sans">
            
            {/* মেইন কার্ড - Glassmorphism Effect */}
            <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10 m-4 min-h-[600px]">
                
                {/* বাম পাশ - ভিজ্যুয়াল আর্ট */}
                <div className="hidden md:flex w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
                    {/* ডেকোরেটিভ অ্যানিমেশন */}
                    <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    
                    <div className="relative z-10 text-center p-10">
                        <div className="mb-6 inline-block p-4 rounded-full bg-white/5 border border-white/10 shadow-lg">
                            <FaUserShield className="text-6xl text-blue-400" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">Admin Portal</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Welcome back to the command center. <br />
                            Manage your courses, users, and content securely.
                        </p>
                    </div>
                </div>

                {/* ডান পাশ - ফর্ম */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-10 md:p-14">
                    <div className="mb-10">
                        <h3 className="text-3xl font-extrabold text-slate-800">Sign In</h3>
                        <p className="text-slate-500 mt-2 text-sm">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="space-y-6">
                        {/* ইমেইল ইনপুট */}
                        <div className="relative">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Email Address</label>
                            <div className="relative flex items-center">
                                <FaEnvelope className="absolute left-4 text-slate-400 z-10" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="admin@example.com" 
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-slate-700 font-medium" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* পাসওয়ার্ড ইনপুট */}
                        <div className="relative">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Password</label>
                            <div className="relative flex items-center">
                                <FaLock className="absolute left-4 text-slate-400 z-10" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="••••••••" 
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-slate-700 font-medium" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* লগইন বাটন */}
                        <div className="pt-4">
                            <button className="w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-black hover:to-slate-900 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                                ACCESS DASHBOARD
                            </button>
                        </div>
                    </form>

                    {/* ফুটার */}
                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <p className="text-xs text-slate-400">
                            Authorized personnel only. <br/>
                            <a href="/" className="text-blue-600 hover:text-blue-800 font-semibold mt-2 inline-block transition-colors">Back to Home</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;