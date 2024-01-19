import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText" ;
import BannerImage1 from "../assets/Images/aboutus1.webp" ;
import BannerImage2 from "../assets/Images/aboutus2.webp" ;
import BannerImage3 from "../assets/Images/aboutus3.webp" ;
import Quote from "../components/core/AboutPage/Quote";

const About = () => {

    return(
        <div className="mt-[100px] text-white">

            {/* ssection 1 */}
            <section>
                <div>
                    <header>
                        Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} />

                    <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </header>

                    <div className="flex mx-auto">
                        <img src={BannerImage1} alt="" />
                        <img src={BannerImage2} alt="" />
                        <img src={BannerImage3} alt="" />
                    </div>



                </div>
            </section>

            {/* section 2 */}
            <section>
                <div>
                    <Quote />
                </div>
            </section>


        </div>
    )
}

export default About ;
