import { useDispatch, useSelector } from "react-redux"
import {useState} from "react"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI.js"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [confirmationModal, setConfirmationModal] = useState(null);

  const courseId = cart.map((course) => course._id);
  console.log("courseIDDDD=>", courseId);

  const handleBuyCourse = () => {

    const courseId = cart.map((course) => course._id);
    console.log("courseIDDDD=>", courseId);
        
        if(token){
            buyCourse(token,courseId, user, navigate, dispatch);
        }
        else{
            console.log("token is not there", token);
            // showing modal that saying u are not loggedin
            setConfirmationModal({
                text1 : "you are not loggedin",
                text2 : "pleasr login to purchase the course", 
                btn1Text : "Login" ,
                btn2Text : "Cancel" ,
                btn1Handler : () => navigate("/login"),  
                btn2Handler : () => setConfirmationModal(null) ,
            })
        }
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}