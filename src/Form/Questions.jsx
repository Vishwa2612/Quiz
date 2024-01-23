import React from 'react';

const Questions = ({ question, onUpdateQuestion, onUpdateOption, onDeleteQuestion }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded bg-gray-100">
      <h3 className="text-lg text-sky-800 font-bold mb-2">{question.text}</h3>
      <ul className="list-disc pl-4">
        {question.options.map((option, optionIndex) => (
          <p key={optionIndex} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                value={option}
                className="mr-2"
                disabled
              />
              {option}
            </label>
          </p>
        ))}
      </ul>
      <p className="mt-2 text-[18px]">Edit question</p>
      <div className='flex flex-row'>
      <input
        type="text"
        value={question.text}
        onChange={(e) => onUpdateQuestion(e.target.value)}
        className="text-sky-800 w-full px-3 py-2 border border-gray-500 rounded mb-2 bg-white"
        placeholder="Edit Question"
      />
      <button className='border border-black px-3 py-2 bg-red-500 rounded h-10 ml-3'
      onClick={() => onDeleteQuestion()}>
        delete
      </button>
      </div>
    </div>
  );
};

export default Questions;
