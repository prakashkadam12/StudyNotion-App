import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {categories} from "../services/apis" ;
import {apiConnector} from "../services/apiconnector";
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';

const Catalog = () =>{

    const {catalogName} = useParams() ;
    const [catalogPageData, setCatalogPageData] = useState(null) ;
    const [categoryId, setCatagoryId] = useState("");


    useEffect(()=>{
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("res==>", res) ;

            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            console.log("catid", category_id);
            setCatagoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(()=>{
        const getCatagoryDetails = async () => {
            try{

                const res = await getCatalogaPageData(categoryId) ;
                setCatalogPageData(res);

            }
            catch(error) {
                console.log("error=>", error) ;
            }
        }
        getCatagoryDetails();
    }, [categoryId])

    console.log("catalogPageData= >", catalogPageData) ;

    return(
        <>
            {/* staring of catalog page */}
            <div className="text-white">

                <p>
                    {`Home / Catalog /`}
                    <span>
                        {catalogPageData?.data?.selectedCatagory?.name}
                    </span>
                </p>

                <p>
                    {catalogPageData?.data?.selectedCatagory?.name}
                </p>

                <p>
                    {catalogPageData?.data?.selectedCatagory?.description}
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
