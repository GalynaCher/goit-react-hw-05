import { Link, useLocation } from "react-router-dom";

export default function MovieItem({ movie }) {

    // console.log("MovieItem > movie", movie, movie.id, movie.title);

    const location = useLocation();

    return (
        <div>
            <Link to={`/movies/${movie.id}`} state={location}>
                <h4>{movie.title}</h4>
            </Link>
        </div>
    );
}