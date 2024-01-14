import React from "react";
import HighlightText from "./HighlightText";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png" ;
import CTAbtn from "../HomePage/Button";

const LearningLanguageSection = () =>{
    return(
        <div className="w-11/12 flex flex-col gap-5 mt-[50px] md:mt-[150px] mb-5">

            <div className="text-4xl font-semibold text-center">
                Your swiss knife for 
                <HighlightText text={" learning any language"} />
            </div>

            <div className="text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%] ">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className="flex flex-col md:flex-row  items-center justify-center mt-5 ">
                <img src={knowYourProgress} alt="" className=" md:-mr-32" />
                <img src={compareWithOthers} alt="" className="-mt-14 md:mt-0" />
                <img src={planYourLesson} alt="" className="-mt-14 md:mt-0 md:-ml-36" />
            </div>

            <div className="w-fit mx-auto">
                <CTAbtn active={true} linkto={"/signup"} >
                    <div>
                        Learn More
                    </div>
                </CTAbtn>
            </div>

        </div>
    )
}

export default LearningLanguageSection ;