const validarProyecto = (req) => {
    const validaciones = [];

    if (!req.body.numero) {
        validaciones.push('Número es requerido');
    }

    if (!req.body.titulo) {
        validaciones.push('Título es requerido');
    }

    if (!req.body.fechaIniciacion) {
        validaciones.push('Fecha de iniciación es requerida');
    }

    if (!req.body.fechaEntrega) {
        validaciones.push('Fecha de entrega es requerida');
    }

    if (!req.body.valor) {
        validaciones.push('Valor es requerido');
    }

    if (!req.body.cliente) {
        validaciones.push('Cliente es requerido');
    }

    if (!req.body.etapa) {
        validaciones.push('Etapa es requerida');
    }

    if (!req.body.tipoProyecto) {
        validaciones.push('Tipo de proyecto es requerido');
    }

    if (!req.body.universidad) {
        validaciones.push('Universidad es requerida');
    }
    return validaciones;
}

module.exports = {
    validarProyecto
}