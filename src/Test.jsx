import React from "react";
import Navi from "./Test/Navi.jsx";
import quesbg from "./images/quesbg.webp";
import DisplayQuestions from "./Test/DisplayQuestions.jsx";

const Test = () => {
    return(
        <div className="h-screen" style={{ backgroundImage: `url(${quesbg})`, backgroundSize: '100% 120%', backgroundAttachment:'fixed'}}>
            <Navi/>
            <DisplayQuestions/>
        </div>
    )
};

export default Test;