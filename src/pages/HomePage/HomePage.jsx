import { useEffect, useState } from "react";
import { getMovies } from "../../components/api/tmdb-movies-api.js"
import MoviesList from "../../components/MovieList/MoviesList.jsx"
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./HomePage.module.css"

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    console.log("HomePage.jsx > location ", location);  

    useEffect(() => {
        async function fetchMovies() {
            try {
                setLoading(true);
                const data = await getMovies();
                // console.log("HomePage.jsx > data", data);
                setMovies(data);
            } catch (error) {
                console.log(error);
                <p>Error movies loading!</p>
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [])

    return (
        <div className={css.homePageDiv}>
            <h1 className={css.homeTitle}> Trending movies</h1>
            {loading && <Loader />}
            <div>{ movies.length > 0 &&  < MoviesList movies={movies} /> }</div>
        </div>
        
    )
}