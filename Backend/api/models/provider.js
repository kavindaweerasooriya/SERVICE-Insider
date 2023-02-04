const mongoose = require('mongoose');

const { providerSchema } = require('../schemas/provider.schemas');

//create provider model

const Provider = mongoose.model('provider', providerSchema);

module.exports = { Provider }
