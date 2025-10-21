import React from 'react';
import toast from 'react-hot-toast';
import axiosClient from '../../API/axiosClient';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
// import DeleteCourse from './DeleteCourse';




export default function ViewCourses() {

  const [courses, setCourses] = useState([]);
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/course');
      setCourses(response.data.courses);
    } catch (error) {
      setLoading(true);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  const DeleteCourse = async (courseId)=>{

    try {
      setLoading(true)
      const response = await axiosClient.delete(`/course/delete/${courseId}`)
      console.log(response.data)
      setResponse(response.data)
    } catch (error) {
      setLoading(true)
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  }



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses &&
          courses.map(course => (

            <div
              key={course._id}
              className="group min-h-[290px] w-full bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer relative"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {course.title}
              </h3>
              <p className="text-gray-200 mt-2 line-clamp-3">
                {course.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-white font-bold">₹{course.price}</span>
                <span className="text-gray-200 bg-white/20 px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
              <span className='absolute bottom-2 left-4'>
                <button className='btn btn-success' onClick={()=>navigate('/admin/viewcourses/coursedetails')}>View Details</button>
                <button className='btn btn-primary'>Update Course</button>
                <button 
                  className='btn btn-secondary' 
                  onClick={()=>DeleteCourse(course._id)}
                >Delete Course</button>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
