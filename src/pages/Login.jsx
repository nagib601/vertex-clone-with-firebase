import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase.config";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { signIn } = useContext(AuthContext); 
    const navigate = useNavigate();
    const location = useLocation();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setIsLoggingIn(true);

        try {
            const result = await signIn(email, password);
            const loggedInUser = result.user;

            const userDocRef = doc(db, "users", loggedInUser.uid);
            const userSnap = await getDoc(userDocRef);

            setIsLoggingIn(false);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const role = userData.role;

                if (role === 'admin') {
                    navigate('/admin/home', { replace: true });
                } else {
                    navigate('/my-courses', { replace: true });
                }
            } else {
                navigate('/my-courses', { replace: true });
            }
        } catch (error) {
            setIsLoggingIn(false);
        }
    };

    const handleGoogleLogin = () => {
        // Google Login Logic
    }

    return (
        // ✅ Change 1: bg-gray-100 -> bg-base-200 (Dark Mode Friendly)
        // ✅ Change 2: Added cursor-default to prevent pointer issue
        <div className="min-h-screen w-full flex items-center justify-center bg-base-200 font-sans cursor-default">
            
            {/* ✅ Change 3: bg-white -> bg-base-100 (Card Color) */}
            <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden flex max-w-4xl w-full m-4">
                
                {/* Left Side */}
                <div className="hidden md:flex w-1/2 bg-primary items-center justify-center p-10 text-white flex-col">
                    <img 
                        src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg" 
                        alt="Login Illustration" 
                        className="w-full h-auto mb-4 rounded-lg mix-blend-multiply"
                    />
                    <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                    <p className="text-center text-white/90">
                        Access your courses, track progress, and start learning today.
                    </p>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        {/* ✅ Change 4: text-gray-800 -> text-base-content */}
                        <h2 className="text-3xl font-bold text-base-content">Student Login</h2>
                        <p className="text-base-content/70 mt-2">Please sign in to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Email Address</span>
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-base-100" 
                                required 
                            />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Password</span>
                            </label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Enter your password" 
                                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-base-100" 
                                required 
                            />
                            <span 
                                className="absolute top-[50px] right-4 cursor-pointer text-base-content/60 hover:text-primary transition"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button 
                                disabled={isLoggingIn} 
                                className="btn btn-primary w-full text-white text-lg font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                {isLoggingIn ? <span className="loading loading-spinner"></span> : "LOGIN"}
                            </button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <button 
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200 hover:border-gray-300 text-base-content"
                    >
                        <FaGoogle className="text-red-500" /> 
                        Continue with Google
                    </button>

                    <p className="text-center mt-6 text-base-content/70">
                        Don't have an account? 
                        <Link to="/register" className="text-primary font-bold hover:underline ml-1">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;