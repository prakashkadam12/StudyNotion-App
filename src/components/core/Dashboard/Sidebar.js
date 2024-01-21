import React from "react";

import {sidebarLinks, sidebarlinks} from "../../../data/dashboard-links";
import {logout} from "../../../services/authAPI" ;
import { useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {

    const {user, loading, profileLoading} = useSelector((state)=> state.profile) ;
    const {loading: authLoading} = useSelector((state)=> state.auth) ;

    if(profileLoading || authLoading){

        return(
            <div>
                <span className="loader"></span>
            </div>
        )
    }

    return(
        <div>
            
            <div className="flex min-w-[222px] flex-col border-r-[1px]  border-richblack-700 h-[calc(100vh - 3.5rem)] bg-richblue-800 py-10" >

                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link, index)=>{
                            if(link.type && user?.accountType !== link.type) return null;
                            return(
                                <SidebarLinks key={link.id} iconName={link.icon} link={link} />
                            )
                        })
                    }
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 " >
                    <div className="flex flex-col">
                        <SidebarLinks link={{name:"Setting", path:"dashboard/setting"}}  iconName="VscSettingsGear"/>
                    </div>
                </div>

            </div>  

        </div>
    )
}

export default Sidebar ;
