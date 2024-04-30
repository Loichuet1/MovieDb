import { useEffect, useState } from "react"
import Pagination from "../utils/Pagination";

export default function Serie_MovieSection({ items, ComponentToUse, itemPerPage, title }) {

    const pagination = new Pagination(itemPerPage, items);

    return (
        <div  >
            <h2>{title}</h2>

            <div className="movieAndSerieSection" >
                <button style={{ cursor: pagination?.currentPage === 1 ? 'default' : "pointer" }} onClick={() => pagination?.setCurrentPage(pagination?.currentPage - 1)} disabled={pagination?.currentPage === 1} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={pagination?.currentPage === 1 ? "none" : "white"} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {pagination?.displayedItems.map(item => (
                    <ComponentToUse key={item.id + item.backdrop_path} item={item} />
                ))}

                <button style={{ cursor: (items.size / itemPerPage) <= pagination?.currentPage ? 'default' : "pointer" }} onClick={() => pagination?.setCurrentPage(pagination?.currentPage + 1)} disabled={(items.size / itemPerPage) <= pagination?.currentPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={(items.size / itemPerPage) <= pagination?.currentPage ? "none" : "white"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div >
    )
}