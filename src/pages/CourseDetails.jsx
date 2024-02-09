
import React from "react";
import { useDispatch } from "react-redux";


const CourseDetails = () =>{

    // 1) load script
    // 2) create option obj
    // 3) options object k andar agar payment success hoti hai toh jis function ko call karna hai wo batana padega

    const {token} = useDispatch((state)=> state.auth);

    const handleBuyCourse =() =>{
        if(token){
            
        }
    }

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
