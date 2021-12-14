import React, { useContext, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

export const AppProvider = ({ children }) => {
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sport',
    diffuculty: 'easy',
  });
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setIsWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setIsLoading(false);
        setIsWaiting(false);
        setIsError(false);
      } else {
        setIsWaiting(true);
        setIsError(true);
        console.log('aaa');
      }
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (condition) => {
    if (condition) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;

    fetchQuestions(url);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  return (
    <AppContext.Provider
      value={{
        isWaiting,
        isLoading,
        isError,
        questions,
        index,
        correct,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
