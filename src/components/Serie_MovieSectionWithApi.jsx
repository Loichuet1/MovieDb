import ApiPagination from "./ApiPagination";

export default function Serie_MovieSectionWithApi({ genre, ComponentToUse, discoverItemsCallback }) {

    const { nextPage, previousPage, displayedItems, currentPage, currentApiPage } = new ApiPagination(genre, discoverItemsCallback);

    return (
        <div className="sectionbyGenre" >
            <h2>{genre.name}</h2>

            <div className="movieAndSerieSection" >
                <button className="arrowButton" style={{ cursor: currentPage === 1 ? 'default' : "pointer" }}
                    onClick={() => previousPage()}
                    disabled={currentPage === 1 && currentApiPage === 1} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={currentPage === 1 && currentApiPage === 1 ? "none" : "white"} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {displayedItems.map(item => (
                    <ComponentToUse key={item.id + item.backdrop_path} item={item} />
                ))}

                <button className="arrowButton"
                    onClick={() => nextPage()} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={"white"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div >
    )
}
