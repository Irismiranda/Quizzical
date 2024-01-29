import React, { useState, useEffect } from "react"
import { loading_icon } from "../assets"

export default function WelcomePage(props) {
    const { getSpecs } = props
    const [categories, setCategories] = useState([])
    const [chosenCategories, setChosenCategories] = useState([])
    const [level, setLevel] = useState([])
    async function fetchCategories() {
        const res = await fetch("https://opentdb.com/api_category.php")
        const data = await res.json()
        const categoriesData = []
        data.trivia_categories.forEach((category) => {
        categoriesData.push({
            id: category.id,
            name: category.name,
            isChosen: false,
        })
        })
        setCategories(categoriesData)
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    
    useEffect(() => {
        let newCategories = []
        categories.forEach(category => {
            if(category.isChosen){
                newCategories.push(category.id)
            }
            setChosenCategories(newCategories)
        })
    }, [categories])

    function toggleCategory(categoryId) {
        const updatedItems = categories.map((category) => {
        if (category.id === categoryId) {
            return { ...category, isChosen: !category.isChosen }
        }
        return category
        })
        setCategories(updatedItems)
    }
    
    function resetCategories(){
        const newCategories = categories.map((category) => ({
            ...category,
            isChosen: false,
        }))
        setCategories(newCategories)
        setChosenCategories([])
    }

        async function startQuiz(){
            await getSpecs(chosenCategories, level)
        }

    const categoryElements = categories.map((category, index) => (
        <div
        key={category.id}
        id={category.id}
        className={category.isChosen ? "bullet chosen grow" : "bullet grow"}
        onClick={() => toggleCategory(category.id)}
        >
        {category.name}
        </div>
    ))

    return (
        <div className="flex-column">
            {categories.length === 0 && <img src={loading_icon} className="loading-icon"/>}
            <div className={categories.length > 0 ? "flex-column" : "display-none"}>
            <h1> Quizzical </h1>
            <div className="center-text">
                <h4 className="display-inline">I want questions on</h4>
                <div className="select-wrapper">
                    <select name="difficulty" onChange={(e) => setLevel(e.target.value)}>
                    <option value="">All </option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="easy">Hard</option>
                    </select>
                </div>
                <h4 className="display-inline"> {!level.length > 0 ? "difficulty levels" : "level only"} to test my knowledge on</h4>
                <div className="categories-section">
                    <div
                    id="all-categories"
                    className={chosenCategories.length === 0 ? "bullet chosen grow" : "bullet grow"}
                    onClick={() => resetCategories()}
                    >
                        Any Subject
                    </div>
                    {categoryElements}
                </div>
                <button onClick={() => startQuiz(chosenCategories, level)}> Start Quiz </button>
            </div>
            </div>
        </div>
    )
}