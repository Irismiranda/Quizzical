import React, {useState, useEffect} from "react"
import { options_icon } from "../assets";

export default function MenuSection(props){
    const { questionsVisibility, answersVisibility, showAnswers, toggleOptions, getQeA, quizSpecs } = props
    
    const [fixedMenu, setFixedMenu] = useState("top")
    
    useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const distanceFromBottom = document.documentElement.scrollHeight - (scrollY + window.innerHeight);
      if (distanceFromBottom > 70) {
        setFixedMenu("top");
      } else {
        setFixedMenu("bottom");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 
    
    return (
        <div className={fixedMenu === "top" ? "fixed-top" : "fixed-bottom"}>
        <div className={questionsVisibility ? "btns-section" : "display-none"}>
            {(questionsVisibility && !answersVisibility) && <button onClick={showAnswers}>
                Show Answers
            </button>}
            {(questionsVisibility && answersVisibility) && <button onClick={() => getQeA(quizSpecs.chosenCategories, quizSpecs.level)}>
                Get New Questions
            </button>}
            {questionsVisibility && <div className="flex-row pointer" onClick={toggleOptions}>
                <img className="options-icon" src={options_icon}/>
                <h3 className="preferences-text">Change <br/> Preferences</h3>
            </div>}
        </div>
      </div>
    )
}