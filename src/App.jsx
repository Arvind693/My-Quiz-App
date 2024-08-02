
import { useState } from 'react';
import Homepage from './components/Homepage/Homepage'
import Quiz from './components/Quiz/Quiz'
function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  }
  const endQuiz=()=>{
    setQuizStarted(false);
  }
  return (
    <>
       {quizStarted?<Quiz backHome={endQuiz}/>:<Homepage onStart={startQuiz}/>}
    </>
  )
}

export default App
