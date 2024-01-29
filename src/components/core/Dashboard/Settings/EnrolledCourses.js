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
                                                <p></p>
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