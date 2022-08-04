import axios from 'axios';

// export function getDogs(){
//     return  function(dispatch){
//         return fetch ('http://localhost:3001/dogs')
//         .then(response => response.json())
//         .then(json => dispatch({type: 'GET_DOGS', payload: json}))
//     }
// };

export function getDogs(){
    return async function(dispatch){
        let json = await axios.get('/dogs') // aca es donde se produce la conexion front <-> back
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })        
    }
};

export function getByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`/dogs?name=${name}`)
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

// export function getTemperments(){
//     return async function(dispatch){
//         try {
//             let info = axios.get('http://localhost:3001/temperaments')
//             return dispatch({
//                 type: 'GET_TEMPERAMENTS',
//                 payload: info.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// };

export function getTemperments(){
    return  function(dispatch){
        return fetch ('/temperaments')
        .then(response => response.json())
        .then(json => dispatch({type: 'GET_TEMPERAMENTS', payload: json}))
    }
};

export  function postDog(payload){
    return async function (dispatch){
//  console.log('payload =>',payload);
  if(payload.image ===''){}
      const posteo = {
        "name": payload.name,
        "height": payload.min_height+' - '+payload.min_height,
        "weight": payload.min_weight+' - '+payload.max_height,
        "life_span": payload.min_life_span+' - '+payload.max_life_span,
        "image": payload.image !="" ? payload.image : 'https://wamiz.lat/assets/images/default/default-square-dog.jpg?v=b6999c0d',
        "temperament": payload.temperament
    }
   // console.log(posteo);
        const created = await axios.post('/dog',posteo);
   //     console.log('created',created);
        return dispatch({
            type : 'POST_DOG',
            payload: created.data,
        })
    }
};

export function filterDogsByOrigin(payload){
    return{
        type: 'FILTER_BY_ORIGIN',
        payload
    }
};

export function filterByTemp(payload){
    return{
        type: 'FILTER_BY_TEMP',
        payload
    }
};

export function filterBySize(payload){
    console.log(payload, 'action')
    return{
        type: 'FILTER_BY_SIZE',
        payload
    }
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
};

export function getDetail(id){
    // console.log(id, 'aca hay un detalle')
    return async function(dispatch){
        try {
            let detail = await axios.get(`/dogs/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: detail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function cleanDogId(){
    return{
        type: 'GET_CLEAN_DOG_ID',
        payload: []
    }
};

