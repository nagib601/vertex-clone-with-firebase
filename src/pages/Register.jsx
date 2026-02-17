import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../firebase/Firebase.config"; 
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        // Photo URL ভেরিয়েবল এখান থেকে সরিয়ে দেওয়া হয়েছে
        const email = form.email.value;
        const password = form.password.value;
        const role = "student"; 

        setIsRegistering(true); 

        try {
            // ১. ফায়ারবেস অথেনটিফিকেশন
            const result = await createUser(email, password);
            const user = result.user;

            // ২. নাম আপডেট করা (Photo null রাখা হয়েছে বা ডিফল্ট ইমেজ দিতে পারেন)
            await updateUserProfile(name, null);

            // ৩. ডাটাবেসে (Firestore) ইউজারের তথ্য সেভ করা
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                role: role,
                uid: user.uid
                // photo ফিল্ডটি ডাটাবেস সেভ অবজেক্ট থেকেও সরানো হয়েছে
            });

            setIsRegistering(false); 

            // ৪. সাকসেস অ্যালার্ট
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registration Successful!",
                text: "Account created successfully.",
                showConfirmButton: false,
                timer: 2000
            });
            
            navigate('/');
            
        } catch (error) {
            setIsRegistering(false);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message,
            });
        }
    }

    const handleGoogleLogin = () => {
        Swal.fire("Info", "Google Login Coming Soon!", "info");
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-base-200 font-sans cursor-default">
            
            <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden flex max-w-4xl w-full m-4">
                
                {/* বাম পাশ - ইমেজ */}
                <div className="hidden md:flex w-1/2 bg-primary items-center justify-center p-10 text-white flex-col">
                    <img 
                        src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg" 
                        alt="Register Illustration" 
                        className="w-full h-auto mb-4 rounded-lg mix-blend-multiply"
                    />
                    <h2 className="text-3xl font-bold mb-2">Join Us!</h2>
                    <p className="text-center text-white/90">
                        Create an account to unlock exclusive courses and start your journey.
                    </p>
                </div>

                {/* ডান পাশ - ফর্ম */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-base-content">Create Account</h2>
                        <p className="text-base-content/70 mt-2">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Full Name</span>
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Enter your full name" 
                                className="input input-bordered w-full focus:outline-none focus:border-primary bg-base-100" 
                                required 
                            />
                        </div>

                        {/* Photo URL Input সেকশনটি এখান থেকে সম্পূর্ণ মুছে ফেলা হয়েছে */}

                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Email Address</span>
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                className="input input-bordered w-full focus:outline-none focus:border-primary bg-base-100" 
                                required 
                            />
                        </div>

                        {/* Password Input with Toggle */}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Password</span>
                            </label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Create a password" 
                                className="input input-bordered w-full focus:outline-none focus:border-primary bg-base-100" 
                                required 
                            />
                            <span 
                                className="absolute top-[35px] right-4 cursor-pointer text-base-content/60 hover:text-primary transition"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                        </div>

                        {/* Register Button */}
                        <div className="form-control mt-6">
                            <button 
                                disabled={isRegistering} 
                                className="btn btn-primary w-full text-white text-lg font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                {isRegistering ? <span className="loading loading-spinner"></span> : "REGISTER"}
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
                        Already have an account? 
                        <Link to="/login" className="text-primary font-bold hover:underline ml-1">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;