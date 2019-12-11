import React, { useState, useEffect, Fragment } from 'react'
import './mainStyles.scss'
import { Link } from "react-router-dom"

export default ({recipies, labelSearch}) => {

    return (
        <main>
            <div>{recipies[0] !== undefined && recipies[0].hits.map(({recipe: {calories, image, ingredients, label}}, index) => (
                <ul className={'cardList'} key={`key: ${label}; index: ${index}`}>
                    <li className={'cardLabel'}>
                        <span>{label}</span>
                    </li>
                    <li className={'cardImage'}>
                        <img src={image} />
                    </li>
                    <li className={'cardCalories'}>
                        <span>Calories: {calories.toFixed(0)}</span>
                    </li>
                    <ul className={'cardIngredients'}>
                        <button><Link to={`/ingredients/${labelSearch}/${index}`}>Show ingredients</Link></button>
                    </ul>
                </ul>
            ))}
            </div>
        </main>
    )
}