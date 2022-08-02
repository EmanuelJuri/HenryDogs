const { Router } = require('express');
const axios = require ('axios');
const {Temperament} = require ('../db');
const {API_KEY} = process.env;

const router = Router();

router.get('/temperaments', async(req, res)=>{    
    try {
        const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);    
        const apiInfoTemperaments = apiUrl.data.map(el => el.temperament).join().split(",");
        
        const temps = [];
        apiInfoTemperaments.map(el => {
            if (/* !temps.includes(el.trim()) && */el) {  //si bien el 'findOrCreate' me los filtra, no me saca los vacios ""
                temps.push(el.trim());
            }
        });
        
        temps.forEach(el => {
            Temperament.findOrCreate({
                where: {name: el}
            })        
        });
        const allTemperaments = await Temperament.findAll();    
        res.status(200).send(allTemperaments);
                
    } catch (error) {
        res.status(404).send(error);
    }

});

module.exports = router;