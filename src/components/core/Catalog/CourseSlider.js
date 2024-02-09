import React from "react";
import Swiper from "swiper";

import CourseCard from "./CourseCard";
import {  SwiperSlide } from 'swiper/react';

const CourseSlider = ({Courses}) =>{

    return(
        <div>

            {/* going to use SWIPER JS for slider so it is easy */}

            {
                Courses?.length ? (
                    
                    <div className="mySwiper">
                        <Swiper>
                            {
                                Courses?.map((course, index)=>{
                                    return(
                                        <SwiperSlide key={index}>
                                            <CourseCard course={course} Height={"h-[250px]"} /> 
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                ) : (
                    <div>
                        No course found
                    </div>
                )
            }

        </div>
    )
}

export default CourseSlider ;