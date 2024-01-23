import "../input.css";
import React from "react";
import template0 from "../images/template0.jpg";
import { useHistory } from "react-router-dom";

const Template = () =>{
  const history = useHistory();
  const createFrom = ()=>{
    history.push("/form/");
  }
  return(
    <div className="pl-[60px]">
      <div className="flex flex-wrap items-center justify-betweenp-4 pl-5">
        <div className="bg-[#43C6DB] text-white p-4 mb-4">
          <span className="text-lg">Start a New Form</span>
        </div> 
      </div>
      <div className="flex flex-wrap items-center space-x-10">
        <div>
          <img src={template0} onClick={createFrom} className="w-52 h-52 hover:border border-black cursor-pointer"/>
          <span className="text-blue-300">Blank</span>
        </div>
      </div>
    </div>
    )
};

export default Template;