import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {categories} from "../services/apis" ;
import {apiConnector} from "../services/apiconnector";

const Catalog = () =>{

    const {catalogName} = useParams() ;
    const [catalogPageData, setCatalogPageData] = useState(null) ;
    const [categoryId, setCatagoryId] = useState("");


    useEffect(()=>{
        const getCatagoryDetails = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
        }
    },[catalogName]);

    return(
        <>
            {/* staring of catalog page */}
            <div>

                <p>

                </p>

                <p>

                </p>

                <p>

                </p>

            </div>

            {/* section 1 - Courses to get you started */}
            <div className="text-white mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                
                <div className="section_heading ">Courses to get you started</div>

                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    
                    {/* selection slider */}
                    <p>
                        Most Popular
                    </p>

                    <p>
                        New
                    </p>

                </div>
                
                {/* course Slider */}
                <div>
                    <p>Top Courses</p>
                    <div>
                        
                    </div>
                </div>
                
                {/* section 3 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <p className="section_heading">Frequently Bought Together</p>
                </div>

            </div>
        
        </>
    )
}

export default Catalog ;
