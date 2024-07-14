import { NavLink, Outlet, useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById, imageBaseURL } from "../../components/api/tmdb-movies-api.js";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {

    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    console.log("MovieDetailsPage.jsx > location ", location);  

    useEffect(() => {
        async function fetchMovieById() {
            try {
                setLoading(true);
                const data = await getMovieById(movieId);
                setMovie(data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        } 
        fetchMovieById();
    }, [movieId]);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;
    if (!movie) return <div>Loading...</div>;

    // console.log("MovieDetalsPage > movieId", movieId);
    // console.log("MovieDetalsPage > movie", movie);

    const userScore = Math.ceil(movie.vote_average * 10);

    return (
        <div>
            <Link to={location.state ?? '/'}
                state={location}    
                type="button">Go back
            </Link>
            <div className={css.movieDescription}>
                <img src={`${imageBaseURL}/${movie.poster_path}`} alt={`${movie.title} poster`}
                    className={ css.moviePoster} />
                <div>
                    <h1>{`${movie.original_title} (${movie.release_date.slice(0, 4)})`}</h1>
                    <p><span className={css.movieAttr}>User Score:</span> {userScore}   %</p>
                    <p><span className={css.movieAttr}>Overview:</span> {movie.overview}</p>
                    <p><span className={css.movieAttr}>Genres:</span> {movie.genres.map((genre) => genre.name).join(', ')}</p>
                </div>
            </div>
            <div className={css. reviewDiv}>
                <br />
                <p className={css.movieAttr}>Additional information</p>
                <ul>
                    <li>
                        <NavLink
                            to={'cast'}
                            state={location.state ?? '/'}
                        >Cast</NavLink>
                    </li> 
                    <li>
                        <NavLink
                            to={'reviews'}
                            state={location.state ?? '/'}
                        >Reviews</NavLink>
                    </li>
                </ul>
            </div>
            <Outlet/>
        </div>
    )
}