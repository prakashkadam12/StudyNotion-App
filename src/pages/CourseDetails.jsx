
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import GetAvgRating from "../utils/avgRating";

import ConfirmationModal from "../components/common/ConfirmationModal";
import {fetchCourseDetails} from "../services/operations/courseDetailsAPI";
import Error from "../pages/Error";

const CourseDetails = () =>{

    // 1) load script
    // 2) create option obj
    // 3) options object k andar agar payment success hoti hai toh jis function ko call karna hai wo batana padega

    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {loading} = useSelector((state)=> state.profile);
    const {paymentLoading} = useSelector((state)=> state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams(); 

    const [confirmationModal, setConfirmationModal] = useState(null);

    const [courseData, setCourseData] = useState(null);

    useEffect(()=>{

        // getting course details
        const getCourseFullDetails = async () =>{

            try{

                const result = await fetchCourseDetails(courseId); 
                console.log("result of getFUllcoursedetails=>", result);
                setCourseData(result);

                console.log("*************",result?.data[0] );
                const {
                    _id : course_id ,
                    courseName , 
                    courseDescription ,
                    thumbnail, 
                    price,
                    whatYouWillLearn,
                    courseContent,
                    ratingAndReviews,
                    instructor, 
                    studentsEnrolled,
                    createdAt
                } = result?.data[0] ;

                

            
            }
            catch(error){
                console.log("error in fetching details of course=>", error);
    
            }
        }

        getCourseFullDetails();

    }, [courseId])

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=>{

        const count = GetAvgRating(courseData?.data?.CourseDetails?.ratingAndReviews);
        console.log("count avg rating=>", count);
        setAverageReviewCount(count);

    }, [courseData]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=>{

        // finding total lectures
        let lectures = 0 ;
        courseData?.data?.CourseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0 ;
        });

        setTotalNoOfLectures(lectures);
    }, [courseData]);

    const handleBuyCourse =() =>{
        console.log(courseId);
        
        if(token){
            buyCourse(token,[courseId], user, navigate, dispatch);
        }
        else{
            console.log("token is not there", token);
        }

        // showing modal that saying u are not loggedin
        setConfirmationModal({
            text1 : "you are not loggedin",
            text2 : "pleasr login to purchase the course", 
            btn1Text : "Login" ,
            btn2Text : "Calcel" ,
            btn1Handler : () => navigate("/login"),  
            btn2Handler : () => setConfirmationModal(null) ,
        })

    }
    //console.log("token=>",token);

    if(loading || !courseData){
        return(
            <div>
                Loading . . 
            </div>
        )
    }

    if(!courseData.success){
        return(
            <div>
                <Error />
            </div>
        )
    }



    return(
        <div className="flex items-center flex-col ">

            <p>
                {}
            </p>


        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseDetails ;
