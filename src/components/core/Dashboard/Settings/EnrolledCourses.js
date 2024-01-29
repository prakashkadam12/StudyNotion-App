import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EnrolledCourses = () =>{

    const {token} = useSelector((state)=> state.auth);
    const [enrolledCourses, setEnrolledCourse] = useState(null);

    const getEnrolledCourses = async () =>{
        try{

            const response = await getUserEnrolledCourses(token);
            console.log("💚 getEnrolledCourses ==>", response);
            setEnrolledCourse(response);

        }
        catch(error){
            console.log("unable to getEnrolledCourses");
        }
    }

    useEffect(()=>{
        getEnrolledCourses();
    }, [])

    return(
        <div>

            <div>
                Enrolled Courses
            </div>
            {
                !enrolledCourses ? (

                    <div>
                        Loading
                    </div>

                ) : (
                    
                    !enrolledCourses.length ? (
                        <p>You have not enrolled in any course</p>
                    ) : (
                        <div>
                            {/* title bar */}
                            <div>
                                <p>Course Name</p>
                                <p>Durations</p>
                                <p>Progress</p>
                            </div>
                            
                            {/* cards for enrolled courses */}
                            {
                                enrolledCourses.map((course, index)=>{
                                    return(
                                        <div key={index}>

                                            <div>
                                                <img src={course?.thumbnail} />
                                                <div>
                                                    <p>{course?.courseName}</p>
                                                    <p>{course?.description}</p>
                                                </div>
                                            </div>

                                            <div>
                                                {course?.totalDuration}
                                            </div>

                                            <div>
                                                <p>Progress: {course.progrssPercentage || 0}%</p>
                                                <ProgressBar 
                                                completed={course.progrssPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                                />
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                )
            }
        </div>
    )

}

export default EnrolledCourses ;