import React from "react";
import { Link } from "react-router-dom";
import error from '../../images/notfound.png'

import './ErrorNotFound.css'


export default function Error404(){
    return(
        <div className='background_error'>
            {/* <img src={error} alt="img not found!" /> */}
            <div className='container_err'>                
                <Link to='/home'>
                    <button className='button_intro'>HOME</button>
                </Link>                
            </div>
        </div>
    )
};