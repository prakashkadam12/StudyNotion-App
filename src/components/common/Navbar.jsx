import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png"; 
import { Link, matchPath, useLocation } from "react-router-dom";
import {NavbarLinks} from "../../data/navbar-links" ;



const Navbar = () =>{

    const location = useLocation();

    function matchRoute(route){
        console.log("path=>",route);
        console.log("location=>", location);
        return(
            // this matchPath is the predefined funtion of react router lib
            matchPath({path:route}, location.pathname) 
        )
    }

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
                                                <div>

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
                

                
            </div>
        </div>
    )
}


export default Navbar ;