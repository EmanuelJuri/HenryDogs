import React from 'react';
import { Link } from 'react-router-dom';

import './about.css';

import Linkedin from '../../images/ln.svg';
import GitHub from '../../images/Github.svg';

export default function about(){
    return (
        <div className='background_detail'>
            <div className='aboutContainer'>
                <p className='titleAbout'>¿Hola como estas?</p>
                <p className='subTitleAbout'>Soy Emanuel Juri, Full Stack Developer!</p>
                <p className='descriptionProject'>Henry House, es una single-page application enfocada en mostrar las razas de perros de todo el mundo.
                    La app surge como proyecto individual durante el cursado del BootCamp Henry.
                </p>
                <div className=''>                    
                    <a href="https://www.linkedin.com/in/emanuel-juri/">
                        <img src={Linkedin} alt='ln-logo' className='logosSocialMedia'/>
                    </a>

                    <a href="https://github.com/EmanuelJuri">
                        <img src={GitHub} alt='github-logo' className='logosSocialMedia'/>
                    </a>
                </div>
            </div>
            <div>
                <Link to= '/home'>
                        <button className='button_home'>Volver</button>
                </Link>
            </div>
        </div>
    )
};