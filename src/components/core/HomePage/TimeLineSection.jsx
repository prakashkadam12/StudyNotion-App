import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png" ;

const timeLine = [
    {
        Logo : Logo1,
        heading : "Leadership",
        description : "Fully commited to the success company"
    },
    {
        Logo : Logo2,
        heading : "Responsibility",
        description : "Students will always be our top priority"
    },
    {
        Logo : Logo3,
        heading : "Flexibility",
        description : "The ability to switch is an important skills"
    },
    {
        Logo : Logo4,
        heading : "Solve the Problem",
        description : "Code your way to a solution"
    },
]

const TimeLineSection = () =>{
    return(
        <div>
            <div className="flex flex-row gap-15 items-center">

                <div className="w-[45%] flex flex-col gap-5">
                    {
                        timeLine.map((element, index)=>{
                            return(
                                <div className="flex flex-row gap-5 " key={index}>
                                    
                                    <div className="h-[50px] w-[50px] bg-white flex justify-center items-center">
                                        <img src={element.Logo} alt="" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold  text-[18px] ">{element.heading}</h2>
                                        <p className="text-base">{element.description}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                <div className="relative shadow-blue-200">
                    <img src={timeLineImage} alt="" />
                </div>

            </div>

        </div>
    )
}

export default TimeLineSection ;