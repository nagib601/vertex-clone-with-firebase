import Swal from "sweetalert2";
import { db } from "../../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";

const AddCourse = () => {
    const handleAddCourse = async (event) => {
        event.preventDefault();
        const form = event.target;
        
        const title = form.title.value;
        const price = form.price.value;
        const image = form.image.value; // ছবির ডিরেক্ট লিংক দিতে হবে
        const description = form.description.value;

        const courseInfo = {
            title,
            price,
            image,
            description
        };

        try {
            // ডাটাবেসে 'courses' নামে একটি কালেকশনে সেভ হবে
            const docRef = await addDoc(collection(db, "courses"), courseInfo);
            
            if(docRef.id){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Course Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset(); // ফর্ম ক্লিয়ার করবে
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
        <div className="w-full p-10 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Add A New Course</h2>
            
            <form onSubmit={handleAddCourse}>
                {/* Course Title */}
                <div className="form-control w-full mb-4">
                    <label className="label"><span className="label-text font-semibold">Course Title</span></label>
                    <input type="text" name="title" placeholder="Type course name" className="input input-bordered w-full" required />
                </div>

                {/* Price & Image URL */}
                <div className="flex gap-4 mb-4">
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Price (Tk)</span></label>
                        <input type="number" name="price" placeholder="Course Fee" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Image URL</span></label>
                        <input type="text" name="image" placeholder="Image direct link" className="input input-bordered w-full" required />
                    </div>
                </div>

                {/* Description */}
                <div className="form-control w-full mb-6">
                    <label className="label"><span className="label-text font-semibold">Course Details</span></label>
                    <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Write details about the course..."></textarea>
                </div>

                <button className="btn btn-primary w-full text-white text-lg">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;