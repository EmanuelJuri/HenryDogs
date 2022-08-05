import React from 'react';
import {Link} from 'react-router-dom';

import './LandingPage.css';
import dogPictutre from '../../images/perrolanding.svg';

export default function LandingPage(){
    return(
        <div className='background'>
            <div className='container_ld'>
                <h1 className='welcome_title'>Del primero al último! Todos los perros del mundo</h1>
                <h2 className='welcome_subtitle'>Que estas esperando para entrar...</h2>
            <Link to='/home'>
                <button className='button_intro'>INGRESAR</button>
            </Link>                
            </div>
            <div>
                <img className='image_ld' src={dogPictutre} alt="dogPicture" />
            </div>
        </div>
    )
};