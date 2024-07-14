import MovieItem from "../../components/MovieItem/MovieItem";

export default function MoviesList({ movies }) {

    // console.log("MoviesList.jsx > movies", movies);
    
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}><MovieItem movie={movie} /></li>
            ))}
        </ul>
    );
}