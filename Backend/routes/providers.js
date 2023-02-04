var express = require('express');
var router = express.Router();
const providersController = require('../controller/providers')

/* GET list page. */
router.get('/', providersController.list);
router.get('/details/:id', providersController.details);
router.get('/edit/:id', providersController.edit);
router.post('/update/:id', providersController.update);
router.get('/add-provider', providersController.addform);
router.post('/add', providersController.add);
router.get('/delete/:id', providersController.delete);


module.exports = router;

