import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png"; 
import { Link, matchPath, useLocation } from "react-router-dom";
import {NavbarLinks} from "../../data/navbar-links" ;
import { useSelector } from "react-redux";
import { ImCart } from "react-icons/im";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

import { IoMdArrowDropdownCircle } from "react-icons/io";


const Navbar = () =>{

    const {token} = useSelector((state) => state.auth) ;
    const {user} = useSelector((state) => state.profile) ;
    const {totalItem} = useSelector((state) => state.cart) ; 


    const location = useLocation();
    function matchRoute(route){
        console.log("path=>",route);
        console.log("location=>", location);
        return(
            // this matchPath is the predefined funtion of react router lib
            matchPath({path:route}, location.pathname) 
        )
    }

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() =>{
        try{

            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("printing res=>", result) ;
            setSubLinks(result.data.data);

        }
        catch(error){
            console.log("error- cannot fetch categoires list =>", error) ;
        }
    }

    useEffect( ()=>{
        fetchSubLinks() ;
    }, [])

    return(
        <div className="flex h-14 items-center justify-center border-b-richblack-700 border-b-[1px]" >
            
            <div className="flex  w-11/12 max-w-maxContent items-center justify-between ">

                {/* logo */}
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>

                {/* nav links */}
                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map((link, index)=>{
                                return(
                                    <li key={index} >
                                        {
                                            link.title === "Catalog" ? 
                                            (
                                                <div className="group relative flex items-center justify-center gap-2">
                                                    <p>{link?.title}</p>
                                                    <IoMdArrowDropdownCircle />

                                                    <div className="invisible z-[100] absolute translate-x-[-50%] translate-y-[50%] left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richbalck-5 lg:w-[300px]  transition-all duration-200 group-hover:visible  ">
                                                        <div className="absoulte left-[50%] top-0 translate-x-[100px] translate-y-[-90%] h-6 w-6 rotate-45 rounded bg-richblack-5"> 
                                                        </div>

                                                        {
                                                            subLinks.length ? (
                                                                subLinks.map((subLink, index)=>{
                                                                    return(
                                                                        <Link className="text-black p-2" to={`${subLink.link}`} key={index} >
                                                                            <p>{subLink?.title}</p>
                                                                        </Link>
                                                                    )
                                                                })
                                                            ) : (
                                                                <p className="text-black p-2 border-richblack-900 rounded-md border-[1px] ">Nothing found</p>
                                                            )
                                                        }

                                                    </div>

                                                </div>
                                            )  : 
                                            (
                                                <Link to={link?.path}>
                                                    <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25" }`} >{link.title}</p>
                                                </Link>
                                            ) 
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* login signup dashboard */}
                <div className="flex gap-x-4 items-center">

                    {/* cart */}
                    {
                       ( user && user?.accountType != "Instructor" ) && (
                            <Link to="/dashboard/cart" className="relative text-white">
                                <ImCart />
                                {
                                    totalItem && (
                                        <span>{totalItem}</span>
                                    )
                                }
                            </Link>
                       )
                    }

                    {/* login btn */}
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md">Login</button>
                            </Link>
                        )
                    }

                    {/* signup btn */}
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md">Signup</button>
                            </Link>
                        )
                    }

                    {/* user profile icon */}
                    {
                        token !== null && (
                            <ProfileDropDown />
                        )
                    }


                </div>

                
            </div>
        </div>
    )
}


export default Navbar ;