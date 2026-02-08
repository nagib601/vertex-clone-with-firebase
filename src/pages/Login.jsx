import { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast"; // শুধু টোস্ট রাখা হলো (এটা পেজ লোড আটকায় না)
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const Login = () => {
    const { signIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    // [নতুন ফিচার] যদি ইউজার আগেই লগইন করা থাকে, তবে তাকে লগইন পেজ দেখতে দেবে না
    // সে অটোমেটিক হোম পেজে চলে যাবে।
    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // ১. সাইন ইন ফাংশন কল
            const result = await signIn(email, password);
            const loggedInUser = result.user;

            // ২. রোল চেক করা
            const userDocRef = doc(db, "users", loggedInUser.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                
                // [দ্রুততম সমাধান] কোনো অ্যালার্ট নেই, সরাসরি রিডাইরেক্ট
                if (userData.role === 'student') {
                    navigate('/my-courses', { replace: true });
                    toast.success('Logged In Successfully'); // এটা ব্যাকগ্রাউন্ডে দেখাবে
                } 
                else if (userData.role === 'admin') {
                    navigate('/admin/home', { replace: true });
                    toast.success('Welcome Admin');
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left ml-10">
                    <h1 className="text-5xl font-bold">Student Login</h1>
                    <p className="py-6">Join your course and start learning today!</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>New Student? <Link to="/register" className="text-blue-600 font-bold">Register Here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;