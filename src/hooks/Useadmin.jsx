// src/hooks/useAdmin.jsx
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../firebase/Firebase.config"; // পাথ ঠিক আছে কিনা দেখে নেবেন
import { doc, getDoc } from "firebase/firestore";

const UseAdmin = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            console.log('Checking admin status');
            const userDocRef = doc(db, "users", user.uid);
            const res = await getDoc(userDocRef);
            return res.data()?.role === 'admin';
        }
    })
    return [isAdmin, isAdminLoading]
};

export default UseAdmin;