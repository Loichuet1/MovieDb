import Serie_MovieSection from "../components/Serie_MovieSection";

function SimilarSection({ items, title, ComponentToUse }) {

    return (
        <div>
            {items.size > 0 && (
                <div className="bodySimilar">
                    <div className="similarMoviesContairener" >
                        <Serie_MovieSection items={items} ComponentToUse={ComponentToUse} itemPerPage={5} title={title} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default SimilarSection;