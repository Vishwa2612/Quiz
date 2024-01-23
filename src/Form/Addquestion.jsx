import { useState } from 'react';
import Questions from './Questions';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

const Addquestion = () => {
  const history = useHistory();
  const [forms, setForms] = useState([]);
  const [options, setOptions] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [correctOption,setCorrectOption]=useState('');
  const [displayedQuestions, setDisplayedQuestions] = useState(true);

  const addQuestion = () => {
    if (!newQuestion.trim() || options.every((opt) => !opt.trim()) || isNaN(correctOption) || correctOption<1 || correctOption>options.length) {
      alert("Invalid input. Please make sure the question and options are filled, and the correct option is a valid number within the range.");
      return;
    }
    const newQuestionObject = {
      text: newQuestion,
      options: [...options],
      correctOption: correctOption-1,
    };
    setQuestions([...questions, newQuestionObject]);
    setNewQuestion('');
    setOptions(['']);
    setCorrectOption('');
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateQuestionText = (index, newText) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], text: newText };
      return updatedQuestions;
    });
  };

  const updateOption = (questionIndex, optionIndex, newOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = newOption;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const submitForm = async() => {
    if (questions.length === 0) {
      alert("Please add atleast one question before submitting.");
      return;
    }
    const currentUser=auth.currentUser;
    
    const randomLink = Math.random().toString(36).substring(2, 15);
    const newForm = {
      link: randomLink,
      title: quizTitle,
      questions:[...questions],
    };

    try {
      console.log("Ll");
      setLoading(true);
      const formsCollection = collection(db,'users',currentUser.uid,"forms");
      await addDoc(formsCollection, newForm);
      const globalFormsCollection = collection(db, 'addforms');
      await addDoc(globalFormsCollection, newForm);
      const formURL = `${window.location.origin}/display-questions?link=${randomLink}`;
      await navigator.clipboard.writeText(formURL);
      alert("Form URL copied to clipboard!");
      setForms([...forms, newForm]);
      setDisplayedQuestions(false);
      history.push(`/display-questions?link=${randomLink}`);
    } catch (error) {
      console.error('Error adding document: ', error); 
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className='mt-[70px]'>
      <div className="max-w-2xl mx-auto p-4 border border-gray-300 rounded bg-teal-600 mt-16">
        <div className="mb-4 mt-2">
        <label className="block text-gray-800 text-sm font-bold mb-2">
          Quiz Title:
        </label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-700 rounded mb-2 bg-white"
          placeholder="Quiz Title"
        />
          <label className="block text-gray-800 text-sm font-bold mb-2">
            Add Question:
          </label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded mb-2 bg-white"
            placeholder="Question"
          />
          <label className='block text-gray-800 text-sm font-bold mb-2'>
            Option:
          </label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="w-full px-3 py-2 border border-gray-700 rounded mr-2 bg-white"
                placeholder={`Option ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => addOption()}
                className="bg-green-500 text-white px-2 py-1 rounded ml-2 border border-gray-600"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => removeOption(index)}
                disabled={options.length===1}
                className={`${ options.length === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'
                } text-white px-2 py-1 rounded ml-2 border border-gray-600`}
              >
                -
              </button>
            </div>
          ))}
          <label className="block text-gray-800 text-sm font-bold mb-2">
            Correct Option:
          </label>
          <input
            type="text"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded mb-2 bg-white"
            placeholder="Correct Option"
          />
          <button
            onClick={addQuestion}
            className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded border border-black"
          >
            Add Question
          </button>
        </div>

        { displayedQuestions && (
        <div className="mt-4">
          {questions.map((question, questionIndex) => (
            <Questions
              key={questionIndex}
              question={question}
              onUpdateQuestion={(newText) => updateQuestionText(questionIndex,newText)}
              onUpdateOption={(optionIndex, newOption) =>
                updateOption(questionIndex, optionIndex, newOption)
              }
              onDeleteQuestion={deleteQuestion}
              submitted={!displayedQuestions}
            />
          ))}
        </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2">Forms:</h2>
          <button onClick={submitForm}
          disabled={loading}
           className={`${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'
            } text-white px-4 py-2 border border-black rounded`}
           >
             {loading ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addquestion;
