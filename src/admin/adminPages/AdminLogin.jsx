import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Swal from 'sweetalert2'; // [অবশ্যই ইমপোর্ট থাকতে হবে]
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const AdminLogin = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdminLogin = async (event) => {
        event.preventDefault(); // পেজ রিলোড বন্ধ করা
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
                    // [SOLVED] await ব্যবহার করা হয়েছে
                    // এর মানে: ১.৫ সেকেন্ড টাইমার শেষ না হওয়া পর্যন্ত কোড এখানে থামবে
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Welcome, Administrator!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // টাইমার শেষ হওয়ার পর এই লাইন কাজ করবে
                    navigate('/admin/home', { replace: true });

                } else {
                    toast.error("Access Denied! You are not an Admin.");
                    navigate('/'); 
                }
            } else {
                toast.error("User not found in database!");
            }
        } catch (error) {
            console.error(error); // কনসোলে এরর চেক করার জন্য
            toast.error("Login Failed: " + error.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="card w-full max-w-md shadow-2xl bg-white">
                <div className="card-body">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold text-red-600">Admin Login</h2>
                    </div>
                    
                    <form onSubmit={handleAdminLogin}>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Email</span></label>
                            <input type="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text font-bold">Password</span></label>
                            <input type="password" name="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-red-600 hover:bg-red-700 text-white border-none">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;