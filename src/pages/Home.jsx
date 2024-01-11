import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";


const Home = () =>{

    return(
        <div>
            homepage
            {/* section 1 */}
            <div className="max-w-maxContent relative mx-auto flex flex-col w-11/12 item-center text-white justify-between ">
                
                <Link to={"/signup"}>

                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 ">
                            <p>Become and Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                    
                </Link>
            
                <div className="text-center text-4xl font-semibold mt-7">
                    Empower Your Future with 
                    <HighlightText text={" Coding Skills"} />
                </div>

                <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 ">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8 mx-auto">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"} >
                        Book a Demo
                    </CTAButton>
                </div>

                <div className=" shadow-blue-200 mx-7 my-12  ">
                    <video className="box-shadow-class" muted loop autoPlay>
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* code section 1 */}
                <div>
                    <CodeBlocks 
                    position={"lg:flex-row"} 
                    heading={<div className="text-4xl font-bold">Unlock your <HighlightText text="coding potential" /> with our online courses.</div>}  
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btnText : "Try it yourself" ,
                            linkto : "/signup",
                            active : true ,
                        }
                    }
                    ctabtn2={
                        {
                            btnText : "Learn more" ,
                            linkto : "/login",
                            active : false ,
                        }
                    }
                    codeColor={"text-yellow-25"}
                    codeblock={
                        `<!DOCTYPE html>
                        <html>
                        <head><title>Example</title><linkrel="stylesheet"href="styles.css">
                        </head>
                        <body>
                        <h1><ahref="/">Header</a>
                        </h1>
                        <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                        </nav>`
                    }  
                    backgroundGradient={<div className="codeblock1 absolute"></div>} 
                    />
                </div>

                {/* codesection2  */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                        <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                            Start 
                            <HighlightText text={" coding in seconds"} />
                        </div>
                        }
                        subHeading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                        btnText: "Continue Lesson",
                        link: "/signup",
                        active: true,
                        }}
                        ctabtn2={{
                        btnText: "Learn More",
                        link: "/signup",
                        active: false,
                        }}
                        codeColor={"text-white"}
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                    </div>


            </div>

            {/* section 2 */}
            {/* section 3 */}
            {/* footer */}
        </div>

    )
}

export default Home ;