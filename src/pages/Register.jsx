import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// পাথ ঠিক করা হয়েছে (providers এর বদলে context এবং ../../ এর বদলে ../)
import { AuthContext } from "../context/AuthProvider";
import { useForm } from "react-hook-form"; 
import toast from "react-hot-toast";
// ফায়ারবেস কনফিগের পাথ ঠিক করা হয়েছে
import { db } from "../firebase/Firebase.config"; 
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // ডিফল্টভাবে সবাই Student হিসেবে জয়েন করবে
        const role = "student"; 

        try {
            // ১. ফায়ারবেস অথেনটিফিকেশন
            const result = await createUser(email, password);
            const user = result.user;

            // ২. নাম আপডেট করা
            await updateUserProfile(name, "https://via.placeholder.com/150");

            // ৩. ডাটাবেসে (Firestore) ইউজারের তথ্য সেভ করা
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                role: role, // এই রোল দিয়ে আমরা পরে চেক করব
                uid: user.uid
            });

            toast.success("Registration Successful!");
            navigate('/');
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;