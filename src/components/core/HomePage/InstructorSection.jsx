import React from "react";
import instructorImg from "../../../assets/Images/Instructor.png";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
    return(

        <div className="mt-16  ">

            <div className="flex flex-col mx-auto justify-center md:flex-row gap-3 md:gap-20 items-center">
            
                <div className="md:w-[50%] w-full p-10 ">
                    <img src={instructorImg} alt="" className="shadow-white instructor-bg-shadow" />
                </div>

                <div className="flex md:w-[50%] w-full p-4 md:pd-0 flex-col gap-10 ">
                    <div className="text-4xl font-semibold ">
                        Become an <HighlightText text={"instructor"} />
                    </div>

                    <p className="font-medium text-[16px] w-[90%] text-richblack-300">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>

                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex flex-row items-center justify-center my-auto gap-2">
                                <div>Start Learning Today</div>
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>

                </div>

            </div>


        </div>
        
        
    )

}

export default InstructorSection ;