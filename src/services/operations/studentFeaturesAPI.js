// 1) load script
// 2) create option obj
// 3) options object k andar agar payment success hoti hai toh jis function ko call karna hai wo batana padega

import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

import rzpLogo from "../../assets/Logo/3D_Animation_Style_Leandro_with_black_color_hoodie_not_carto_1-removebg.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints ;


//===================================
//1) create script
function loadScript(src) {
    // Return a Promise so that we can handle loading success or failure asynchronously
    return new Promise((resolve) => {
        // Create a new <script> element
        const script = document.createElement("script");
        // Set the src attribute of the <script> element to the provided URL
        script.src = src;

        // Function to execute when the script is successfully loaded
        script.onload = () => {
            // Resolve the Promise with true to indicate successful loading
            resolve(true);
        };

        // Function to execute if the script fails to load
        script.onerror = () => {
            // Resolve the Promise with false to indicate failure
            resolve(false);
        };

        // Append the <script> element to the <body> of the HTML document
        document.body.appendChild(script);
    });
}


// 2) buycourse function 
export async function buyCourse(token, courses, userDetails, navigate, dispatch) {

    console.log("buyCourse > courses", courses)

    const toastId = toast.loading("Loading....");
    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toastId.error("Razorpay SDK failed to load");
            return;
        }


        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                            {courses},
                            {
                                Authorization: `Bearer ${token}` ,
                            }  
                            );

        console.log("orderResponse=>", orderResponse);

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        console.log("process.env.REACT_APP_RAZORPAY_KEY", process.env.REACT_APP_RAZORPAY_KEY);


        const options = {
            key : "rzp_test_thfWhdIHqzqIGv" ,
            currency : orderResponse.data.message.currency,
            amount : `${orderResponse.data.message.amount}`,
            order_id : orderResponse.data.message.id ,
            name:"StudyNotion",
            description: "Thank you for purchasing course",
            image : rzpLogo,
            prefill: {
                name : `${userDetails.firstName}`,
                email : `${userDetails.email}`
            },
            handler : function(response){
                //send successfully then execute this
                sendPaymentSuccessMail(response, orderResponse.data.message.amount, token);

                // verify payment
                verifyPayment( {...response, courses}, token, navigate, dispatch );

            }
            
        }

        console.log("OPTIONS created=>", options);

        // NOW OPEN THE RAZORPAY SDK
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment failed", function(response){
            toast.error("oopsss- payment failed");
            console.log(response.error);
        })

        
    }
    catch(error){
        console.log("error->", error);
        toast.error("could not make payment")

    }
    toast.dismiss(toastId);
}

// =========================================
// 3) 

async function sendPaymentSuccessMail(response, amount, token) {

    try{

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId : response.razorpay_order_id,
            payment : response.razorpay_payment_id,
            amount
        },
        {
            authorization : `Bearer ${token}`
        })



    }
    catch(error){
        console.log("error=>", error ); 
    }

}


// ===========================================

async function verifyPayment (bodyData, token, navigate, dispatch){

    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_PAYMENT_API, bodyData, {
            authorization : `Bearer ${token}`,
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("payment successfull");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    }
    catch(error){
        console.log("error=>", error);
        toast.error("payment failed");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
