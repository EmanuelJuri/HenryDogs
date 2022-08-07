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
                    <button className='backnext' onClick={currentPage> 1 ? () => pagination(currentPage-1): null}>❮❮</button>
                    {pageNumbers && pageNumbers.map(number =>(                        
                        <button className= {currentPage === number ? 'current' : 'number'} key={number}>
                            <a onClick={() => pagination(number)}>{number}</a>                            
                        </button>
                    ))}
                    <button className='backnext' onClick={currentPage !== pageNumbers.length ?() => pagination(currentPage+1): null}>❯❯</button>
                </div>
            </ul>
        </nav>
    )
};
