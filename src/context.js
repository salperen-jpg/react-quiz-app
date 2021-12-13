import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const api =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

export const AppProvider = ({ children }) => {
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
      }
    }
  };

  useEffect(() => {
    fetchQuestions(api);
  }, []);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
