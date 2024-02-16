import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import  InstructorChart  from './InstructorChart';

export const Instrcutor = () => {

    const {token} = useSelector((state)=> state.auth);
    //console.log("tokkkkken=>", token);
    const {user} = useSelector((state)=> state.profile) ;

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstrcutorData] = useState(null);
    const [courses, setCourses] = useState([]);
 
    useEffect(()=>{
        const getCourseDataWithStars = async() =>{
            setLoading(true);
            // 
            const instructorApiData = await getInstructorData(token);

            if(instructorApiData.length)
            {
                setInstrcutorData(instructorApiData);
            }
            

            setLoading(false);
        }
        getCourseDataWithStars();
    }, []);


    const totalAmount = instructorData?.reduce((acc,curr)=> acc+ curr.totalAmountGenerated , 0);
    const totalStudents = instructorData?.reduce((acc, curr)=> acc + curr.totalStudentsEnrolled, 0);

  return (
    
    <div>
  <div className="space-y-2">
    <h1 className="text-2xl font-bold text-richblack-5">
      Hi {user?.firstName} 👋
    </h1>
    <p className="font-medium text-richblack-200">
      Let's start something new
    </p>
  </div>
  {loading ? (
    <div className="spinner"></div>
  ) : (
    <div className="my-4 flex lg:flex-row flex-col gap-3 gap-y-5 h-full lg:h-full space-x-4">
      {/* Render chart / graph */}
      {totalAmount > 0 || totalStudents > 0 ? (
        <InstructorChart courses={instructorData} />
      ) : (
        <div className="flex-1 rounded-md bg-richblack-800 p-6">
          <p className="text-lg font-bold text-richblack-5">Visualize</p>
          <p className="mt-4 text-xl font-medium text-richblack-50">
            Not Enough Data To Visualize
          </p>
        </div>
      )}
      {/* Total Statistics */}
      <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Statistics</p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-lg text-richblack-200">Total Courses</p>
            <p className="text-3xl font-semibold text-richblack-50">
              {courses.length}
            </p>
          </div>
          <div>
            <p className="text-lg text-richblack-200">Total Students</p>
            <p className="text-3xl font-semibold text-richblack-50">
              {totalStudents}
            </p>
          </div>
          <div>
            <p className="text-lg text-richblack-200">Total Income</p>
            <p className="text-3xl font-semibold text-richblack-50">
              Rs. {totalAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  )
}
