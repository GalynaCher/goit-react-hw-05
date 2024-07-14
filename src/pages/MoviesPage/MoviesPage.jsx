import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import { useLocation, useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MovieList/MoviesList.jsx"
import { getMoviesByName } from "../../components/api/tmdb-movies-api.js"; 
import css from "./MoviesPage.module.css"

export default function MoviesPage() {

    const [searchParams, setSearchParams] = useSearchParams({ query: ""});
    // console.log("MoviesPage.jsx > searchParams.toString(): ", searchParams.toString());
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (newSearchCriteria) => {
        setSearchParams({ query: newSearchCriteria});
    }

    const location = useLocation();
    console.log("MoviesPage.jsx > location ", location);

    useEffect(() => {
        async function fetchMoviesByName(queryString) {
            if (queryString === "") {
            return;
        }
            try {
                setLoading(true);
                const data = await getMoviesByName(queryString);
                const results = data.results;
                setMovies(results);
                // console.log("MoviesPages > fetchMoviesByName", data);
            } catch (error) {
                console.log(error);
                 <p>Error movies loading!</p>
            } finally {
                setLoading(false);
            }
        }
        fetchMoviesByName(searchParams.get('query'));
    }, [searchParams])

    return (
        <div className={css.moviesPageDiv}>
            <Formik initialValues={{ searchCriteria: "" }}
                onSubmit={(values, actions) => {
                    handleSearch(values.searchCriteria);
                    actions.resetForm();
                    }}
                >
                <Form >
                    <Field
                        name="searchCriteria"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movies"
                        className={css.searchField}
                    />
                    <button type="submit" className={css.searchButton}>Search</button>
                </Form>
            </Formik>
            {loading && <Loader/>}
            <MoviesList movies={movies}/>
        </div>
    )
}