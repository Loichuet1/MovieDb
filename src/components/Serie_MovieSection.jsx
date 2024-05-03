import Pagination from "../utils/Pagination";

export default function Serie_MovieSection({ items, ComponentToUse, itemPerPage, title }) {

    const paginationInstance = new Pagination(itemPerPage, items);
    return (
        <div  >
            <h2>{title}</h2>

            <div className="movieAndSerieSection" >
                <button className="arrowButton" style={{ cursor: paginationInstance?.currentPage === 1 ? 'default' : "pointer" }} onClick={() => paginationInstance?.setCurrentPage(paginationInstance?.currentPage - 1)} disabled={paginationInstance?.currentPage === 1} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={paginationInstance?.currentPage === 1 ? "none" : "white"} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {paginationInstance?.displayedItems.map(item => (
                    <ComponentToUse key={item.id + item.backdrop_path} item={item} />
                ))}

                <button className="arrowButton" style={{ cursor: (items.size / itemPerPage) <= paginationInstance?.currentPage ? 'default' : "pointer" }} onClick={() => paginationInstance?.setCurrentPage(paginationInstance?.currentPage + 1)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={(items.size / itemPerPage) <= paginationInstance?.currentPage ? "none" : "white"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div >
    )
}