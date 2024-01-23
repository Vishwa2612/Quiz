import  React from "react";
import { auth, db } from '../../firebase';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Timestamp, addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const DisplayQuestions = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [scoreTextColors, setScoreTextColors] = useState(['red-400', 'violet-400', 'yellow-400', 'blue-400']); 
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {

      const searchParams = new URLSearchParams(location.search);
      const link = searchParams.get('link') || params.link;
      const decodedLink = decodeURIComponent(link);
      if (link) {
        const formsCollectionRef = collection(db, 'addforms');
        const formQuery= query(formsCollectionRef, where('link', '==', decodedLink));

        try {
          const querySnapshot = await getDocs(formQuery);

          if (!querySnapshot.empty) {
            const formDoc = querySnapshot.docs[0];
            if(formDoc)
            {
            const formData = formDoc.data();
            if (formData.questions && formData.questions.length > 0) {
              setQuestions(formData.questions);
              setSelectedAnswers(Array(formData.questions.length).fill(null));
            } else {
              console.error('Form has no questions');
            }
          } else {
            console.error('Form not found');
          }
        }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('Link parameter missing');
      }
    };
    fetchQuestions();

    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % scoreTextColors.length);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [location.search, scoreTextColors.length]);
  

  const handleOptionChange = (questionIndex, optionIndex) => {
    if(!submitClicked) {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmitClicked(true);

    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    
    if (selectedAnswers.includes(null)) {
      alert('Please answer all questions.');
      return;
    }

    const newScore = selectedAnswers.reduce((acc, answer, index) => {
      const correctOptionIndex = parseInt(questions[index].correctOption, 10);
      return answer === correctOptionIndex ? acc + 1 : acc;
    }, 0);
    
    setScore(newScore);

    try {
      const currentUser = auth.currentUser;
      const link = new URLSearchParams(location.search).get('link');
      const formRef = collection(db, 'users', currentUser.uid, 'forms');
      const formQuery = query(formRef, where('link', '==', link));
      const formDocSnapshots = await getDocs(formQuery);

      if (!formDocSnapshots.empty) {
        console.error('Form not found');
        return;
      }

      const formDoc = formDocSnapshots.docs[0];
      if(formDoc.data().creatorUid!==currentUser.uid)
      {
      const formDocRef = doc(formRef, formDoc.id);
      const attendRef = collection(formDocRef, 'attend');
      await addDoc(attendRef, {
        name,
        answers: selectedAnswers,
        score: newScore,
        timestamp: Timestamp.now(),
      });
    }

      console.log('Form submitted successfully:', formDoc.id);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center mt-[72px] w-[100%] h-[100%]">
      <h2 className="text-4xl font-bold mb-4 mt-[25px]">Quiz Questions</h2>
      <Carousel className="p-5 m-0 w-[75%]" currentIndex={carouselIndex}>
        <CarouselContent>
          {questions.map((question, questionIndex) => (
            <CarouselItem key={questionIndex}>
              <div className="p-1">
                <Card className="flex flex-col items-center w-[95%] h-[500px] border-none">
                  <CardContent className="flex flex-col aspect-square p-20 w-[100%] h-[100%]">
                    <p className="text-3xl font-bold mb-2 text-amber-500">
                      {questionIndex + 1}. {question.text}
                    </p>
                    <ul className="flex flex-col ml-6 text-2xl">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`cursor-pointer mt-5 ${
                            submitClicked
                              ? optionIndex === parseInt(question.correctOption, 10)
                                ? 'text-green-500'
                                : selectedAnswers[questionIndex] === optionIndex
                                ? 'text-red-500'
                                : 'text-black'
                              : 'text-black'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question_${questionIndex}`}
                            checked={selectedAnswers[questionIndex] === optionIndex}
                            onChange={() => handleOptionChange(questionIndex, optionIndex)}
                            disabled={submitClicked}
                          />
                          {option}
                        </label>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="flex flex-col items-center justify-center">
            <div className="p-1">
              <Card className="border-none">
                <CardContent className="aspect-square p-20 w-[470px]">
                  <h2 className="text-2xl font-bold my-4 text-amber-500">Enter Your Name</h2>
                  <form onSubmit={handleSubmit}>
                    <label>
                      <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                        disabled={submitClicked}
                        placeholder="Name"
                        className="px-3 py-2 border border-gray-500 rounded mb-2 bg-white"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={submitClicked}
                      className="border border-black px-3 py-2 ml-8 bg-violet-400 rounded h-10"
                    >
                      Submit Answers
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          {submitClicked && (
            <CarouselItem className="flex flex-col items-center justify-center">
              <div className={`text-4xl font-bold mb-4 ${
              scoreTextColors[currentColorIndex] === 'red-400' ? 'text-red-400' 
              : scoreTextColors[currentColorIndex] === 'violet-400' ? 'text-violet-400' 
              : scoreTextColors[currentColorIndex] === 'yellow-400' ? 'text-yellow-400' 
              : 'text-blue-400'}`}
              >
                Your Score: {score} / {questions.length}
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="text-white" />
        <CarouselNext className="text-white" />
      </Carousel>
    </div>
  );
};

export default DisplayQuestions;