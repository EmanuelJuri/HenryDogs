const initialState = {
    dogs: [],
    allDogs: [],
    detail: [],
    allTemperaments: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
        return{
            ...state,
            dogs: action.payload,
            allDogs: action.payload
        }
        case 'GET_BY_NAME':
            return{
                ...state,
                dogs: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                allTemperaments: action.payload
            }
        case 'POST_DOG':
            return{
                ...state
            }
        case 'FILTER_BY_ORIGIN':
            const allDogs = state.allDogs
            const originFilter = action.payload === 'created' ? allDogs.filter(el => el.createdInDataBase) : allDogs.filter(el => !el.createdInDataBase)            
            if(!originFilter.length){
                alert('Aún no hay razas de perros creadas!')
                return{
                    ...state,
                    dogs: state.allDogs,
                }
            }else{
                return{
                    ...state,
                    dogs: action.payload === 'all' ? state.allDogs : originFilter
                }
            }
        case 'FILTER_BY_TEMP':
            const dogs = state.allDogs;
            const dogsFilter = state.allDogs
            dogs.map((dog) => {return(
                typeof dog.temperament === "object"
                    ? dog.temperament = dog.temperament.map(t => { return t.name })
                        .join(", ")
                    : dog.temperament
            )})
            const temperamentFilter =
                action.payload === 'All' ? state.allDogs
                    : dogsFilter.filter((e)=>
                        e.temperament?.includes(action.payload))              
            return {
                ...state,
                dogs: temperamentFilter,
            }
        case 'ORDER_BY_NAME':
            console.log(action.payload)
            const sortArray = action.payload === 'asc' ?
                state.dogs.sort(function(a, b){
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }) 
                :
                state.dogs.sort(function(a, b){
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0;
                })
            return{
                ...state,
                dogs: sortArray
            }
        case 'ORDER_BY_WEIGHT':            
            let newState2=state.dogs.filter((e)=>e.weight.length>3);            
            let newState=newState2.filter((e)=>!e.weight.includes('NaN'));          

            let sortedWeigth = action.payload ==='min'?
            newState.sort(function (a,b){
                if(parseInt(a.weight.replace(/ - /g,'')) > parseInt(b.weight.replace(/ - /g,'')) ){
                    return 1;
                }
                if(parseInt(a.weight.replace(/ - /g,'')) < parseInt(b.weight.replace(/ - /g,''))){
                    return -1;
                }
                else
                    return 0;
                
            })
            : 
            newState.sort(function (a,b){
                if(parseInt(a.weight.replace(/ - /g,'')) > parseInt(b.weight.replace(/ - /g,'')) ){
                    return -1;
                }
                if(parseInt(a.weight.replace(/ - /g,'')) < parseInt(b.weight.replace(/ - /g,''))){
                    return 1;
                }
                else
                    return 0;                
            })            
              return{
                ...state,
                dogs: sortedWeigth,
             }
        case 'GET_DETAILS':
            // console.log('reducer', action.payload)
            return{
                ...state,
                detail: action.payload
            }
        case 'GET_CLEAN_DOG_ID':
            return{
                ...state,
                detail: action.payload
            }        

        default: return {...state}
    }
};
