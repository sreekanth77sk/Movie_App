import './App.css';
import Movies from './Components/Movies/Movies';
import { Fragment, useEffect, useState } from 'react';
import MovieInfo from './Components/MovieDetails/MovieInfo';
import {  Route, Routes } from 'react-router-dom';
import MyList from './Components/MyList/MyList';


function App() {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [movieId, setMovieId] = useState("")

  const [myList, setMyList] = useState([])
  


    const getMovies = async ()=>{
        const url = `https://www.omdbapi.com/?apikey=5826eacb&s=${searchValue}`
        const res = await fetch(url)
        const resData = await res.json()
        const allMovies = resData.Search
        setMovies(allMovies)
    }
    useEffect(()=>{
        getMovies()
    },[searchValue])
  return (
    <>
    <Routes>
      <Route path='/' element={<Movies 
                movies={movies} 
                searchValue={searchValue} 
                setSearchValue={setSearchValue}
                movieId={movieId} 
                setMovieId={setMovieId}
                myList={myList}
                />}/>
                           
      <Route path='/movieInfo/:id' element={<MovieInfo movieId={movieId} 
                                    myList={myList} setMyList={setMyList}/>}/>
      

    </Routes>  
     
    </>

  )}

export default App;
