import React from 'react';
import {Link} from 'react-router-dom';

import './LandingPage.css';

export default function LandingPage(){
    return(
        <div className='background'>
            <div className='container_ld'>
                <h1 className='welcome_title'>Del primero al último{/* , todos los perros del mundo */}</h1>
                <Link to='/home'>
                    <button className='button_intro'>INGRESAR</button>
                </Link>
                <h1 className='welcome_title'>Todos los perros del mundo</h1>
            </div>
        </div>
    )
};