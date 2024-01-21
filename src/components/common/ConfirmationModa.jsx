import React from "react";

const ConfiramtionModal = ({modalData}) => {

    return(
        <div>
            <div>
                <p>{modalData?.text1}</p>
                <p>{modalData?.text2}</p>
                <div></div>
            </div>
        </div>
    )
}

