import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/Firebase.config";
import Swal from "sweetalert2"; // ✅ এখানে ইমপোর্ট করা হয়েছে

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ১. ইউজার তৈরি করা (Sign Up)
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // ২. লগইন করা (Sign In) - ✅ এখানে SweetAlert যুক্ত করা হয়েছে
    const signIn = async (email, password) => {
        setLoading(true);
        try {
            // ফায়ারবেস লগইন
            const result = await signInWithEmailAndPassword(auth, email, password);
            
            // ✅ লগইন সফল হলে এখানে অ্যালার্ট দেখাবে এবং ১.৫ সেকেন্ড অপেক্ষা করবে
            await Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });

            return result; // সফল হলে রেজাল্ট রিটার্ন করবে
        } catch (error) {
            // ❌ এরর হলে এখানে অ্যালার্ট দেখাবে
            setLoading(false);
            Swal.fire({
                title: 'Login Failed',
                text: error.message, // অথবা 'Invalid Email/Password'
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
            throw error; // এররটা ছুড়ে দেবে যাতে লগইন পেজ বুঝতে পারে ফেইল হয়েছে
        }
    }

    // ৩. লগআউট করা - ✅ এখানেও অ্যালার্ট দেওয়া হলো
    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            return Swal.fire({
                title: 'Logged Out',
                text: 'See you soon!',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error(error);
        }
    }

    // ৪. প্রোফাইল আপডেট
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    // ৫. ইউজার পর্যবেক্ষণ
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;