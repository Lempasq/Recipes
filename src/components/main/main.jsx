import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import MainCard from './mainCard'
import Header from '../header/header'

export default () => {
    let [search, setSearch] = useState('')
    let [recipies, setRecipies] = useState([])

    const APP_KEY = 'ecead9074021aaac8edfe99a029b5bf3';
    const APP_ID = '48c3ed34';

    let [labelSearch, setLabelSearch] = useState('')

    const searchRecipies = (e) => {
        e.preventDefault()
        setLabelSearch(search)
        setSearch('')
        fetch(`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`)
            .then(responce => responce.json())
            .then(data => setRecipies([data]))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setLabelSearch('waffles')
        fetch(`https://api.edamam.com/search?q=waffles&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`)
            .then(responce => responce.json())
            .then(data => setRecipies([data]))
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <Header search={search} setSearch={setSearch} searchRecipies={searchRecipies}/>
            <MainCard labelSearch={labelSearch} recipies={recipies}/>
        </>
    )
}