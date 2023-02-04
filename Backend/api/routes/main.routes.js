var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controller');


router.post('/providers',mainController.create)
router.get('/providers',mainController.readAll)
router.get('/providers/:id',mainController.readone)


router.put('/providers/:id',mainController.update)
router.delete('/providers/:id',mainController.deleteOne)
router.delete('/providers',mainController.deleteAll)

router.post('/*',Nofound)
router.get('/*',Nofound)
router.put('/*',Nofound)

function Nofound(req,res){
    res.status(400);
    res.send('Not a valid endpoint');
}

module.exports = router;
