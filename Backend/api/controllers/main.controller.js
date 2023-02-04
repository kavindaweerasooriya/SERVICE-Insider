const providers = require('../models/providers.models');

const Provider = require('../db/db');
const { ObjectId } = require('mongodb');




//UTIL FUNCTIONS


function isEmptylist(obj) {
    return (!obj || obj.length == 0 || Object.keys(obj).length == 0);
}

function handleError(res, error) {
    res.send('something went wrong', + error);
}

// function existsProvider(id) {
//     return providers.find(provider => provider.id == id);
// }

//generate unique provider id
// function getuniqueId(providers) {
//     let min = 100000;
//     let max = 999999;

//     do {
//         var id = Math.floor(Math.random() * (max - min) + min);
//     } while (existsProvider(id));

//     return id;
// }

//crud

module.exports.readone = function (req, res) {
    try {
        let id = ObjectId(req.params.id);

        Provider.find({ '_id': id })
            .then(result => {
                if (isEmptylist(result)) {
                    res.status(404);
                    res.send('list is empty. cannot update');
                }
                res.status(200);
                res.send(result);

            })
            .catch(error => handleError(res, error));
    }
    catch (error) {
        handleError(res, error)
    }

    // let provider = providers.find(provider => provider.id == id)

}

module.exports.update = function (req, res) {


    try {
        let id = ObjectId(req.params.id);
        let provider = req.body;

        Provider.findOneAndUpdate({ '_id': id }, provider, { new: true })
            .then(result => {
                if (isEmptylist(result)) {
                    res.status(400);
                    res.send('list is empty. cannot update');
                }

                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res, error));


    }
    catch (error) {
        handleError(res, error)
    }

}







module.exports.create = function (req, res) {

    try {


        // if (isEmptylist(providers)) {
        //     providers = [];
        // }
        //    // var id = req.body.id;
        //     if (existsProvider(id)) {
        //         res.status(400);
        //         res.send('Duplicates id s not allowed');
        //         id = getuniqueId();
        //     }
        var provider = req.body;
        //  provider.id = id;
        // providers.push(provider);
        Provider.create(provider)
            .then(result => {
                res.status(201);
                res.send(result);
            })
            .catch(error => handleError(res, error));

    } catch (error) {
        handleError(res, error);
    }

}

// module.exports.create = function (req,res) {


//     if(isEmptylist(providers)){
//         providers=[]; 

//     }

//     var id = req.body.id; // if the id is existing
//     if(existsProvider(id)){
//         res.status(400);
//         res.send('Duplicates id s not allowed');
//         id = getuniqueId(); //get new id
//     }

//     var provider = req.body;
//     provider.id=id;
//     // providers.push(provider);

//     // let min = 100000;
//     // let max = 999999;
//     // var id = Math.floor(Math.random() * (max - min) + min);
//     // var provider = {
//     //     id: id,
//     //     name: req.body.firstname,
//     //     position: req.body.position,
//     //     company: {
//     //         company_name: req.body.company.company_name,
//     //         address: req.body.company.address,
//     //         city: req.body.company.city,
//     //         description: req.body.company.description,
//     //         email: req.body.company.email,
//     //         tagline: req.body.company.tagline,

//     //     }

//     // }
//     //add mew provider to list
//     providers.push(provider);
//     res.status(200);
//     res.send(provider);
// }
// let provider = {};

//handle error




module.exports.readAll = function (req, res) {

    try {
        Provider.find()
            .then(result => {
                if (isEmptylist(result)) {
                    res.status(404);
                    res.send('List is empty');
                }
                res.status(200);
                res.send(result);


            })
            .catch(error => handleError(res, error));
    }
    catch (error) {
        handleError(res, error)
    }


}

module.exports.deleteOne = function (req, res) {
    try {
        let id = ObjectId(req.params.id);

        Provider.findOneAndDelete({ '_id': id })
            .then(result => {
                if (isEmptylist(result)) {
                    res.status(400);
                    res.send('list is empty.cannot delete');
                }
                res.status(200);
                res.send(result);
            })

    } catch (error) {
        handleError(res, error)
    }

}

module.exports.deleteAll = function (req, res) {
    try {
        Provider.deleteMany({})
            .then(result => {
                if (result.deletedCount === 0) {
                    res.status(400);
                    res.send('list is empty.cannot delete');
                }
                res.status(200);
                res.send("Deleted");
            })

    } catch (error) {
        handleError(res, error)
    }



}

