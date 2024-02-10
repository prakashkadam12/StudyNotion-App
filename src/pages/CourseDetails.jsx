
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";



const CourseDetails = () =>{

    // 1) load script
    // 2) create option obj
    // 3) options object k andar agar payment success hoti hai toh jis function ko call karna hai wo batana padega

    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams(); 

    const handleBuyCourse =() =>{
        console.log(courseId);
        
        if(token){
            buyCourse(token,[courseId], user, navigate, dispatch);
        }
        else{
            console.log("token is not there", token);
        }
    }
    //console.log("token=>",token);

    return(
        <div className="text-white">
            course details page

            <button className="bg-yellow-50 p-6 mt-10" onClick={()=> handleBuyCourse()}>
                Buy Course
            </button>

        </div>
    )
}

export default CourseDetails ;
