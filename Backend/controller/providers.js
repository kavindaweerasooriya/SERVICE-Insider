const providers = require('../models/providers')

//list
module.exports.list = function (req, res) {
    res.render('providers/providers-list', { title: 'Service Providers', providers: providers })
}

//details

module.exports.details = function (req, res) {
    let id = req.params.id;
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-details', { id: id, title: 'Service Providers Detials', company: provider.company })
}

//edit
module.exports.edit = function (req, res) {
    let id = req.params.id;
    let provider = providers.find(provider => provider.id == id)
    res.render('providers/providers-edit', { id: id, title: 'Edit', provider: provider })
}
//update
module.exports.update = function (req, res) {
    let id = req.params.id;
    let provider = providers.find(provider => provider.id == id)

    provider.name = req.body.firstname;
    provider.position = req.body.position;
    provider.company.company_name = req.body.company_name;
    provider.company.address = req.body.address;
    provider.company.city = req.body.city;
    provider.company.description = req.body.description;
    provider.company.email = req.body.email;
    provider.company.tagline = req.body.tagline;

    res.render('providers/providers-update', { title: 'Update' })
}

module.exports.addform = function (req, res) {
    res.render('providers/providers-add-form', { title: 'Add'})
}
//update
module.exports.add = function (req, res) {
    let min = 100000;
    let max = 999999;
    let id = Math.floor(Math.random() * (max - min) + min);
    let provider = {
        id: id,
        name: req.body.firstname,
        position: req.body.position,
        company: {
            company_name: req.body.company_name,
            address: req.body.address,
            city: req.body.city,
            description: req.body.description,
            email: req.body.email,
            tagline: req.body.tagline,

        }
       
    }
    //add mew provider to list
    providers.push(provider);
    res.render('providers/providers-add', { title: 'Added' })
}


//delete

module.exports.delete = function (req, res) {
    let id = req.params.id;
    let provider = providers.find(provider => provider.id == id);
    let company = provider.company.company_name;

    let idx = providers.indexOf(providers.find(provider => provider.id == id));
    providers.splice(idx,1);

    res.render('providers/providers-delete', {title: 'delete', company: provider })
}