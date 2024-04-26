import { useEffect, useState } from "react";
import DisplayMovie from "../components/MovieComponents";


function SimilarSection({ parentId, movieManager }) {

    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        const fecthSimilarMovie = async () => {
            if (parentId) {
                try {

                    let responsePage, similarMovies;
                    ({ responsePage, similarMovies } = await movieManager.fecthSimilar(parentId, 1));
                    setSimilarMovies(similarMovies);
                } catch (error) {
                    console.error('Error fetching movie:', error);
                }
            }
        };

        fecthSimilarMovie();
    }, [parentId])

    return (
        <div>
            {similarMovies.length > 0 && (
                <div className="bodySimilar">
                    <h2> Similar Movies</h2>
                    <div className="similarMoviesContairener" >

                        {similarMovies.map(movie => (
                            movie.poster_path && (<DisplayMovie key={movie.id} movie={movie} />)
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SimilarSection;