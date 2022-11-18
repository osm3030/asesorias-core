const mongoose = require('mongoose');

const getConnection = async () => {

    try  {
        const url = 'mongodb://osm3030:rbg0L1MmQoMaE0em@ac-mujl6hu-shard-00-00.5srrswx.mongodb.net:27017,ac-mujl6hu-shard-00-01.5srrswx.mongodb.net:27017,ac-mujl6hu-shard-00-02.5srrswx.mongodb.net:27017/asesorias-iudigital?ssl=true&replicaSet=atlas-35y8z2-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);
    
        console.log('Conexión exitosa');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}