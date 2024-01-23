import React from "react";
import Navi from "../Form/Navi";

const Instructions = () => {
  return (
    <div>
    <Navi/>
    <div className="flex flex-col items-center justify-center border border-black rounded-md w-max p-6 mt-[100px] ml-[360px] bg-white">
      <h2 className="text-2xl font-bold mb-4">Instructions</h2>
      <ul className="list-disc text-left">
        <li>After logging in, choose the option to create a quiz form.</li>
        <li>Select the blank image for the quiz.</li>
        <li>Enter the title of the quiz.</li>
        <li>Add questions along with options.</li>
        <li>For each question, specify the correct option.</li>
        <li>Continue adding several questions to your quiz.</li>
        <li>Once done, submit the quiz form.</li>
        <li>The URL for the quiz will be generated and copied automatically.</li>
        <li>Share the copied link with others to invite them to attend the quiz.</li>
        <li>To attend a quiz, paste the quiz link in the search bar located at the top right corner of the home page.</li>
        <li>Fill in your name and submit.</li>
        <li>Move to the next slide to see your marks displayed.</li>
      </ul>
    </div>
    </div>
  );
};

export default Instructions;
