import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CoursesTable = ({courses, setCourses}) => {

    const dispatch = useDispatch() ;
    const {token} = useSelector((state) => state.auth) ;
    const [loading, setLoading] = useState(false) ;
    const [confirmationModal, setConfirmationModal] = useState(null) ;

    return(
        <div>
            <table>
                
            </table>

        </div>
    )
}

export default CoursesTable ;