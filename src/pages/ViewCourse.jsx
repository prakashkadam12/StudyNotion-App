import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const ViewCourse = () =>{

    const [reviewModal, setReviewModal] = useState(false) ;


    return(
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {/* <VideoDetailsSidebar setReviewModal={setReviewModal} /> */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {/* {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />} */}
    </>
    )
}

export default ViewCourse ;
