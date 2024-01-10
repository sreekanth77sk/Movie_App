import { Fragment, useState } from "react";
import './Movies.css'
import { Link, useNavigate } from "react-router-dom";
import MyList from "../MyList/MyList";

function Movies(props){

    const {movies,searchValue, setSearchValue, setMovieId} = props
    
    const handleClick = (e)=>setMovieId(e.currentTarget.id)
    
    
    return(
        <Fragment>
                <div className="bg-container">

                    <nav className="navig">
                        <h2>Movie <span className="title-span">Time</span></h2>
                        <input 
                        onChange={(e)=>setSearchValue(e.target.value)} 
                        className="userSearch" type="search" value={searchValue}
                        placeholder="Search Movie by name"/>
                    </nav>
                        
                    <div  className="movie-list">
                    
                        {movies ? (
                        movies.map((movie) => (
                             <Link to={`movieInfo/${movie.imdbID}`} key={movie.imdbID}>
                                <div>  
                                            <img
                                                src={movie.Poster}
                                                onClick={handleClick}
                                                id={movie.imdbID}
                                                className="m-poster"                                 
                                                alt="N/A"
                                            />
                                    </div> 
                            </Link>  
                        ))) : <h1>No search results</h1>} 

                    </div>

                    <MyList/>
                </div>
                
        </Fragment>
    )
}

export default Movies