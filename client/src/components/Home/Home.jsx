import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { getDogs, getTemperments, filterDogsByOrigin, orderByName, orderByWeight, filterByTemp } from '../../actions';

import DogCard from '../DogCard/DogCard';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';

import loading from '../../images/loader.gif'
import home from '../../images/home.png'
import add from '../../images/add-dog.svg'
import about from '../../images/about.png'

import './Home.css'

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs)
    const temperments = useSelector(state => state.allTemperaments);
        
    // console.log(allDogs, 'aca estan los perros');    

    const [order, setOrder] = useState('')    
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setdogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage //8
    const indexOfFirtsDogs = indexOfLastDog - dogsPerPage //0
    const currentDogs = allDogs.slice(indexOfFirtsDogs, indexOfLastDog)
    
    //  1-------0-------8
    //  2-------9-------17
    const pagination = (pageNumber)=>{        
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    useEffect(()=>{
        dispatch(getTemperments())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());  //resetea
        setCurrentPage(1);
    };    

    function handleFilterTemp(e){
        e.preventDefault();
        dispatch(filterByTemp(e.target.value));
        setCurrentPage(1)
    };

    function handleFilterOrigin(e){
        dispatch(filterDogsByOrigin(e.target.value))
        setCurrentPage(1)
    };

    function handleSortName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    };

    function handleSortWeight(e){
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    };

    return(
        <div className='home'>
            <div className='container_navbar'>   

                <div className='container_home'>
                    <Link   to={'/'}>
                        <img
                            className="icon_home"
                            src={home}
                            alt=""
                        />
                    </Link>

                    <Link   to={'/about'}>
                        <img
                            className="about"
                            src={about}
                            alt=""
                        />
                    </Link>
                </div> 
                <div className='agrupation'>
                    <div className='container_serach_reload'>
                        <SearchBar
                            handleClick={handleClick}
                        />
                    </div>
                    <br />
                    <div className='filter_order'>

                        <select className='dropdown' onChange={e=>handleFilterTemp(e)}>
                                    <option disabled selected>Temperamentos</option>
                                    <option value="All">Todos...</option>
                                    {temperments?.map(e=>{
                                        return <option value={e.name}>{e.name}</option>
                                    })}
                        </select>

                        <select className='dropdown' onChange={e=>handleFilterOrigin(e)}>
                            <option disabled selected>Origen</option>
                            <option value="all">Todos</option>
                            <option value="api">Existentes</option>
                            <option value="created">Creados</option>
                        </select>

                        <select className='dropdown' onChange={e=>handleSortName(e)}>
                            <option value="default" disabled selected>Orden Alfabetico</option>
                            <option value="asc">Ascendente A-Z</option>
                            <option value="des">Descendente Z-A</option>
                        </select>
                        <select className='dropdown' onChange={e=>handleSortWeight(e)}>
                            <option value="default" disabled selected>Orden por Peso</option>
                            <option value="min">Peso minimo</option>
                            <option value="max">Peso maximo</option>
                        </select>
                    </div>
                </div>

                <Link
                    className='create'
                    to='/dog'                    
                    >
                        <img
                            className="icon_addDog"
                            src={add}
                            alt="add-dog"
                        />
                </Link>
            </div>
            <div className='pagination_foot'>
                <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    pagination={pagination}
                    currentPage={currentPage}
                />
            </div>
            <div>
                {currentDogs.length > 0 ? (
                    <div className='body'>{
                        currentDogs.map(el => {                            
                            return(
                                <div className='conteiner'>
                                    <DogCard
                                        key={el.id}
                                        id={el.id}
                                        name={el.name}
                                        image={el.image}
                                        weight={el.weight}
                                        temperament={el.temperament ? el.temperament : el.temperaments}                                        
                                        />                                                                                                        
                                </div>                                
                            )
                        })
                    }
                    </div>
                    )
                    :
                    (
                        <div className='img_loading'>
                        <img
                            src={loading}
                            alt="cargando..."
                            className="carga"
                            />
                        </div>
                    )
                }
            </div>
            <div className='pagination_foot'>
                <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    pagination={pagination}
                    currentPage={currentPage}
                />
            </div>

        </div>
    )
};
