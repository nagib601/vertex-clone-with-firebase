import { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase.config";
import { collection, getDocs } from "firebase/firestore";

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "courses"));
                const coursesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCourses(coursesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching courses: ", error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-10 text-primary">Available Courses</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    courses.map(course => (
                        <div key={course.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200">
                            <figure className="h-48 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl font-bold">{course.title}</h2>
                                <p className="text-gray-600">{course.description?.slice(0, 80)}...</p>
                                <div className="card-actions justify-between items-center mt-4">
                                    <div className="badge badge-outline p-3 font-bold text-lg">{course.price} Tk</div>
                                    <button className="btn btn-primary btn-sm">Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            {courses.length === 0 && (
                <div className="text-center text-gray-400 mt-10">
                    <h3 className="text-2xl">No courses available right now.</h3>
                </div>
            )}
        </div>
    );
};

export default MyCourses;