import React, { useState, useEffect, Fragment } from 'react'
import './ingredientsStyles.scss'
import { useParams, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default () => {
    const { ingredient, number } = useParams()

    let [ingredients, setIngredients] = useState([])

    const APP_KEY = 'ecead9074021aaac8edfe99a029b5bf3';
    const APP_ID = '48c3ed34';

    useEffect(() => {
        fetch(`https://api.edamam.com/search?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`)
            .then(responce => responce.json())
            .then(data => setIngredients([data]))
            .catch(e => console.log(e))
    }, [])

    return (
        <main>
            <ListGroup className={'ingredientsList'}>
                <ListGroupItem>{ingredients[0] !== undefined && (<img src={ingredients[0].hits[number].recipe.image} alt=""/>)}</ListGroupItem>
                {ingredients[0] !== undefined && ingredients[0].hits[number].recipe.ingredients.map(({text}, index) => (
                    <ListGroupItem key={text + index}>{text}</ListGroupItem>
                ))}
                <ListGroupItem>
                    <button>
                        <Link to='/'>Go home</Link>
                    </button>
                </ListGroupItem>
            </ListGroup>
        </main>
    )
}