const mongoose = require('mongoose');

//define schema
const Schema = mongoose.Schema;


//create company schema (child or sub doucumnet)

const companySchema = new Schema({

    "company_name": { type: String, required: true },
    "address": { type: String, required: true },
    "city": { type: String, required: true },
    "phone": { type: String, required: true },
    "email": { type: String, required: true },
    "description": String,
    "tagline": String

});

//create provider schema(top-level document)

const providerSchema = new Schema({
    "name": { type: String, required: true },
    "position": { type: String, required: true },
    "company": companySchema,

});

module.exports={providerSchema,companySchema};