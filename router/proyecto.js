const { Router } = require('express');
const Proyecto = require('../models/Proyecto');
const { validarProyecto } = require('../helpers/validar-proyecto');

const router = Router();

router.post('/', async function (req, res){
    try {
        const validaciones = validarProyecto(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        const existeProyectoPorSerial = await Proyecto.findOne({ numero: req.body.numero});

        if (existeProyectoPorSerial) {
            return res.status(400).send('Ya existe el número para otro proyecto');
        }

        let proyecto = new Proyecto();
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.cliente = req.body.cliente._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.etapa = req.body.etapa._id;
        proyecto.fechaCreacion = new Date();
        proyecto.fechaActualizacion = new Date();

        proyecto = await proyecto.save();

        res.send(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el proyecto');
    }
});


router.put('/:proyectoId', async function (req, res){
    try {
        const validaciones = validarProyecto(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        let proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(400).send('Proyecto no existe');
        }
        const existeProyectoPorSerial = await Proyecto
                            .findOne({ numero: req.body.numero, _id: { $ne: proyecto._id}});

        if (existeProyectoPorSerial) {
            return res.status(400).send('Ya existe el número para otro proyecto');
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.cliente = req.body.cliente._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.etapa = req.body.etapa._id;
        proyecto.fechaActualizacion = new Date();

        proyecto = await proyecto.save();

        res.send(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el proyecto');
    }
});

module.exports = router;