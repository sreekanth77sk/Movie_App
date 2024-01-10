import './MovieInfo.css'

import { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function MovieInfo(props) {
    const { myList, setMyList } = props;
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [isInMyList, setIsInMyList] = useState(false);

    const fetchMovie = async () => {
        const url = `https://www.omdbapi.com/?apikey=5826eacb&i=${id}`;
        const response = await axios.get(url);
        const responseData = await response.data;
        setMovie(responseData);
        if(myList){
        setIsInMyList(myList.some(m => m.imdbID === responseData.imdbID))}
    };

    const handleAddMyList = () => {
        const newList = [...myList];
        newList.unshift(movie);
        setMyList(newList);
        localStorage.setItem('myList', JSON.stringify(newList));
        setIsInMyList(true);
        navigate('/');
    };

    const handleRemoveFromMyList = () => {
        const updatedList = myList.filter(m => m.imdbID !== movie.imdbID);
        setMyList(updatedList);
        localStorage.setItem('myList', JSON.stringify(updatedList));
        setIsInMyList(false);
        navigate('/')
    };

    useEffect(() => {
        fetchMovie();
    }, [movie]);

    useEffect(() => {
        const savedMyList = JSON.parse(localStorage.getItem('myList'));
        if (savedMyList) {
            setMyList(savedMyList);
        }
    }, []);

    return (
        <div className='movie-info-bg'>
            <h3 className='back-button' onClick={() => navigate('/')}>Back</h3>
            <img className='movie-poster' src={movie.Poster} alt='Movie' />
            <div className='movie-info-card'>
                <div className='movie-beadings'>
                    <h3 className='title'><i>{movie.Title}</i></h3>
                    {isInMyList ? (
                        <button onClick={handleRemoveFromMyList}>- Remove from MyList</button>
                    ) : (
                        <button onClick={handleAddMyList}>+ Add to My list</button>
                    )}
                </div>
                <div className='movie-details'>
                    <p>Year: <b>{movie.Year}</b></p>
                    <p>Director: <b>{movie.Director}</b></p>
                    <p>Actors: <b>{movie.Actors}</b></p>
                    <p>Plot: <b>{movie.Plot}</b></p>
                </div>
            </div>
        </div>
    );
}

export default MovieInfo;
