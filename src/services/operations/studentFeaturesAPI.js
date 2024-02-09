// 1) load script
// 2) create option obj
// 3) options object k andar agar payment success hoti hai toh jis function ko call karna hai wo batana padega

import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

import rzpLogo from "../../assets/Logo/3D_Animation_Style_Leandro_with_black_color_hoodie_not_carto_1-removebg.png";

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

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        const options = {
            key : process.env.RAZORPAY_KEY ,
            currency : orderResponse.data.data.currency,
            amount : `${orderResponse.data.data.amount}`,
            order_id : orderResponse.data.data.id ,
            name:"StudyNotion",
            description: "Thank you for purchasing course",
            image : rzpLogo,
            prefill: {
                name : `${userDetails.firstName}`,
                email : `${userDetails.email}`
            },
            handler : function(response){
                //send successfully then execute this
                SEND_PAYMENT_SUCCESS_EMAIL_API(response, orderResponse.data.data.amount, token);

                // verify payment
                verifyPayment( {...response, courses}, token, navigate, dispatch );

                
            }
        }

        
    }
    catch(error){
        console.log("error->", error);
        toast.error("could not make payment")

    }
    toast.dismiss(toastId);
}
