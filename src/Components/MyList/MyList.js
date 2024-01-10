
import { Link } from "react-router-dom";
import './MyList.css'


function MyList(){
    const myList = JSON.parse(localStorage.getItem('myList'))
    return(
        <div className="bg-container">
            <div className="my-list-nav"><h4 className="heading">My List</h4></div>
            <div  className="my-list ">            
                {myList ? (
                myList.map((movie) => (
                        <Link to={`movieInfo/${movie.imdbID}`} key={movie.imdbID}>
                        <div>  
                                    <img
                                        src={movie.Poster}
                                        className="m-poster"                                 
                                        alt="N/A"
                                    />
                            </div> 
                    </Link>  
                ))) : <h1>My List is empty</h1>} 
            </div>
            
        </div>
    )
}

export default MyList
