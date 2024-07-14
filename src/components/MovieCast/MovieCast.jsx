import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx"
import { getCreditsById, imageBaseURL } from "../../components/api/tmdb-movies-api.js";
import css from "./MovieCast.module.css"


export default function MovieCast() {

    const { movieId } = useParams();
    const [credits, setCredits] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCreditsById() {                
            try {
                setLoading(true);
                const data = await getCreditsById(movieId);
                // console.log("MovieCast > data:", data);
                setCredits(data.cast);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCreditsById();
    }, [movieId]);

    // console.log("MovieCast > credits:", credits);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {loading && <Loader />}
            {credits.length === 0 && !loading && <p>Unfortunately, there are no info about cast for this film...</p>}
            {credits.map((credit) => (
                    <div key={credit.id}>
                        <br />
                        <p className={css.castAttr}>{credit.name}</p>
                    {credit.character && <p><span className={css.castAttr}>Character: </span>{credit.character}</p>}
                        <img src={`${imageBaseURL}/${credit.profile_path}`} alt={`${credit.name}'s photo`} style={{ maxWidth: 200 }} />
                    </div>
            ))}
        </div>
    )
}