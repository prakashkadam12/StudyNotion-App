import React from "react";

const StatsComponent = () => {

    const Stats = [
        {count : "5K", label : "Active Students"},
        {count : "10+", label : "Mentors"},
        {count : "100+", label : "Courses"},
        {count : "50+", label : "Awards"},
    ]

    return(
        <section>
            <div>
                <div className="flex">
                    {
                        Stats.map((data, index) =>{
                            return(
                                <div key={index}>
                                    <p>{data.count}</p>
                                    <p>{data.label}</p>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent ;