import Swal from "sweetalert2";
import { db } from "../../firebase/Firebase.config";
import { collection, addDoc } from "firebase/firestore";

const AddCourse = () => {
    const handleAddCourse = async (event) => {
        event.preventDefault();
        const form = event.target;
        
        const title = form.title.value;
        const price = form.price.value;
        const imageInput = form.image.value; 
        const description = form.description.value || ""; // ডেসক্রিপশন না দিলে খালি থাকবে

        // ইমেজ না দিলে এই ডিফল্ট ইমেজটি (একটি আইকন ভিত্তিক ইমেজ) ব্যবহার হবে
        const defaultImage = "https://cdn-icons-png.flaticon.com/512/3342/3342137.png";
        const image = imageInput || defaultImage;

        const courseInfo = {
            title,
            price,
            image, 
            description
        };

        try {
            const docRef = await addDoc(collection(db, "courses"), courseInfo);
            
            if(docRef.id){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Course Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset(); 
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        }
    };

    return (
        <div className="w-full p-10 bg-base-100 dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-6 text-base-content">Add A New Course</h2>
            
            <form onSubmit={handleAddCourse}>
                {/* Course Title */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content">Course Title</span>
                    </label>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Type course name" 
                        className="input input-bordered w-full bg-base-200 text-base-content focus:border-primary" 
                        required 
                    />
                </div>

                {/* Price & Image URL */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Price (Tk)</span>
                        </label>
                        <input 
                            type="number" 
                            name="price" 
                            placeholder="Course Fee" 
                            className="input input-bordered w-full bg-base-200 text-base-content focus:border-primary" 
                            required 
                        />
                    </div>
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Image URL (Optional)</span>
                        </label>
                        <input 
                            type="text" 
                            name="image" 
                            placeholder="Image direct link" 
                            className="input input-bordered w-full bg-base-200 text-base-content focus:border-primary" 
                        />
                    </div>
                </div>

                {/* Description - Optional */}
                <div className="form-control w-full mb-6">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content">Course Details (Optional)</span>
                    </label>
                    <textarea 
                        name="description" 
                        className="textarea textarea-bordered h-24 bg-base-200 text-base-content focus:border-primary" 
                        placeholder="Write details about the course..."
                    ></textarea>
                </div>

                <button className="btn btn-primary w-full text-white text-lg hover:shadow-lg transition-all">
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourse;