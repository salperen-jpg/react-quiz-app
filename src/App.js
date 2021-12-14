import './App.css';
import Form from './Components/Form';
import Loading from './Components/Loading';
import Modal from './Components/Modal';
import { useGlobalContext } from './context';

function App() {
  const {
    isWaiting,
    isLoading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (isWaiting) {
    return <Form />;
  }

  if (isLoading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers];
  let randomIndex = Math.floor(Math.random() * 4);
  console.log(randomIndex);
  if (randomIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[randomIndex]);
    answers[randomIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <article className='quiz'>
        <p className='answer-info'>
          Your Score : {correct}/{index}
        </p>
        <div className='question-part'>
          <div className='question'>
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
          </div>
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='multiple-btn'
                  onClick={() => checkAnswer(answer === correct_answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </div>
        <div className='next-question'>
          <button className=' btn next-btn' onClick={nextQuestion}>
            next question
          </button>
        </div>
      </article>
    </main>
  );
}

export default App;
