const { Router } = require('express');
const TipoProyecto = require('../models/TipoProyecto');
const { validarProyecto } = require('../helpers/validar-proyecto');

const router = Router();

router.get('/', async function(req, res){
    console.log("Servidor actual : ", process.env.HOST);
    try {
        const tipos = await TipoProyecto.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un eror');
    }
});

router.post('/', async function(req, res){
    try {
        const validaciones = validarProyecto(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        let tipoProyecto = new TipoProyecto();
        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaCreacion = new Date();
        tipoProyecto.fechaActualizacion = new Date();
        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:tipoProyectoId', async function(req, res){
    try {
        const validaciones = validarProyecto(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId);
        if (!tipoProyecto) {
            return res.status(400).send('No existe ese tipo de proyecto');
        }
        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaCreacion = new Date();
        tipoProyecto.fechaActualizacion = new Date();
        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;