const mongoose = require('mongoose');
const { Provider } = require('../models/provider');
const { providerSchema } = require('../schemas/provider.schemas');

const uri = 'mongodb://127.0.0.1:27017/provider_db';

//make the connection
mongoose.set('strictQuery', false);

module.exports = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('successfull Connection!!', result)
    })
    .catch(error => console.log(error));



module.exports = Provider;
