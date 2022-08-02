import React from 'react';
import "./pagination.css"

export default function Pagination({dogsPerPage, allDogs, pagination, currentPage}){
    const pageNumbers = [];
    for(let i=0; i<Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className='pagination'>
                <div >
                    {pageNumbers && pageNumbers.map(number =>(
                        <button className='number' key={number}>
                            <a className= {currentPage === number ? 'current' : 'img'} onClick={() => pagination(number)}>{number}</a>                            
                        </button>
                    ))}
                </div>
            </ul>
        </nav>
    )
};
