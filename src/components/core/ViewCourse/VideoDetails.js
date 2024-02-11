import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const VideoDetails = () => {

    const {courseId, sectionId, subSectionId} = useParams() ;
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const location = useLocation();
    const playerRef = useRef();
    const { token} = useSelector((state)=> state.auth) ;
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=> state.viewCourse) ;
    
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false); 
    const [loading, setLoading] = useState(false) ;


    useEffect(()=>{
        const setVideoSpecificDetails = () => {
            if(!courseSectionData.length){
                return ;
            }
            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-course");
            }
            else{
                // lets assume k all 3 fields are present
                const filterdData = courseSectionData.filter(
                    (course) => course._id === sectionId
                )

                const filteredVideoData = filterdData?.[0]?.subSection.filter(
                    (data) => data._id === subSectionId 
                )

                setVideoData(filteredVideoData[0]);
                setVideoEnded(false);
                
            }
        }
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname])


    const isFirstVideo = () =>{
        const currentSetionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId 
        )
        
        const currentSubSectionIndex = courseSectionData[currentSetionIndex].subSectionId.findIndex(
            (data) => data._id === subSectionId 
        )


        // 0 th index wali video matalb firstVideo
        if(currentSetionIndex === 0 && currentSubSectionIndex === 0){
            return true ;
        }
        else{
            return false; 
        }

    }

    const isLastVideo = () =>{
        // n-1 index wali video matalb last video

        const currentSetionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId 
        )

        const noOfSubSections = courseSectionData[currentSetionIndex].subSection.length ;
        
        const currentSubSectionIndex = courseSectionData[currentSetionIndex].subSectionId.findIndex(
            (data) => data._id === subSectionId 
        )


        // n-1 index wali video matalb last video
        if(currentSetionIndex === courseSectionData.length -1 && currentSubSectionIndex === noOfSubSections-1){
            return true ;
        }
        else{
            return false ;
        }


    }

    const goToNextVideo = () => {

        const currentSetionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId 
        )

        const noOfSubSections = courseSectionData[currentSetionIndex].subSection.length ;
        
        const currentSubSectionIndex = courseSectionData[currentSetionIndex].subSectionId.findIndex(
            (data) => data._id === subSectionId 
        )

        if(currentSubSectionIndex !== noOfSubSections - 1){
            // same section ki next video me jao
            const nextSubSectionId = courseSectionData[currentSetionIndex].subSection[currentSetionIndex + 1]._id ;

            // is video par jao
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else{
            // different section ki first video
            const nextSectionId = courseSectionData[currentSetionIndex + 1] ;
            const nextSubSectionId = courseSectionData[currentSetionIndex+1].subSection[0]._id ;

            // iss video par jao
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);

        }
    }
    
    const goToPreviousVideo = () =>{

    }

    const handlerLectureCompletion = () =>{

    }

  return (
    <div className='text-white'>VideoDetails</div>
  )
}
