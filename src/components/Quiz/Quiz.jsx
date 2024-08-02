import React, { useEffect, useRef, useState } from 'react'
import './Quiz.css'
import { data } from "../../Assets/data"

const Quiz = ({backHome}) => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [score, setScore] = useState(0);
    let [lock, setLock] = useState(false);
    let [result, setResult] = useState(false);
    let [timeLeft, setTimeLeft] = useState(30);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    let nextRef = useRef(null);

    const checkAnswer = (e, answer) => {
        if (lock === false) {
            if (question.answer === answer) {
                e.target.classList.add("correct")
                setLock(true);
                setScore(prev => prev + 1)
                nextRef.current.classList.add("active-btn");
            }
            else {
                e.target.classList.add("wrong")
                setLock(true);
                option_array[question.answer - 1].current.classList.add("correct");
                nextRef.current.classList.add("active-btn");
            }
        }
    }

    const next = () => {
        if (lock === true || timeLeft<=0) {
            if (index === data.length - 1) {
                setResult(true)
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong")
            })
            nextRef.current.classList.remove("active-btn");
            setTimeLeft(30);
        }
    }
    useEffect(() => {
        if (timeLeft > 0) {
            const timeId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timeId);
        }
        else {
            next();
        }
    }, [timeLeft]);

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setTimeLeft(30)
    }

    return (
        <div className='container'>
            <h1>MERN Stack Questions</h1>
            <hr />
            {result ?
                <>
                    <div className='result-container'>
                        <h2>Your Score : {score}/{data.length}</h2>
                        <button className='reset-btn' onClick={reset}>Reset</button>
                        <button className='reset-btn' onClick={backHome}>Home</button>
                    </div>
                </> :
                <>
                    <h2 className='question'>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
                    </ul>
                    <button ref={nextRef} onClick={next} disabled={false}>Next</button>
                    <div className='index'>{index + 1}/{data.length}</div>
                    <div className='timer-section'>Time Left : {timeLeft} sec</div>
                    <button className='home-btn' onClick={backHome}>Home</button>

                </>
            }

        </div>
    )
}

export default Quiz
