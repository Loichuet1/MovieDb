
export default function SerieSaison({ saison }) {


    return (
        <div className="saison">
            <img className="saisonPoster" src={`https://image.tmdb.org/t/p/original${saison.poster_path}`} alt={saison.poster_path} />
            <div className="saisonInfos">
                <div className="titleFlex">
                    <p className="title">{saison.name}</p>
                    <p className="title"> {` ${saison.episode_count} épisodes`}</p>
                </div>
                <p>{saison.overview}</p>
            </div>
        </div>
    )
}