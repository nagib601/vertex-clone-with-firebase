import React from 'react';
import { FaTrashAlt, FaPlus, FaEye } from "react-icons/fa"; // FaEye import kora hoyeche
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageCourses = () => {
    // Demo Data
    const courses = [
        { _id: 1, name: "React Web Development", price: 5000, instructor: "Jhankar Mahbub" },
        { _id: 2, name: "Full Stack MERN", price: 6000, instructor: "Sumit Saha" },
        { _id: 3, name: "Python for Beginners", price: 4000, instructor: "Anisul Islam" },
    ];

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Course has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        // Main Container e dark mode class add kora hoyeche
        <div className="w-full min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold dark:text-white">Manage All Courses</h2>
                    <p className="text-gray-500 dark:text-gray-400">Total Courses: {courses.length}</p>
                </div>
                
                {/* [BUTTON] Add New Course */}
                <Link to="/admin/add-course">
                    <button className="btn btn-primary flex items-center gap-2 text-white">
                        <FaPlus /> Add New Course
                    </button>
                </Link>
            </div>

            {/* Course Table Container */}
            <div className="overflow-x-auto w-full shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase">
                        <tr>
                            <th className="py-4">#</th>
                            <th className="py-4">Course Name</th>
                            <th className="py-4">Instructor</th>
                            <th className="py-4">Price</th>
                            <th className="py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            courses.map((course, index) => (
                                <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-200">
                                    <td className="dark:text-gray-300 font-semibold">{index + 1}</td>
                                    
                                    <td className="font-bold text-gray-700 dark:text-white">
                                        {course.name}
                                    </td>
                                    
                                    <td className="text-gray-600 dark:text-gray-300">
                                        {course.instructor}
                                    </td>
                                    
                                    <td className="font-semibold text-gray-700 dark:text-gray-200">
                                        ৳ {course.price}
                                    </td>
                                    
                                    {/* Actions Column */}
                                    <td className="flex justify-center items-center gap-3 py-4">
                                        
                                        {/* VIEW BUTTON (Link to My Courses) */}
                                        <Link to="/my-courses">
                                            <button 
                                                className="btn btn-sm btn-ghost bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-300"
                                                title="View Details"
                                            >
                                                <FaEye size={16} />
                                            </button>
                                        </Link>

                                        {/* DELETE BUTTON */}
                                        <button 
                                            onClick={() => handleDelete(course._id)} 
                                            className="btn btn-sm btn-ghost bg-red-100 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white transition-colors duration-300"
                                            title="Delete Course"
                                        >
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCourses;