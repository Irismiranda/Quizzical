import React, {useEffect, useState} from "react"
import { right_icon } from "../assets"

export default function QeAPage(props){
    const { correctAnswer, allAnswers, id, answersVisibility, incrementTotalPoints} = props
    const [chosenIndex, setchosenIndex] = useState(null)
    const righthAnswerIndex = allAnswers.findIndex(answer => answer === correctAnswer)
    
    useEffect(() => {    
        if(righthAnswerIndex === chosenIndex && answersVisibility){
            incrementTotalPoints()
        }   
        if (!answersVisibility) {
            setchosenIndex(null)
        }
    }, [answersVisibility])
    
    function pickAnswer(answerIndex){
        setchosenIndex(answerIndex)
    }
    
    const allAnswersElements = allAnswers.map((answer, index) => {
        const answerClasses = `${index === chosenIndex ? "bullet chosen" : "bullet"} ${index === righthAnswerIndex && answersVisibility ? "right-answer" : ""}`
        return (
            <div id={`${id}-${index}`} className={answerClasses} onClick={() => pickAnswer(index)} key={`${id}-${index}`}>
            {answer}
        </div>
        )
    })
    
    return (
        <div>
            <h4> {props.question} </h4>
            <div className="answers-section">
                {allAnswersElements}
                {(righthAnswerIndex === chosenIndex && answersVisibility) && <img src={right_icon} className="right-icon"/>}
            </div>
            <hr/>
        </div>
    )
}