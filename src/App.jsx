import React, { useState } from "react"
import QeASection from "./components/QeASection"
import WelcomePage from "./components/WelcomePage"
import MenuSection from "./components/MenuSection"
import he from "he"

export default function App() {
  const [QeA, setQeA] = useState([])
  const [answersVisibility, toggleShowAnswers] = useState(false);
  const [totalPoints, setPoints] = useState(0);
  const [quizSpecs, setQuizSpecs] = useState({});
  const [welcomePageVisibility, setWelcomePageVisibility] = useState(true)
  const [questionsVisibility, setQuestionsVisibility] = useState(false)
    
  function getRandomItem(list) {
    const randomIndex = Math.round(Math.random() * list.length);
    return list[randomIndex];
  }

  async function getQeA(chosenCategories, level) {
    const chosenCategoryId = getRandomItem(chosenCategories)
    const fetchCategory = chosenCategoryId ? `&category=${chosenCategoryId}` : ''
    const fetchDifficulty = level.length > 0 ? `&difficulty=${level}` : ''
    const fetchLink = `https://opentdb.com/api.php?amount=8${fetchCategory}${fetchDifficulty}&type=multiple`
    const res = await fetch(fetchLink)
    const data = await res.json()
    let newQeA = [];
    data.results.forEach((ques) => {
      const question = he.decode(ques.question)
      const correctAnswer = he.decode(ques.correct_answer)
      const allAnswers = [];
      const randomIndex = Math.floor(Math.random() * 4)
      ques.incorrect_answers.forEach((answer) => {
        allAnswers.push(he.decode(answer))
      });
      allAnswers.splice(randomIndex, 0, correctAnswer)
      newQeA.push({
        id: newQeA.length,
        question: question,
        correctAnswer: correctAnswer,
        allAnswers: allAnswers
      })
    })
    setQeA(newQeA)
    setPoints(0)
    toggleShowAnswers(false)
    setWelcomePageVisibility(false)
    setQuestionsVisibility(true)
    window.scrollTo(0, 0)
  }
  
  function getSpecs(chosenCategories, level){
      setQuizSpecs({chosenCategories: chosenCategories, level: level})
      getQeA(chosenCategories, level)
  }

  function showAnswers() {
    toggleShowAnswers(true);
    window.scrollTo(0, 0);
  }
  
  function toggleOptions(){
      setWelcomePageVisibility(true)
      setQuestionsVisibility(false)
      window.scrollTo(0, 0);
  }

  function incrementTotalPoints() {
    setPoints((prevPoints) => prevPoints + 1);
  }

  const QeAElements = QeA.map((item) => (
    <QeASection
      key={item.id}
      question={item.question}
      allAnswers={item.allAnswers}
      correctAnswer={item.correctAnswer}
      answersVisibility={answersVisibility}
      incrementTotalPoints={incrementTotalPoints}
      id={item.id}
    />
  ));

  return (
    <div>
        <div className={welcomePageVisibility ? "" : "display-none"}>
            <WelcomePage 
            getSpecs={(chosenCategories, level) => getSpecs(chosenCategories, level)} 
            />
        </div>
        {questionsVisibility && QeAElements}
        {(questionsVisibility && answersVisibility) && <h5 className="center-text"> 
            You got {totalPoints}/5 correct answers
        </h5>} 
        <MenuSection
        questionsVisibility={questionsVisibility}
        answersVisibility={answersVisibility}
        showAnswers={showAnswers} 
        toggleOptions={toggleOptions}
        quizSpecs={quizSpecs}
        getQeA={(chosenCategories, level) => getQeA(chosenCategories, level)}
      />
    </div>
  );
}
