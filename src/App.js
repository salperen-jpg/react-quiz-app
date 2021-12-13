import './App.css';
import Form from './Components/Form';
import Loading from './Components/Loading';
import { useGlobalContext } from './context';

function App() {
  const { isWaiting, isLoading, isError, questions, index } =
    useGlobalContext();

  if (isWaiting) {
    return <Form />;
  }

  if (isLoading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer];
  return <main></main>;
}

export default App;
