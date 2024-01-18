import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/authAPI";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const UpdatePassword = () =>{

    const {loading} = useDispatch((state) => state.auth) ;
    const dispatch = useDispatch() ;

    const [showPassword, setShowPassword] = useState(false) ;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) ;
    const [formData, setFormData] = useState(
        {
            password : "",
            confirmPassword : "" ,
        }
    )

    console.log("formdata= >", formData);

    function handleOnChange(e) {
        e.preventDefault() ;

        setFormData((prevData) => ( 
        {
            ...prevData ,
            [e.target.name] : e.target.value ,
        }
        ))

    }

    const {password, confirmPassword} = formData ;
    // getting token from URL
    const location = useLocation() ;
    const {token} = location.pathname.split("/").at(-1) ;

    function handleOnSubmit(e) {
        e.preventDefault() ;

        dispatch(resetPassword(password, confirmPassword, token));

    }

    return(
        <div>
            {
                loading ? (
                    <span className="loader"></span>
                ) : (
                    <div className="w-[50%] mx-auto text-white">
                        <h1>Choose  new password</h1>
                        <p>Almost done. Enter your new password and youre all set.</p>

                        <form  onSubmit={handleOnSubmit}>

                            <label className="relative ">
                                <p className="text-sm capitalize">New Password <span className="text-pink-200">*</span></p>
                                <input className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type={showPassword ? "text" : "password"} value={password} name="password" onChange={handleOnChange} />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>

                            <label className="relative">
                                <p className="text-sm capitalize">Confirm New Password <span className="text-pink-200">*</span></p>
                                <input className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type={showConfirmPassword ? "text" : "password"} value={confirmPassword} name="confirmPassword" onChange={handleOnChange} />
                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-[72px] z-[10] cursor-pointer"
                                    >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>


                        
                        </form>

                    </div>
                )
            }

        </div>
    )
}

export default UpdatePassword;