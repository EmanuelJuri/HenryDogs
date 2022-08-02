const { Router } = require('express');
const axios = require ('axios');
const {Dog, Temperament} = require ('../db');
const {API_KEY} = process.env;

const router = Router();

const getApiInfoDog = async ()=>{
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);    
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image.url,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            temperament: el.temperament ? el.temperament : "Sin temperamento asignado",
        }
    });    
    return apiInfo;
};

const getDBInfoDog = async () => {
    const dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    return dogsDB;
};

const getAllDogs = async()=>{
    const apiInfo = await getApiInfoDog();
    const dbInfo = await getDBInfoDog();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};


router.get('/dogs', async(req, res)=>{
    //console.log(req.query)
    let {name} = req.query;
    try {
        let dogTotal = await getAllDogs();        
        if(name){
            let dogName = dogTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ? res.status(200).send(dogName) : res.status(404).send('No se encontro ninguna raza asociada con la busqueda...');
        }else{
            res.status(200).send(dogTotal);
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/dogs/:idRaza', async(req, res)=>{
    // console.log(req.params);
    try {
        const {idRaza} = req.params;
        const dogTotal = await getAllDogs();
        if(idRaza){
            const dogId = dogTotal.filter(d => d.id == idRaza);

            if(Array.isArray(dogId[0].temperaments)){ // cdo viene de la DB
                var temps = dogId[0].temperaments.map((e)=>{return ' '+e.dataValues.name})
                temps = temps.toString();
                var lifeSpan = dogId[0].life_span;
                } else{
                var temps = dogId[0].temperament; // cdo viene de la API
                var lifeSpan = dogId[0].life_span.replace('years','')
                }
                var resultado = {      
                        id: dogId[0].id,
                        name: dogId[0].name,
                        height: dogId[0].height,
                        weight: dogId[0].weight,
                        life_span: lifeSpan,
                        image: dogId[0].image,
                        temperament: temps
                        }
            res.status(200).send(resultado);
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/dog', async(req, res)=>{
    try {
        const {        
            name,
            image,
            height,
            weight,
            life_span,
            temperament,
            createdInDataBase
        } = req.body;
    
        let dogNew = await Dog.create({
            name,
            image,
            height,
            weight,
            life_span,        
            createdInDataBase
        })
        let temperamentDb = await Temperament.findAll({
            where:{name: temperament}
        })
        dogNew.addTemperament(temperamentDb);
        res.send('Se agregó correctamente la nueva raza!!!');
        
    } catch (error) {
        res.status(404).send(error);
    }
});



module.exports = router;

