import React from "react";
import Navi from "./Form/Navi.jsx";
import quizBackground from "./images/quizbg.jpg";
import AddQuestions from './Form/Addquestion.jsx';

const Form = () => {
  return (
    <div className="bg-cover bg-center inset-0 fixed"  style={{ backgroundImage: `url(${quizBackground})`, overflowY: 'auto' }}>
      <Navi />
      <AddQuestions />
    </div>
  );
};

export default Form;
