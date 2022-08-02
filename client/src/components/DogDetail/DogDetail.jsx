import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getDetail, cleanDogId } from '../../actions/index';
import loading from '../../images/loading-load.gif'

import './DogDetail.css'

export default function Detail(props){
    // console.log(props, 'props')

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id))
        dispatch(cleanDogId())       
    },[dispatch, props.match.params.id])

    const myDog = useSelector(state => state.detail)

    // console.log(myDog, 'myDog')

    return(
        <div className='background_detail'>
            <div className='cardContainer'>                            
                {
                myDog ?
                <div>
                    <div  key={myDog.id} >                    
                        <h1 className='d_name'>{myDog.name}</h1>
                        <img className='detail_image' src={myDog.image} alt="img not found" />
                    </div>

                    <div className="description">
                        <h3>Altura: {myDog.height} centímetros</h3> 
                        <h3>Peso: {myDog.weight} kilogramos</h3> 
                        <h3>Esperanza de vida: {myDog.life_span} años</h3>                    
                        <h3>Temperamentos:</h3><h4>{myDog.temperament}</h4> 
                    </div>

                    <div>
                        <Link to= '/home'>
                                <button className='button_home'>Volver</button>
                        </Link>
                    </div>
                </div>
                :                
                <img src={loading} alt="cargando..." className="carga"/>
                }
            </div>
        </div>
    )
};



