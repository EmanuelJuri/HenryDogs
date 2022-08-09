import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getDetail, cleanDogId } from '../../actions/index';
// import loading from '../../images/loading-load.gif'
import loading from '../../images/loader.gif'
import height from  '../../images/perroHeight.svg'
import weight from  '../../images/scale-svgrepo.svg'
import lifeSpan from  '../../images/birthday-cake.svg'

import './DogDetail.css'

export default function Detail(props){
    // console.log(props, 'props')

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id))
        dispatch(cleanDogId())       
    },[dispatch, props.match.params.id])

    const myDog = useSelector(state => state.detail)

    return(
        <div className='background_detail'>
            <div /* className='cardContainer' */>                            
                {
                myDog ?
                <div className='cardContainer'>
                    <div
                        className='left'
                        key={myDog.id} >                    
                        <h1 className= {myDog.name&&myDog.name.length > 19 ? 'd_nameLong' : 'd_name'}>{myDog.name}</h1>                        
                        <img className='detail_image' src={myDog.image?myDog.image:loading} alt="img not found" />
                    </div>

                    <div className="description">
                        <div className='descriptionDetail'>
                            <img src={height} alt="height-dog" />
                            <h3 className='dataDetail'>Altura: {myDog.height} centímetros</h3> 
                        </div>

                        <div className='descriptionDetail'>
                            <img src={weight} alt="weight-dog" />
                            <h3 className='dataDetail'>Peso: {myDog.weight} kilogramos</h3> 
                        </div>

                        <div className='descriptionDetail'>
                            <img src={lifeSpan} alt="lifeSpan-dog" />
                            <h3 className='dataDetail'>Esperanza de vida: {myDog.life_span} años</h3>
                        </div>

                        <div className='temperamentDetail'>
                            <h3 className='temperamentTittle'>Temperamentos:</h3><h4>{myDog.temperament}</h4>
                        </div>
                        
                    </div>
                </div>
                :                
                <img src={loading} alt="cargando..." className="carga"/>
                }
            </div>            
            <div>
                <Link to= '/home'>
                        <button className='button_home'>Volver</button>
                </Link>
            </div>
        </div>
    )
};



