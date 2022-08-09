import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {postDog, getTemperments} from '../../actions/index'
import height from  '../../images/perroHeight.svg'
import weight from  '../../images/scale-svgrepo.svg'
import lifeSpan from  '../../images/birthday-cake.svg'
import waitDog from '../../images/waitDog.svg'

import './DogCreate.css'

function validate(input){    
    let errors = {}

    !input.name ? errors.name='*Campo obligatorio' : errors.name='';
    
    !input.min_height ? errors.min_height='*Campo obligatorio' : 
    !Number(input.min_height) ? errors.min_height='*debe ser un número' :
    input.max_height&&parseInt(input.min_height)>=parseInt(input.max_height) ? 
    errors.max_height='*La altura máxima no puede ser inferior o igual a la mínima' : errors.min_height='';
    
    if(!input.max_height){
        errors.max_height='*Campo obligatorio';
    }else if(!Number(input.max_height)){
        errors.max_height='*debe ser un número';
    }

    if(!input.min_weight){
        errors.min_weight='*Campo obligatorio';
    }else if(!Number(input.min_weight)){
        errors.min_weight='*debe ser un número';
    }else if(input.max_weight&&parseInt(input.min_weight)>=parseInt(input.max_weight)){
        errors.max_weight='*El peso máximo no puede ser inferior o igual al mínimo';
    }

    if(!input.max_weight){
        errors.max_weight='*Campo obligatorio';
    }else if(!Number(input.max_weight)){
        errors.max_weight='*debe ser un número';
    }

    if(!input.min_life_span){
        errors.min_life_span='*Campo obligatorio';
    }else if(!Number(input.min_life_span)){
        errors.min_life_span='*debe ser un número';
    } else if(input.max_life_span&&parseInt(input.min_life_span)>parseInt(input.max_life_span)){
        errors.max_life_span='*Máxima no puede ser inferior a Mínima';
    }

    if(!input.max_life_span){
        errors.max_life_span='*Campo obligatorio';
    }else if(!Number(input.max_life_span)){
        errors.max_life_span='*debe ser un número';
    }else if(parseInt(input.max_life_span) > 22){
        errors.max_life_span='*debe ser menor o igual a 22 años';
    }
    if(input.image){
        var r = new RegExp(/^(ftp|http|https):[^ "]+$/);
        if(!r.test(input.image)){
            errors.image = '*Ingrese una URL válida'
        }

    }    
    return errors;    
}

export default function DogCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector(state => state.allTemperaments);
    
    const [errors, setErrors] = useState({})
        
    useEffect(()=>{
        dispatch(getTemperments())
    },[dispatch])    

    const [input, setInput] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_life_span: '',
        max_life_span: '',        
        image: '',
        temperament: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value  // {key: value} brackects nottion pq no conozco en valor de "name"
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        if(input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament/*  e.target.value */]                                 
            })
        }else{
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]                                 
            })
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t != e.target.value) // input.temperament.filter(t => t !== e)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postDog(input))
        alert('Se ha agregado la nueva raza!!!')
        setInput({
            name: '',
            min_height: '',
            max_height: '',
            min_weight: '',
            max_weight: '',
            min_life_span: '',
            max_life_span: '',            
            image: '',
            temperament: []
        })        
        history.push('/home')
    }

    return(
        <div className='container'>
            <h1 className='create_tittle'>CREA TU RAZA</h1>

            <div className='cardLeft'>
                <form className='form' onSubmit={e=>handleSubmit(e)}>
                    <div className='box_labels'>
                        <div className='box'>
                            <div className='inlineFirst'>
                                <label className='labels'>NOMBRE:</label>
                                <input
                                    className='input_img'
                                    type="text"
                                    value= {input.name}
                                    name= 'name'
                                    placeholder="Raza..."
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            {   input.name === '' ? <a className="errors">*Campo obligatorio</a> :                                
                                <a className="validations"></a>
                            }
                        </div>
                        
                        <div className='box'>
                            <div className='inlineFirst'>
                                <label className='labels'>IMAGEN</label>
                                <input
                                    className='input_img'
                                    type="url"
                                    value={input.image}
                                    name="image"
                                    placeholder="http://www.exampleimage.com"
                                    onChange={(e) => handleChange(e)}                                
                                />
                            </div>
                            {input.image !='' && errors.image !='' ? <a className="errors">{errors.image}</a>:''}
                        </div>
                    </div>

                    <div className='altura'>
                        <div className='columnasLeft'>
                            <h4 className='tittle_input'>ALTURA</h4>
                            <img src={height} alt="height-dog" /* className='imagesvg' *//>
                        </div>
                        <div className='columnas'>
                            <div className='box'>
                                <div className='inline'>
                                    {/* <label className='labels'>Mínima:</label> */}
                                    <input
                                        className='input'
                                        type="text"
                                        value= {input.min_height}
                                        name= 'min_height'
                                        placeholder="mínima en centímetros..."
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {   input.name !== '' && input.min_height === '' ? <a className="errors">{errors.min_height}</a> :
                                    errors.min_height ? <a className="errors">{errors.min_height}</a> :
                                    <a className="validations"></a>
                                }
                            </div>
                            <div className='box'>
                                <div className='inline'>
                                    {/* <label className='labels'>Máxima:</label> */}
                                    <input
                                        className='input'
                                        type="text"
                                        value= {input.max_height}
                                        name= 'max_height'
                                        placeholder="máxima en centímetros..."
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {   input.min_height !== '' && input.max_height==='' ? <a className="errors">{errors.max_height}</a>
                                    :
                                    errors.max_height ? <a className="errors">{errors.max_height}</a>
                                    :
                                    <a className="validations"></a>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='altura'>
                        <div className='columnasLeft'>
                            <h4 className='tittle_input'>PESO</h4>
                            <img src={weight} alt="weight-dog" /* className='imagesvg' *//>
                        </div>
                        <div className='columnas'>
                            <div className='box'>
                                <div className='inline'>
                                    {/* <label className='labels'>Mínimo:</label> */}
                                    <input
                                        className='input'
                                        type="text"
                                        value= {input.min_weight}
                                        name= 'min_weight'
                                        placeholder="mínimo en kilogramos..."
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {   input.max_height !=='' && input.min_weight==='' ? <a className="errors">{errors.min_weight}</a>
                                    :
                                    errors.min_weight ? <a className="errors">{errors.min_weight}</a>
                                    :
                                    <a className="validations"></a>
                                }
                            </div>
                            <div className='box'>
                                <div className='inline'>
                                    {/* <label className='labels'>Máximo:</label> */}
                                    <input
                                        className='input'
                                        type="text"
                                        value= {input.max_weight}
                                        name= 'max_weight'
                                        placeholder="máximo en kilogramos..."
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {   input.min_weight !=='' && input.max_weight==='' ? <a className="errors">{errors.max_weight}</a>
                                    :
                                    errors.max_weight ? <a className="errors">{errors.max_weight}</a>
                                    :
                                    <a className="validations"></a>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='altura'>
                        <div className='columnasLeft'>
                            <h4 className='tittle_input'>ESPERANZA DE VIDA</h4>
                            <img src={lifeSpan} alt="lifeSpan-dog" className='imagesvg'/>
                        </div>
                        <div className='columnas'>
                            <div className='box'>
                                <div className='inline'>
                                {/* <label className='labels'>Mínima:</label> */}
                                    <input
                                        className='input'
                                        type="text"
                                        value= {input.min_life_span}
                                        name= 'min_life_span'
                                        placeholder="mínimo en años..."
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {   input.max_weight !=='' && input.min_life_span==='' ? <a className="errors">{errors.min_life_span}</a>
                                    :
                                    errors.min_life_span ? <a className="errors">{errors.min_life_span}</a>
                                    :
                                    <a className="validations"></a>
                                }
                            </div>
                            <div className='box'>
                                <div className='inline'>
                                    {/* <label className='labels'>Máxima:</label> */}
                                    <input
                                        className='input'
                                        type="text"
                                        value= {input.max_life_span}
                                        name= 'max_life_span'
                                        placeholder="máximo en años..."
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                {   input.min_life_span !=='' && input.max_life_span==='' ? <a className="errors">{errors.max_life_span}</a>
                                    :
                                    errors.max_life_span ? <a className="errors">{errors.max_life_span}</a>
                                    :
                                    <a className="validations"></a>
                                }
                            </div>
                        </div>
                    </div>

                </form>

                <div className='renderAdd'>
                    <h1 className='tittle_name'>{input.name ? input.name : 'Nueva Raza'}</h1>
                    <img src={input.image? input.image : waitDog} 
                        alt="addImage"
                        className='detailImg'
                    />
                    <div className='box'>
                        <div className='inline_temp'>
                            <label className='labels'>Seleccionelos:</label>
                            <select className='input_temp' onChange={e=>handleSelect(e)}>
                                <option disabled selected>Temperamentos</option>
                                {temperaments?.map((el) => {                        
                                    return(
                                        <option value={el.name}>{el.name}</option>                                
                                    )
                                })}
                            </select>
                        </div>
                    </div> 

                    <div className='box'>    
                        <div className='temp_selected'>
                            {/* Temperamentos Seleccionados:  */}                       
                            { input.temperament.length ? input.temperament.map((t)=>{                            
                                return (
                                <div className='temp_selected' value={t} key={t} > {t}
                                    <button className='delete_temps' value={t} onClick={(e)=>handleDelete(e)} >
                                    ❌
                                    </button>
                                </div>)
                            }):<li className='errors' > Debe selecionar al menos un temperamento!</li>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='buttons'>                    
                    { //VALIDACION DE ESTADO PARA HABILITAR BOTON
                        input.name ===''|| input.min_height ===''|| input.max_height === ''|| input.min_weight ==='' || input.max_weight ===''
                        || input.min_life_span ===''|| input.max_life_span ===''
                        || errors.min_height || errors.max_height || errors.min_weight || errors.max_weight || errors.min_life_span
                        || errors.max_life_span || errors.image

                        ||!input.temperament.length ?                        
                            <button
                                onClick={e=>handleSubmit(e)}
                                // disabled='true'
                                className='button_block'                                
                            >
                                <span> Errores en el Fromulario </span>
                            </button>
                        :
                        <button
                            onClick={e=>handleSubmit(e)}
                            className='button'
                            type="submit"
                        >
                            <span>Crear</span>
                        </button>
                    }
                    <Link to={'/home'}><button className='button' >Volver</button></Link>
                </div>
        </div>
    )
};




