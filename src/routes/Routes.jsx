import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

// Admin Imports
import AdminLogin from "../admin/adminPages/AdminLogin";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminHome from "../admin/adminPages/AdminHome";
import ManageUsers from "../admin/adminPages/ManageUsers";
import AddCourse from "../admin/adminPages/AddCourse";

// Student Imports (এখন আর লেআউট লাগবে না, সরাসরি পেজ ইমপোর্ট)
import MyCart from "../student/pages/MyCourses";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        path: "/home",
        element: <Home />, 
      }, 
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />, 
      },
      {
        path: "register", 
        element: <Register />, 
      },
      // [নতুন] স্টুডেন্ট যখন লগইন করবে, সে এই পেজগুলো দেখতে পারবে
      {
        path: "my-courses", // আগে ছিল /dashboard/my-cart, এখন /my-courses
        element: <PrivateRoute><MyCart /></PrivateRoute>, 
      },
      // এখানে আরও স্টুডেন্ট পেজ যোগ করতে পারেন (যেমন: Class Videos)
      {
        path: "admin-login",
        element: <AdminLogin />, 
      },
    ]
  },

  // ============ ADMIN DASHBOARD (অ্যাডমিন প্যানেল আলাদা থাকবে) ============
  {
    path: "admin",
    element: <PrivateRoute><AdminLayout /></PrivateRoute>, 
    children: [
      { path: "home", element: <AdminHome /> },
      { path: "all-users", element: <ManageUsers /> },
      { path: "add-course", element: <AddCourse /> }
    ]
  }
]);

export default router;