import React from 'react';
import HomeIcon from '../images/HomeIcon';
import quizIcon from "../images/quiz.png";
import { useHistory } from 'react-router-dom';

const Navi = () => {
  const history = useHistory();

  const goToHomePage = () => {
    history.push('/home'); 
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-cyan-900 p-4 flex items-center">
      <p className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={quizIcon} className="h-10" alt="Quiz App" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#DAA520]">
          Quiz App
        </span>
      </p>
      <div className="cursor-pointer pl-3">
        <HomeIcon width={40} height={40} onClick={goToHomePage}/>
      </div>
    </div>
  );
};

export default Navi;
