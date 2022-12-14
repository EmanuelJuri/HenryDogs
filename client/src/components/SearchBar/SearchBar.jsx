import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {getByName} from '../../actions';
import reload from '../../images/reload1.jpg'
import './SearchBar.css'

export default function SearchBar({handleClick}){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)        
    };

    function handleSubmit(e){
        e.preventDefault();
        if(name.length === 0) {
            return alert ("Ingresa un valor para buscar")
        } else{
            dispatch(getByName(name));
            setName('')
        }
    };

    return(
        <div className='search_bar'>
            <button className='reload_button' onClick={e => {handleClick(e)}}>
                <img
                    className="icon_reload"                            
                    src={reload}
                    alt=""
                />                   
            </button>
            <input 
                className="input_search"
                type="search" 
                placeholder="Ingrese raza a buscar..."
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                onChange={e=>handleInputChange(e)}
            />
            <button
                className="button_search"
                type="submit"
                onClick={e=>handleSubmit(e)}>
                    🔎
            </button>        
        </div>
    )
};