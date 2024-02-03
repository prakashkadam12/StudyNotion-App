import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import IconBtn from "../../../common/IconBtn";
import CoursesTable from "../Instructor Courses/CourseTable";

const MyCourses = () => {

    const {token} = useSelector((state)=> state.auth);
    const navigate = useNavigate() ;

    const [courses, setCourses] = useState([]);

    useEffect(()=>{

        // fetching all courses
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token) ;

            if(result){
                setCourses(result);
            }
        }
        fetchCourses() ;

    },[])

    return(
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-white text-xl font-bold">My Courses</h1>
                <IconBtn
                    text="Add Courses"
                    onclick={()=>{navigate("/dashboard/add-course")}}
                />
            </div>

        {
            courses && <CoursesTable courses={courses} setCourses={setCourses} />
        }

        </div>
    )
}

export default MyCourses ;