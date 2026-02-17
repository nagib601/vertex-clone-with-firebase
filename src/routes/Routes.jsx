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
import ManageCourses from "../admin/managecourses/ManageCourses"; // Import ঠিক আছে

// Student Imports
import MyCart from "../student/pages/MyCourses";
import About from "../pages/About";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/", // Home path fix (Empty string works as index) or "/home"
        element: <Home />,
      },
      {
        path: "home",
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
      {
        path: "my-courses",
        element: <PrivateRoute><MyCart /></PrivateRoute>,
      },
      // ❌ এখান থেকে managecourses সরিয়ে ফেলা হয়েছে কারণ এটি এখন এডমিন প্যানেলের অংশ
      {
        path: "admin-login",
        element: <AdminLogin />,
      },
    ]
  },

  // ============ ADMIN DASHBOARD ============
  {
    path: "admin",
    element: <PrivateRoute><AdminLayout /></PrivateRoute>, // পুরো লেআউট প্রোটেক্টেড
    children: [
      { path: "home", element: <AdminHome /> },      // URL: /admin/home
      { path: "all-users", element: <ManageUsers /> }, // URL: /admin/all-users
      { path: "add-course", element: <AddCourse /> },  // URL: /admin/add-course
      
      // ✅ এখানে যোগ করা হয়েছে
      { 
        path: "managecourses", 
        element: <ManageCourses /> 
      } 
    ]
  }
]);

export default routes;