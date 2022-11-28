const { Router } = require('express');
const Etapa = require('../models/Etapa');
const { validarProyecto } = require('../helpers/validar-proyecto');

const router = Router();

router.get('/', async function(req, res){
    console.log("Servidor actual : ", process.env.HOST);
    try {
        const etapas = await Etapa.find();
        res.send(etapas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', async function(req, res){
    try {
        const validaciones = validarProyecto(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        let etapa = new Etapa();
        
        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date();
        etapa.fechaActualizacion = new Date();
        etapa = await etapa.save();
        res.send(etapa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:etapaId', async function(req, res){
    try {
        const validaciones = validarProyecto(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        let etapa = await Etapa.findById(req.params.etapaId);
        if(!etapa) {
            return res.status(400).send('Etapa no existe');
        }
        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date();
        etapa.fechaActualizacion = new Date();
        etapa = await etapa.save();
        res.send(etapa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;