import React, { useState, useEffect } from 'react'
import './headerStyles.scss'
import axios from 'axios';

export default ({search, setSearch, searchRecipies}) => {

    const changeSearch = e => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    return (
        <header>
            <nav className={'headerNav'}>
                <form action="" onSubmit={searchRecipies}>
                    <input type="text" value={search} onChange={changeSearch}/>
                </form>
                <div>
                    <i className="fas fa-2x fa-cocktail"></i>
                    <span>CoolRecipes</span>
                </div>
            </nav>
        </header>
    )
}