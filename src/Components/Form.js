import React from 'react';
import { useGlobalContext } from '../context';
import './Form.css';

const Form = () => {
  const { quiz, handleChange, handleSubmit, isError } = useGlobalContext();
  return (
    <main>
      <div className='quiz-form'>
        <form className='setup-quiz'>
          <h1>General Knowledge Quiz</h1>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='text'
              name='amount'
              id='amount'
              className='form-input'
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='category'>Category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={quiz.cateogry}
              onChange={handleChange}
            >
              <option value='sport'>sport</option>
              <option value='politics'>politics</option>
              <option value='history'>history</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {isError && <p className='error'>Please try different values.</p>}
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            Start
          </button>
        </form>
      </div>
    </main>
  );
};

export default Form;
