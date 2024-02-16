import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io"
import IconBtn from "../../common/IconBtn";
import { BsChevronDown } from "react-icons/bs";

import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";


const VideoDetailsSidebar = ({setReviewModal, reviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate() ;
    const location = useLocation() ;
    const { sectionId, subSectionId} = useParams() ;
    const {courseSectionData, courseEntireData, totalNoOfLectures, completedLectures} = useSelector((state)=> state.viewCourse);

    const [clicked, setClicked] = useState(false);


    // invoked function expression (IIFE)
    //---------------------------------------------------
    // useEffect(() => {
    //     (() => {
    //         // Code for the immediately invoked function here
    //         console.log('Immediately invoked function executed');
    //     })();
    // }, []); // Empty dependency array means it runs once after the initial render
    // --------------------------------------------------
    //  ((()=>{})())

    // just new syntax
    

    useEffect(()=>{

        ;(()=>{
            if(!courseSectionData.length){
                return ;
            }
            else{
                const currentSetionIndex = courseSectionData.findIndex(
                    (data) => data._id === sectionId
                )

                const currentSubSectionIndex = courseSectionData?.[currentSetionIndex]?.subSection.findIndex(
                    (data) => data._id === subSectionId 
                )

                const activeSubSectionId = courseSectionData[currentSetionIndex]?.subSection[currentSubSectionIndex]?._id ;
                // set current section here
                setActiveStatus(courseSectionData?.[currentSetionIndex]?._id);
                // set current subsection here
                setVideoBarActive(activeSubSectionId);

            }
        })()

    }, [courseSectionData, courseEntireData, location.pathname]) ;

    //console.log("Sertreview modal =>", setReviewModal,reviewModal);
    
    
    
    return(
        <div className={`absolute  z-[2000] md:relative ${clicked ? "left-[-320px]" : "left-0"}`}>

            <div  className={`flex absolute md:relative text-white h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800`}>
                
                <p 
                onClick={() => setClicked(prev => !prev)}
                className="absolute  text-[25px] visible md:hidden top-2 right-[-20px] z-[2000] text-yellow-100" >{clicked ? <div className="animation animate-pulse duration-100"><FaArrowAltCircleRight /></div> : <IoMdCloseCircle /> }</p>

                {/* for btns and heading */}
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">

                    {/* for btns */}
                    <div className="flex w-full items-center justify-between" >
                        <div title="back" className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90" onClick={() => { navigate(`/dashboard/enrolled-courses`) }}>
                            <IoIosArrowBack size={30} />
                        </div>

                        <IconBtn
                        text="Add Review"
                        customClasses="ml-auto"
                        onclick={() => setReviewModal(true)}
                        />
                    </div>

                    {/* for heading and title */}
                    <div className="flex text-[13px] md:text-sm flex-col">
                        <p>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length} / {totalNoOfLectures} </p>
                    </div>



        


                </div>

                {/* for sections and subSections */}
                <div>
                    {
                        courseSectionData.map((course, index)=>{
                            return(
                                <div onClick={() => setActiveStatus(course?._id)} key={index}>

                                    {/* section */}
                                    <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                                        <div className="w-[70%] font-semibold">{course?.sectionName}</div>
                                        <div className="flex items-center gap-3">
                                        
                                            <span
                                                className={`${
                                                activeStatus === course?.sectionName
                                                    ? "rotate-0"
                                                    : "rotate-180"
                                                } transition-all duration-500`}
                                            >
                                                <BsChevronDown />
                                            </span>

                                        </div>
                                    </div>



                                    {/* Sub Sections */}
                                    {activeStatus === course?._id && (
                                        <div className="transition-[height] duration-500 ease-in-out">
                                            {course.subSection.map((topic, i) => (
                                                <div
                                                className={`flex gap-3  px-5 py-2 ${
                                                    videoBarActive === topic._id
                                                    ? "bg-yellow-200 font-semibold text-richblack-800"
                                                    : "hover:bg-richblack-900"
                                                } `}
                                                key={i}
                                                onClick={() => {
                                                    navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                    )
                                                    setVideoBarActive(topic._id)
                                                    console.log("subsection clicked setted");
                                                    setClicked((prev)=> !prev)
                                                }}
                                                >
                                                <input
                                                    type="checkbox"
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => {}}
                                                />
                                                {topic.title}
                                            </div>
                                        ))}
                                        </div>
                                    )}


                                </div>
                            )
                        })
                    }
                </div>


            </div>

        </div>
    )
}


export default VideoDetailsSidebar ;