const { Router } = require('express');
const Universidad = require('../models/Universidad');
const { validarProyecto } = require('../helpers/validar-proyecto');

const router = Router();

router.get('/', async function(req, res){
    try {
        const universidades = await Universidad.find();
        res.send(universidades);
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
        let universidad = new Universidad();
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date();
        universidad.fechaActualizacion = new Date();
        universidad = await universidad.save();
        res.send(universidad);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:universidadId', async function(req, res){
    try {
        const validaciones = validarProyecto(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        let universidad = await Universidad.findById(req.params.universidadId);
        if (!universidad) {
            return res.status(400).send('No existe universidad');
        }
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date();
        universidad.fechaActualizacion = new Date();
        universidad = await universidad.save();
        res.send(universidad);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;